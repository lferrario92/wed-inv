import { createRouter, createWebHistory } from 'vue-router';
import HelloWorldCurrent from '../components/HelloWorldCurrent.vue';
import TestData2 from '../components/TestData2.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorldCurrent
  },
  {
    path: '/supabase-test',
    name: 'SupabaseTest',
    component: TestData2
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
