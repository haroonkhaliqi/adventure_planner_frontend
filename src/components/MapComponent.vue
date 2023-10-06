<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";


export default {
  data() {
    return {
      mapboxToken: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/get_mapbox_token/")
      .then((response) => {
        this.mapboxToken = response.data.token;

        mapboxgl.accessToken = this.mapboxToken;

        const map = new mapboxgl.Map({
          container: this.$refs.mapContainer,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [-71.224518, 42.213995],
          zoom: 9,
        });
        this.map = map;
      })
      .catch((error) => {
        console.error("Error fetching Mapbox token:", error);
      });
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh
}
</style>
