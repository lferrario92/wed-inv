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

// Get code from query parameter
const invitationCode = computed(() => {
  return route.query.code?.toUpperCase() || '';
});

// Menu options
const menuOptions = [
  { value: 'regular', label: 'Regular' },
  { value: 'vegetarian', label: 'Vegetariano' },
  { value: 'celiac', label: 'Sin Gluten' },
  { value: 'none_selected', label: 'Sin especificar' }
];

// Format menu choice for display
const formatMenuChoice = (choice) => {
  const option = menuOptions.find(opt => opt.value === choice);
  return option ? option.label : choice;
};

// Initialize guest forms with current data
const initializeGuestForms = (guests) => {
  return guests.map(guest => ({
    id: guest.id,
    name: guest.guest_name,
    menu_choice: guest.menu_choice || 'none_selected',
    is_attending: guest.is_attending ?? true, // Default to true if null/undefined
    notes: guest.notes || '',
    original: { ...guest } // Keep original values for comparison
  }));
};

// Check if any guest form has changes
const hasChanges = computed(() => {
  return guestForms.value.some(form => {
    const original = form.original;
    return form.menu_choice !== original.menu_choice || 
           form.is_attending !== original.is_attending ||
           form.notes !== (original.notes || '');
  });
});

// Save guest updates
const saveGuestUpdates = async () => {
  if (!invitation.value || !hasChanges.value) return;
  
  try {
    saving.value = true;
    error.value = '';
    success.value = '';
    
    const updates = guestForms.value.map(form => ({
      id: form.id,
      invitation_id: form.original.invitation_id,
      guest_name: form.original.guest_name,
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
    
    success.value = '¡Preferencias actualizadas correctamente!';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      success.value = '';
    }, 5000);
    
  } catch (err) {
    console.error('Error updating guests:', err);
    error.value = 'Error al actualizar las preferencias. Por favor, inténtalo de nuevo.';
  } finally {
    saving.value = false;
  }
};

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
  } else {
    invitation.value = null;
  }
}, { immediate: true });

// Fetch items when component mounts
// No need for onMounted as we're using watch with immediate: true
</script>

<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <h1 class="text-2xl font-bold mb-6">Confirmación de asistencia</h1>
    
    <!-- Success message -->
    <div v-if="success" class="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
      {{ success }}
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="mt-4 p-4 bg-red-50 text-red-800 rounded-md">
      {{ error }}
    </div>
    
    <!-- Loading state -->
    <div v-if="loading && !invitation" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p v-if="loading" class="text-gray-600">Cargando detalles de la invitación...</p>
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
    <div v-if="invitation" class="bg-white p-6 rounded-lg shadow">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Detalles de la invitación</h2>
        <p class="text-gray-600">Código de invitación: <span class="font-mono">{{ invitation.code }}</span></p>
      </div>
      
      <!-- Guest form -->
      <form @submit.prevent="saveGuestUpdates" class="space-y-6">
        <div v-for="(guest, index) in guestForms" :key="guest.id" class="border border-gray-200 rounded-lg p-4">
          <h3 class="text-lg font-medium text-gray-900 mb-3">{{ guest.name }}</h3>
          
          <!-- Attendance Toggle -->
          <div class="mb-4">
            <label class="flex flex-col gap-2 items-center cursor-pointer">
              <div class="relative">
                <input type="checkbox" v-model="guest.is_attending" class="sr-only">
                <div class="block bg-gray-300 w-14 h-8 rounded-full"></div>
                <div 
                  class="absolute left-1 top-1 w-6 h-6 rounded-full transition transform"
                  :class="{ 'translate-x-6 bg-green-500': guest.is_attending, 'bg-red-500': !guest.is_attending }"
                ></div>
              </div>
              <div class="text-gray-700 font-medium">
                {{ guest.is_attending ? 'Asistirá' : 'No asistirá' }}
              </div>
            </label>
          </div>

          <div class="mb-4" :class="{ 'opacity-50': !guest.is_attending }">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Preferencia de menú
            </label>
            <select 
              v-model="guest.menu_choice" 
              :disabled="!guest.is_attending"
              class="mt-1 block w-full pl-2 pr-2 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option v-for="option in menuOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Notas (alergias, pedidos especiales, etc.)
            </label>
            <textarea
              v-model="guest.notes"
              :disabled="!guest.is_attending"
              class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              rows="2"
              placeholder="¿Alguna nota o pedido especial?"
            ></textarea>
            <span v-if="hasChanges"  class="inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Cambios sin guardar
            </span>
          </div>
        </div>
        
        <!-- Submit Button -->
        <div class="pt-4 flex justify-end">
          <button
            type="submit"
            :disabled="!hasChanges || saving"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </form>
      
      <!-- Event Details -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-3">Event Details</h3>
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-gray-700">
            <span class="font-medium">Date:</span> Saturday, November 15, 2025
          </p>
          <p class="text-gray-700 mt-1">
            <span class="font-medium">Time:</span> 4:00 PM
          </p>
          <p class="text-gray-700 mt-1">
            <span class="font-medium">Venue:</span> The Grand Ballroom, 123 Wedding Lane, Cityville
          </p>
          <p class="mt-3 text-sm text-gray-600">
            Please RSVP by October 15, 2025. We look forward to celebrating with you!
          </p>
        </div>
      </div>
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
