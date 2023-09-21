<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import "./app.css";
export default {
  created() {
    this.$router.beforeEach((to, from, next) => {
      const token = localStorage.getItem("jwtToken");

      const restrictedRoutes = ["signup", "login"];

      if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
        next("/login");
      } else if (restrictedRoutes.includes(to.name) && token) {
        next({ name: "home" });
      } else {
        next();
      }
    });
  },
  compatConfig: { MODE: 3 },
  name: "App",
};
</script>
