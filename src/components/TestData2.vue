<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getInvitationWithGuests, supabase } from '../utils/supabase';

const route = useRoute();
const loading = ref(false);
const saving = ref(false);
const error = ref('');
const success = ref('');
const invitation = ref(null);
const guestForms = ref([]);
const emit = defineEmits(['writeSong']);

// Get code from query parameter or localStorage
const invitationCode = computed(() => {
  // First try to get from URL query parameters
  const codeFromUrl = route.query.code?.toUpperCase();
  if (codeFromUrl) {
    // Save to localStorage for future use
    localStorage.setItem('weddingInvitationCode', codeFromUrl);
    return codeFromUrl;
  }
  
  // If not in URL, try to get from localStorage
  const savedCode = localStorage.getItem('weddingInvitationCode');
  return savedCode || '';
});

// Menu options
const menuOptions = [
  { value: 'regular', label: 'Regular' },
  { value: 'vegetarian', label: 'Vegetariano' },
  { value: 'celiac', label: 'Sin Gluten' }
];

// Initialize guest forms with current data
const initializeGuestForms = (guests) => {
  return guests.map(guest => ({
    id: guest.id,
    name: guest.guest_name,
    menu_choice: guest.menu_choice || 'none_selected',
    is_attending: guest.is_attending, // Default to true if null/undefined
    notes: guest.notes || '',
    original: { ...guest } // Keep original values for comparison
  }));
};

// Check if any guest form has changes
const hasChanges = computed(() => {
  return guestForms.value.some(form => {
    const original = form.original;
    return form.notes !== (original.notes || '');
  });
});

// Save guest updates
const saveGuestUpdates = async () => {
  if (!invitation.value) return;
  
  try {
    saving.value = true;
    error.value = '';
    success.value = '';
    
    const updates = guestForms.value.map(form => ({
      id: form.id,
      invitation_id: invitation.value.id,
      guest_name: form.name,
      menu_choice: form.menu_choice,
      is_attending: form.is_attending,
      notes: form.notes || null,
    }));
    
    // Update all guests in a transaction
    const { error: updateError } = await supabase
      .from('guests')
      .upsert(updates, { onConflict: 'id' });
    
    if (updateError) throw updateError;
    
    // Update original values to match current form values
    guestForms.value = guestForms.value.map(form => ({
      ...form,
      original: { ...form }
    }));
    
    success.value = '¡Datos actualizados correctamente!';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      success.value = '';
    }, 5000);
    
  } catch (err) {
    console.error('Error updating guests:', err);
    error.value = 'Error al actualizar los datos. Por favor, inténtalo de nuevo.';
  } finally {
    saving.value = false;
  }
};

// Watch for changes in guest attendance
watch(() => guestForms.value.map(g => g.is_attending), (newAttendances, oldAttendances) => {
  if (newAttendances.length === oldAttendances.length) {
    for (let i = 0; i < newAttendances.length; i++) {
      if (newAttendances[i] !== oldAttendances[i]) {
        saveGuestUpdates();
      }
    }
  }
}, { deep: true });

// Watch for changes in menu choice
watch(() => guestForms.value.map(g => g.menu_choice), (newChoices, oldChoices) => {
  if (newChoices.length === oldChoices.length) {
    for (let i = 0; i < newChoices.length; i++) {
      if (newChoices[i] !== oldChoices[i]) {
        saveGuestUpdates();
      }
    }
  }
}, { deep: true });

// Fetch invitation with guests by code
const fetchInvitationByCode = async (code) => {
  if (!code) return;
  
  try {
    loading.value = true;
    error.value = '';
    success.value = '';
    
    const invitationData = await getInvitationWithGuests(code);
    
    if (invitationData) {
      invitation.value = invitationData;
      // Initialize guest forms with current data
      if (invitationData.guests && invitationData.guests.length > 0) {
        guestForms.value = initializeGuestForms(invitationData.guests);
      }
      if (invitation.value.songs) {
        emit('writeSong', invitation.value.songs);
      }
    } else {
      invitation.value = null;
      guestForms.value = [];
      error.value = 'No se encontró invitación con este código.';
    }
  } catch (err) {
    console.error('Error fetching invitation:', err);
    error.value = 'Error al cargar detalles de la invitación. Por favor, inténtalo de nuevo.';
    invitation.value = null;
    guestForms.value = [];
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the code query parameter
watch(invitationCode, async (newCode) => {
  if (newCode) {
    await fetchInvitationByCode(newCode);
    localStorage.setItem('weddingInvitationId', invitation.value.id);
  } else {
    invitation.value = null;
    localStorage.removeItem('weddingInvitationId')
  }
}, { immediate: true });

// Fetch items when component mounts
// No need for onMounted as we're using watch with immediate: true
</script>

<template>
  <div class="container mx-auto p-4 max-w-3xl relative pt-[20%]">
    <img class="absolute -top-[5%] right-0 w-full pointer-events-none" src="../assets/confirm_flower_2.png" alt="">
    <h1 class="text-2xl font-bold mb-6 chosenText">Confirmación <br> de asistencia</h1>
    <p class="chosenText font-serif italic text-sm mb-2">
      Tenes tiempo de confirmar <br> hasta el 3 de Febrero de 2026.
    </p>
    <p class="chosenText font-serif italic text-sm mb-4">¡No nos hagas renegar!</p>

    <!-- Loading state -->
    <div v-if="loading || !invitation" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-l-2 border-[#5d6b50] mx-auto"></div>
      <p v-if="loading" class="chosenText mt-4">Cargando detalles de la invitación...</p>
    </div>
    
    <!-- Invitation not found -->
    <div v-else-if="!invitation && invitationCode" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            No se encontró invitación con el código: <span class="font-mono font-bold">{{ invitationCode }}</span>
          </p>
        </div>
      </div>
    </div>
    
    <!-- Invitation details -->
    <div v-if="invitation" class="chosenBG text-white p-6 rounded-lg shadow">
     
      <!-- Guest form -->
      <form @submit.prevent="saveGuestUpdates" class="space-y-6">
        <div v-for="(guest, index) in guestForms" :key="guest.id" class="border border-gray-200 rounded-lg p-4">
          <div class="relative">
            <h3 class="text-2xl font-medium font-serif mb-2">{{ guest.name }}</h3>
            <div v-if="saving" class="flex justify-center mb-2 items-center">
              <i class="fa-solid fa-spinner fa-spin-pulse"></i>
            </div>
          </div>
          
          <!-- Attendance Radio Buttons -->
          <div class="mb-4">
            <div class="flex justify-center gap-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="guest.is_attending" 
                  :value="true" 
                  class="form-radio text-green-500 bg-white"
                  :disabled="saving"
                >
                <span class="font-medium">Asisto</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="guest.is_attending" 
                  :value="false" 
                  class="form-radio text-red-500 bg-white"
                  :disabled="saving"
                >
                <span class="font-medium">No asisto</span>
              </label>
            </div>
          </div>

          <div class="mb-4" :class="{ 'opacity-50': !guest.is_attending }">
            <label class="block text-sm font-medium mb-1">
              Preferencia de menú
            </label>
            <select 
              v-model="guest.menu_choice" 
              :disabled="!guest.is_attending || saving"
              class="mt-1 block w-full pl-2 pr-2 py-2 chosenText text-base border border-gray-300 focus:outline-none rounded-md bg-white"
              required
            >
              <option value="" disabled selected>Seleccionar opción</option>
              <option v-for="option in menuOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="mb-4" v-if="false">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Notas (alergias, pedidos especiales, etc.)
            </label>
            <textarea
              v-model="guest.notes"
              :disabled="!guest.is_attending"
              class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm chosenText"
              rows="2"
              placeholder="¿Alguna nota o pedido especial?"
            ></textarea>
          </div>
        </div>
        
        <!-- Submit Button -->
        <span v-if="hasChanges"  class="inline-flex items-center py-1 px-2 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Cambios sin guardar
        </span>
        <div class="pt-2 flex justify-end" v-if="false">
          <button
            type="submit"
            :disabled="!hasChanges || saving"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed bg-white chosenText"
          >
            {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </form>
    </div>
    <!-- Success message -->
    <div v-if="success" class="my-4 p-4 bg-green-50 text-green-800 rounded-md">
      {{ success }}
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="my-4 p-4 bg-red-50 text-red-800 rounded-md">
      {{ error }}
    </div>
    
    <!-- No code provided message -->
    <div v-if="!invitationCode" class="bg-blue-50 border-l-4 border-blue-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700">
            Please provide an invitation code in the URL (e.g., <span class="font-mono">?code=ABC123</span>)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
