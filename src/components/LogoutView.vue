<template>
  <a @click="logout"> Logout</a>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getUsername"]),
    isAuthenticated() {
      return this.$root.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      try {
        localStorage.removeItem("jwtToken");
        this.clearToken();
        this.$router.push({ name: "home" });
        this.clearUser();
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    ...mapMutations(["clearUser"]),
    ...mapMutations(["clearToken"]),
  },
};
</script>
