import { createRouter, createWebHistory } from "vue-router";
import Signup from "./components/SignupView.vue";
import Login from "./components/LoginView.vue";
import ContentView from "./components/ContentView.vue";
import RoutingData from "./components/RoutingData.vue";

const routes = [
  {
    path: "/",
    component: ContentView,
    name: "home",
  },
  {
    path: "/signup",
    component: Signup,
    name: "signup",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/route/data",
    component: RoutingData,
    name: "routing_data",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
