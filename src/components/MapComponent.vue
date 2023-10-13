<template>
  <div v-if="showMap" ref="mapContainer" class="map-container"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

export default {
  data() {
    return {
      mapboxToken: null,
      map: null,
      markers: [],
      placeCoordinates: [],
      isPopupOpen: true,
    };
  },
  props: {
    showMap: Boolean,
    places: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    showMap: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.createMap();
        }
      },
    },
    places: {
      handler(newPlaces) {
        this.updateMarkers(newPlaces);
        this.extractCoordinates(newPlaces);
        this.zoomToMarkers();
      },
      immediate: true,
    },
  },
  methods: {
    createMap() {
      axios
        .get("http://localhost:8000/api/get_mapbox_token/")
        .then((response) => {
          this.mapboxToken = response.data.token;

          mapboxgl.accessToken = this.mapboxToken;

          const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
          });
          const map = new mapboxgl.Map({
            container: this.$refs.mapContainer,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-99.57134, 39.68639],
            zoom: 3,
          });

          this.map = map;
          this.map.addControl(directions, "top-left");
        })
        .catch((error) => {
          console.error("Error fetching Mapbox token:", error);
        });
    },

    updateMarkers(places) {
      this.markers.forEach((marker) => marker.remove());

      places.forEach((place) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([place.longitude, place.latitude])
          .addTo(this.map);

        this.markers.push(marker);
      });
    },
    extractCoordinates(places) {
      this.placeCoordinates = places.map((place) => ({
        latitude: place.latitude,
        longitude: place.longitude,
      }));
    },
    zoomToMarkers() {
      if (this.markers.length === 0) return;

      const coordinates = this.markers.map((marker) => marker.getLngLat());

      const bounds = coordinates.reduce(function (bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      this.map.fitBounds(bounds, { padding: 200 });
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
@import "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css";
@import "./MapComponent.css";
</style>
