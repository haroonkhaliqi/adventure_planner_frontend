<template>
  <a @click="logout"> Logout</a>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    async logout() {
      try {
        this.clearToken();
        this.clearUser();
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    ...mapMutations(["clearToken"]),
    ...mapMutations(["clearUser"]),
  },
};
</script>
