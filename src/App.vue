<template>
  <div id="app">
    <AdventureLocations />
    <AdventureMap />
  </div>
</template>
<script>
import AdventureLocations from "./components/AdventureLocations.vue";
import AdventureMap from "./components/AdventureMap.vue";
import "./app.css";
export default {
  name: "App",
  components: {
    AdventureLocations,
    AdventureMap,
  },
};
</script>
<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
