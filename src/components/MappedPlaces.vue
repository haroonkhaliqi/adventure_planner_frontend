<template>
  <div class="header-container">
    <HeaderComponent />
  </div>

  <div v-if="isPopupOpen" class="popup-container" @click="closePopup">
    <div class="popup">
      <h1>Click anywhere to place a routing marker</h1>
    </div>
  </div>

  <div class="full-container">
    <div class="map-container">
      <MapComponent
        :places="placesData ? placesData.coords : []"
        :showMap="showMap"
        :key="showMap"
      />
    </div>
    <SearchBarComponent @placesDataEvent="handlePlacesData" />
    <div class="sidebar-container" v-if="placesData != null">
      <SidebarComponent :places="placesData.results" />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./HeaderComponent.vue";
import MapComponent from "./MapComponent.vue";
import SearchBarComponent from "./SearchBarComponent.vue";
import SidebarComponent from "./SidebarComponent.vue";
export default {
  components: {
    HeaderComponent,
    SearchBarComponent,
    SidebarComponent,
    MapComponent,
  },
  data() {
    return {
      showMap: true,
      placesData: null,
      isPopupOpen: true,
    };
  },
  methods: {
    handlePlacesData(data) {
      this.placesData = data;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
  },
};
</script>

<style src="./MappedPlaces.css"></style>
