<template>
  <AdventureHeader />
  <h1 class="home-container mt-5 mb-5">HOME PAGE</h1>
    <h4>Authentiation status: <b>{{ this.isLoggedIn }}</b></h4>
    <h4>Current username: <b>{{ this.getUsername || "username null" }}</b></h4>
</template>

<script>
import AdventureHeader from "./AdventureHeader.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AdventureHeader,
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getUsername"]),
    isAuthenticated() {
      return !!this.isLoggedIn;
    },
    sayName() {
      return this.getUsername;
    },
  },
};
</script>

<style src="./ContentStyling.css"></style>
