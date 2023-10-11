<template>
  <div class="places-container mt-5">
    <div class="search-container">
      <input
        v-model="searchQuery"
        @keyup.enter="searchPlaces"
        placeholder="Search for a place"
        class="form-control"
      />
      <select v-model="selectedPlaceType" class="form-select mt-3 mb-2">
        <option value="">Select a place type</option>
        <option value="bar">Bar</option>
        <option value="cafe">Cafe</option>
        <option value="church">Church</option>
        <option value="gym">Gym</option>
        <option value="library">Library</option>
        <option value="movie_theater">Movie Theater</option>
        <option value="museum">Museum</option>
        <option value="park">Park</option>
        <option value="restaurant">Restaurant</option>
        <option value="shopping_mall">Shopping Mall</option>
      </select>
      <button @click="searchAndToggleSidebar" class="btn btn-primary mb-2">
        Search
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      places: [],
      selectedPlaceType: "",
      isSidebarOpen: false,
    };
  },

  methods: {
    searchPlaces() {
      // const jwtToken = localStorage.getItem("jwtToken");

      axios
        .get(
          // `http://localhost:8000/places/api/test/?address=${this.searchQuery}&type=${this.selectedPlaceType}`,
          `http://localhost:8000/places/api/test/`
          // {
          //   headers: {
          //     Authorization: `Bearer ${jwtToken}`,
          //   },
          // }
        )
        .then((response) => {
          const nearbyPlaces = response.data.results;
          this.places = nearbyPlaces;
          this.$emit("placesDataEvent", response.data);

          // console.log(this.places);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    searchAndToggleSidebar() {
      if (!this.isSidebarOpen) {
        this.toggleSidebar();
      }

      this.searchPlaces();
    },
  },
};
</script>

<style src="./SearchBarComponent.css"></style>
