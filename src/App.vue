<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm" v-if="false">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold text-gray-800">Wedding Invite</span>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <RouterLink 
                to="/" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-blue-500 text-gray-900"
                exact
              >
                Home
              </RouterLink>
              <RouterLink 
                to="/supabase-test" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-blue-500 text-gray-900"
              >
                Supabase Test
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <RouterLink 
            to="/"
            class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            active-class="bg-blue-50 border-blue-500 text-blue-700"
            exact
          >
            Home
          </RouterLink>
          <RouterLink 
            to="/supabase-test"
            class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            active-class="bg-blue-50 border-blue-500 text-blue-700"
          >
            Supabase Test
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto ">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Router link transitions */
.router-link-active {
  @apply border-blue-500 text-gray-900;
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}


.chosenBG {
  @apply bg-rose-50 text-rose-900;
}


.chosenText {
  @apply text-rose-900;
}

.chosenBG p {
  @apply text-rose-900;
}

.chosenBG-over {
  @apply bg-rose-200;
}

.chosenBG-over span {
  @apply text-rose-900;
}

.liCal {
  @apply flex flex-col items-center justify-center w-20 h-20 p-2;
}
</style>
