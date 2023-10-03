<template>
  <div>
    <div class="map-container">
      <l-map v-if="places.length > 0" :center="mapCenter" :zoom="zoom">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-control-layers />
        <l-marker
          v-for="(place, index) in places"
          :key="index"
          :lat-lng="[place.geometry.location.lat, place.geometry.location.lng]"
          @click="log(place)"
        >
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LMarker,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  props: {
    places: Array,
  },
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LMarker,
  },
  data() {
    return {
      zoom: 2,
      mapCenter: [47.41322, -1.219482],
      additionalZoom: 4,
      isModalVisible: false,
    };
  },
  watch: {
    places: {
      handler(newPlaces) {
        if (newPlaces && newPlaces.length > 0) {
          const sumLat = newPlaces.reduce(
            (sum, place) => sum + place.geometry.location.lat,
            0
          );
          const sumLng = newPlaces.reduce(
            (sum, place) => sum + place.geometry.location.lng,
            0
          );

          const lats = newPlaces.map((place) => place.geometry.location.lat);
          const lngs = newPlaces.map((place) => place.geometry.location.lng);
          const minLat = Math.min(...lats);
          const maxLat = Math.max(...lats);
          const minLng = Math.min(...lngs);
          const maxLng = Math.max(...lngs);

          const centerLat = sumLat / newPlaces.length;
          const centerLng = sumLng / newPlaces.length;
          const latRange = maxLat - minLat;
          const lngRange = maxLng - minLng;
          const padding = 0.1;

          const zoomLat = Math.floor(Math.log2(360 / (latRange + padding)));
          const zoomLng = Math.floor(Math.log2(360 / (lngRange + padding)));
          const zoom = Math.min(zoomLat, zoomLng) + this.additionalZoom;

          this.mapCenter = [centerLat, centerLng];
          this.zoom = zoom;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    log(place) {
      console.log(place);
    },
  },
};
</script>

<style src="./AdventureMap.css" />
