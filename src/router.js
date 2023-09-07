import { createRouter, createWebHistory } from 'vue-router';
import Signup from './components/SignupView.vue';
import Login from './components/LoginView.vue';
import AdventureLocations from './components/AdventureLocations.vue';

const routes = [
  {
    path: '/',
    component: AdventureLocations,
    name: 'home',
  },
  {
    path: '/signup',
    component: Signup,
    name: 'signup',
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
