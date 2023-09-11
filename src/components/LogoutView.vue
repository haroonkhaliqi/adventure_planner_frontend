<template>
  <a class="nav-link" @click="logout" href="#">Logout</a>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  computed: {
    // Map the isAuthenticated getter from the Vuex store
    ...mapGetters(["getIsAuthenticated"]),
    isAuthenticated() {
      return this.getIsAuthenticated;
    },
  },
  methods: {
    async logout() {
      // Get jwt from localStorage.
      const jwt = localStorage.getItem("jwt");

      if (jwt) {

        try {

          // Clear the JWT from axios default header on successful logout
          delete axios.defaults.headers.common["Authorization"];

          // Clear the JWT from localStorage on successful logout
          localStorage.removeItem("jwt");
          localStorage.removeItem("username");

          // Toggle the isAuthenticated value in the Vuex store
          this.toggleAuthentication();
        } catch (error) {
          console.error("Error logging out:", error);
        }
      }
    },
    // Map the toggleAuthentication mutation from the Vuex store
    ...mapMutations(["toggleAuthentication"]),
  },
};
</script>
