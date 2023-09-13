<template>
  <AdventureHeader />
  <h3 class="factoid_container mt-5 mb-5">
    <FactoidView />
  </h3>
  <div class="locations_container">
    <input class="input_container text-center" v-model="addressInput" placeholder="Enter address to search" />
    <button @click="fetchJsonData">Search</button>
  </div>
  <div class="results_container">
    <div v-if="jsonData">
      <h4>Search Results:</h4>
      <ul class="card-list">
        <li v-for="(result, index) in jsonData.results" :key="index">
          <div class="card text-dark bg-light mb-3">
            <div class="card-header">{{ searchQuery }}</div>
            <div class="card-body">
              <h5 class="card-title">{{ result.name }}</h5>
              <p class="card-text">{{ result.address }}</p>
              <p class="card-text">{{ result.phone_number }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AdventureHeader from './AdventureHeader.vue';
import FactoidView from './FactoidView.vue';
import axios from "axios";

export default {
  components: {
    AdventureHeader,
    FactoidView,
  },
  data() {
    return {
      jsonData: null,
      addressInput: "",
      searchQuery: "",
    };
  },
  methods: {
    async fetchJsonData() {
      const address = this.addressInput;

      try {
        const response = await axios.get(`http://localhost:8000/places?address=${address}`);
        this.jsonData = response.data;
        this.searchQuery = this.addressInput;
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    },
  },
};
</script>

<style src="./AdventureLocations.css"></style>
