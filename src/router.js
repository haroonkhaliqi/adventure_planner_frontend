import { createRouter, createWebHistory } from "vue-router";
import Signup from "./components/SignupComponent.vue";
import Login from "./components/LoginComponent.vue";
import ContentComponent from "./components/ContentComponent.vue";
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
