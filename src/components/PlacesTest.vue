<template>
  <AdventureHeader />
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
        <option value="restaurant">Restaurant</option>
        <option value="park">Park</option>
        <option value="bar">Bar</option>
        <option value="museum">Museum</option>
        <option value="gym">Gym</option>
        <option value="library">Library</option>
        <option value="movie_theater">Movie Theater</option>
        <option value="shopping_mall">Shopping Mall</option>
        <option value="cafe">Cafe</option>
        <option value="church">Church</option>
      </select>
      <button @click="searchPlaces" class="btn btn-primary mb-2">Search</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AdventureHeader from "./AdventureHeader.vue";

export default {
  components: {
    AdventureHeader,
  },
  data() {
    return {
      searchQuery: "",
      places: [],
      selectedPlaceType: "",
    };
  },
  methods: {
    searchPlaces() {
      const jwtToken = localStorage.getItem("jwtToken");

      axios
        .get(
          `http://localhost:8000/places/api/places/?address=${this.searchQuery}&type=${this.selectedPlaceType}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          const nearbyPlaces = response.data.results;
          this.places = nearbyPlaces;

          if (nearbyPlaces.length > 0) {
            this.$emit("places-loaded", nearbyPlaces);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  emits: ["places-loaded"],
};
</script>

<style src="./PlacesTest.css"></style>
