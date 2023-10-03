import { createRouter, createWebHistory } from "vue-router";
import Signup from "./components/SignupView.vue";
import Login from "./components/LoginView.vue";
import ContentView from "./components/ContentView.vue";
import RoutingData from "./components/RoutingData.vue";
import PlacesView from "./components/PlacesView.vue";
import TypeSelection from "./components/TypeSelection.vue";
import MappedPlaces from "./components/MappedPlaces.vue";
import store from "./store";

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
    path: "/places/bad/",
    meta: { requiresAuth: true },
    component: PlacesView,
    name: "places_bad",
  },
  {
    path: "/routing/data",
    meta: { requiresAuth: true },
    component: RoutingData,
    name: "routing_data",
  },
  {
    path: "/places/types/",
    component: TypeSelection,
    name: "type_selection",
    beforeEnter: (to, from, next) => {
      const address = store.getters.getAddress;
      
      if (address !== null) {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },
  {
    path: "/places/",
    component: MappedPlaces,
    name: "places",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
