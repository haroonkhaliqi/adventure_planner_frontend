<template>
  <HeaderComponent />
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
      <button @click="searchPlaces" class="btn btn-primary mb-2">Search</button>
    </div>
    <div>
      <template v-for="(place, index) in places" :key="index">
        <div class="mt-4">
          <div class="container border border-5 p-3">
            <h1 class="mb-2">{{ place.name }}</h1>
            <h5 v-if="place.price_level">
              Price Level:
              <span v-for="d in place.price_level" :key="d">&#36;</span>
            </h5>
            <h5 v-if="place.rating">
              Rating:
              {{ place.rating }}
            </h5>
            <p class="mb-0 mt-3">
              <span
                v-for="(type, typeIndex) in place.types.slice(0, 5)"
                :key="typeIndex"
                class="badge bg-dark fw-lighter fs-6 me-1 text-center mb-1"
              >
                {{ type.replace(/_/g, " ") }}
              </span>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderComponent from "./HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
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
          console.log(this.places);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style src="./PlacesComponent.css"></style>
