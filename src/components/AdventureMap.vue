<template>
  <div style="height: 75vh; width: 50vw;">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[47.41322, -1.219482]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
  },
  data() {
    return {
      zoom: 2,
    };
  },
  methods: {
    log(a) {
      console.log(a);
    },
  },
};
</script>
