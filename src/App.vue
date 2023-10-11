<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./app.css";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";

export default {
  created() {
    this.$router.beforeEach((to, from, next) => {
      const token = localStorage.getItem("jwtToken");
      const expTime = localStorage.getItem("exp");

      if (expTime && token && expTime <= Date.now() / 1000) {
        this.$store.commit("clearToken");
        this.$store.commit("clearUser");
        next("/");
      } else if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !token
      ) {
        next("/login");
      } else {
        next();
      }
    });
  },
  compatConfig: { MODE: 3 },
  name: "App",
};
</script>
