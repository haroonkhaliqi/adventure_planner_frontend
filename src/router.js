import { createRouter, createWebHistory } from "vue-router";
import Signup from "./components/SignupComponent.vue";
import Login from "./components/LoginComponent.vue";
import ContentComponent from "./components/ContentComponent.vue";
import RoutingData from "./components/RoutingData.vue";
import PlacesOld from "./components/PlacesOld.vue";
import TypeSelection from "./components/TypeSelection.vue";
import PlacesComponent from "./components/PlacesComponent.vue";
import PlacesMapped from "./components/MapComponent.vue";
import store from "./store";

const routes = [
  {
    path: "/",
    component: ContentComponent,
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
    component: PlacesOld,
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
    component: PlacesComponent,
    name: "places",
  },
  {
    path: '/map',
    component: PlacesMapped,
    name: 'map',
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
