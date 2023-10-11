<template>
  <div
    v-if="showMap"
    ref="mapContainer"
    class="map-container d-flex align-items-center justify-content-center"
  >
    <img
      style="height: 100vh; width: 100vw"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    showMap: Boolean,
  },
  watch: {
    showMap: {
      immediate: true,
      handler() {},
    },
  },
};
</script>
