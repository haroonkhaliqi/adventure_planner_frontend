<template>
  <a class="nav-link" @click="logout" href="#">Logout</a>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

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
      // Get the session ID from sessionStorage
      const sessionId = sessionStorage.getItem("sessionId");

      if (!sessionId) {
        console.warn("Session ID not found in sessionStorage.");
        return;
      }

      try {
        // Send a POST request with the session ID as data
        const response = await axios.post(
          `http://localhost:8000/logout/?session_key=${sessionId}`,
          { sessionId }
        );

        if (response.status === 200) {
          // Clear the session ID from sessionStorage on successful logout
          sessionStorage.removeItem("sessionId");
          console.log("User has logged out");

          // Toggle the isAuthenticated value in the Vuex store
          this.toggleAuthentication();
        } else {
          console.error("Logout failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
    // Map the toggleAuthentication mutation from the Vuex store
    ...mapMutations(["toggleAuthentication"]),
  },
};
</script>
