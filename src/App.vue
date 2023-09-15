<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import "./app.css";
export default {
  compatConfig: { MODE: 3 },
  name: "App",
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("jwtToken");
    },
  },
};
</script>
<style>
</style>
