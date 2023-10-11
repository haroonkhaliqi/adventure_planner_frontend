import { createRouter, createWebHistory } from "vue-router";
import Signup from "./components/SignupComponent.vue";
import Login from "./components/LoginComponent.vue";
import ContentComponent from "./components/ContentComponent.vue";
import RoutingData from "./components/RoutingData.vue";
import MappedPlaces from "./components/MappedPlaces.vue";

const routes = [
  {
    path: "/",
    component: ContentComponent,
    name: "home",
  },
  {
    path: "/signup/",
    component: Signup,
    name: "signup",
  },
  {
    path: "/login/",
    component: Login,
    name: "login",
  },
  {
    path: "/routing/data/",
    meta: { requiresAuth: true },
    component: RoutingData,
    name: "routing_data",
  },
  {
    path: "/map/",
    component: MappedPlaces,
    name: "places_mapped",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
