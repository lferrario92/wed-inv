<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { supabase, TABLE_NAME, getGuestByCode } from '../utils/supabase';

const route = useRoute();
const loading = ref(false);
const error = ref('');
const guest = ref(null);

// Get code from query parameter
const guestCode = computed(() => {
  return route.query.code?.toUpperCase() || '';
});

// Form data for confirmation
const formData = ref({
  confirmed: false
});

// Fetch guest by code
const fetchGuestByCode = async (code) => {
  if (!code) return;
  
  try {
    loading.value = true;
    error.value = '';
    
    const guestData = await getGuestByCode(code);
    
    if (guestData) {
      guest.value = guestData;
      formData.value.confirmed = guestData.confirmed || false;
    } else {
      guest.value = null;
      error.value = 'No guest found with this code.';
    }
  } catch (err) {
    console.error('Error fetching guest:', err);
    error.value = 'Failed to load guest data. Please try again.';
    guest.value = null;
  } finally {
    loading.value = false;
  }
};

// Handle confirmation checkbox change
const handleConfirmationChange = () => {
  console.log('Confirmation changed to:', formData.value.confirmed);
};

// Update guest confirmation status
const updateConfirmation = async () => {
  if (!guest.value) {
    console.error('No guest selected');
    return;
  }
  
  try {
    loading.value = true;
    error.value = '';
    
    const updateData = { 
      confirmed: Boolean(formData.value.confirmed) 
    };
    
    console.log('Attempting to update guest:', {
      table: TABLE_NAME,
      id: guest.value.id,
      data: updateData
    });
    
    // First, try a direct update
    const { data, error: updateError } = await supabase
      .from(TABLE_NAME)
      .update(updateData)
      .eq('id', guest.value.id)
      .select();
    
    if (updateError) {
      console.error('Supabase update error:', updateError);
      throw updateError;
    }
    
    console.log('Update successful, response:', data);
    
    if (data && data[0]) {
      // Update local state with the server's response
      const updatedGuest = data[0];
      guest.value = { ...guest.value, ...updatedGuest };
      formData.value.confirmed = Boolean(updatedGuest.confirmed);
      console.log('Local state updated:', { 
        guest: guest.value, 
        formData: formData.value 
      });
    } else {
      console.warn('No data returned from update, fetching fresh data...');
      // If no data returned, refetch the guest
      await fetchGuestByCode(guestCode.value);
    }
    
    alert('Confirmation status updated successfully!');
  } catch (err) {
    console.error('Error in updateConfirmation:', {
      error: err,
      message: err.message,
      stack: err.stack
    });
    error.value = 'Failed to update confirmation status. Please check the console for details.';
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the code query parameter
watch(guestCode, async (newCode) => {
  if (newCode) {
    await fetchGuestByCode(newCode);
  } else {
    guest.value = null;
  }
}, { immediate: true });

// Fetch items when component mounts
// No need for onMounted as we're using watch with immediate: true
</script>

<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h1 class="text-2xl font-bold mb-6">Guest Confirmation</h1>
    
    <!-- Error message -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <!-- Loading state -->
    <div v-if="loading && !guest" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading guest information...</p>
    </div>
    
    <!-- Guest not found -->
    <div v-else-if="!guest && guestCode" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            No guest found with code: <span class="font-mono font-bold">{{ guestCode }}</span>
          </p>
        </div>
      </div>
    </div>
    
    <!-- Guest confirmation form -->
    <div v-if="guest" class="bg-white p-6 rounded-lg shadow">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Hello, {{ guest.name }}!</h2>
        <span v-if="guest?.guest_list?.length > 0">invitados: {{ guest?.guest_list }}</span>
        <p class="text-gray-600 mt-1">Your invitation code: <span class="font-mono">{{ guest.code }}</span></p>
      </div>
      
      <form @submit.prevent="updateConfirmation" class="space-y-6">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="confirmation-checkbox"
              v-model="formData.confirmed"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              :disabled="loading"
              @change="handleConfirmationChange"
            >
          </div>
          <div class="ml-3 text-sm">
            <label for="confirmation-checkbox" class="font-medium text-gray-700">
              {{ formData.confirmed ? '✅ Confirmed' : '❌ Not Confirmed' }}
            </label>
            <p class="text-gray-500 mt-1">
              {{ formData.confirmed 
                ? 'Thank you for confirming your attendance!' 
               : 'Please check this box to confirm your attendance.' }}
            </p>
          </div>
        </div>
        
        <div class="pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
          >
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
    
    <!-- No code provided message -->
    <div v-if="!guestCode" class="bg-blue-50 border-l-4 border-blue-400 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700">
            Please provide a guest code in the URL (e.g., <span class="font-mono">?code=ABC123</span>)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
