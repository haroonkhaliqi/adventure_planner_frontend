<template>
  <div id="layout">
    <MapComponent />
  </div>
</template>

<script>
import MapComponent from "./components/MapComponent.vue";

export default {
  components: {
    MapComponent,
  },
};
</script>

<style>
#layout {
  flex: 1;
  display: flex;
  position: relative;
}
</style>
