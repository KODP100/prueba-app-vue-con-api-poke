import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../login/Auth.vue';
import Home from '../login/Home.vue';  // Creamos un componente Home

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),  // Sin par%C3%A1metros
  routes,
});

export default router;
