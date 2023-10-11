<template>
  <HeaderComponent />
  <div class="map-container">
    <TestComponent :showMap="showMap" :key="showMap" />
  </div>
  <!-- <div class="map-container">
    <MapComponent :showMap="showMap" :key="showMap" />
  </div> -->
  <SearchBarComponent @placesDataEvent="handlePlacesData" />
  <div class="sidebar-container" v-if="placesData != null">
    <SidebarComponent :places="placesData.results" />
  </div>
</template>

<script>
import HeaderComponent from "./HeaderComponent.vue";
// import MapComponent from "./MapComponent.vue";
import SearchBarComponent from "./SearchBarComponent.vue";
import SidebarComponent from "./SidebarComponent.vue";
import TestComponent from "./TestComponent.vue";
export default {
  components: {
    HeaderComponent,
    SearchBarComponent,
    TestComponent,
    SidebarComponent,
    // MapComponent,
  },
  data() {
    return {
      showMap: true,
      placesData: null,
    };
  },
  methods: {
    handlePlacesData(data) {
      this.placesData = data;
    },
    logCoords() {
      console.log(this.placesData);
    },
  },
};
</script>

<style src="./MappedPlaces.css"></style>
