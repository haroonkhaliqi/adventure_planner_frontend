<template>
  <AdventureHeader />
  <h3 class="factoid_container mt-5 mb-5">
    <FactoidView />
  </h3>
  <div class="routing_data_container">
    <input
      class="input_container text-center"
      v-model="originInput"
      placeholder="Enter your starting origin"
    />
    <input
      class="input_container text-center"
      v-model="destinationInput"
      placeholder="Enter your final destination"
    />
    <button @click="fetchJsonData">Search</button>
  </div>
  <div class="results_container">
    <div v-if="jsonData">
      <h4>Search Results:</h4>
      <div class="text-dark bg-light mb-3">
        <p class="card-text">Distance: {{ jsonData.distance }}</p>
        <p class="card-text">Duration: {{ jsonData.duration }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AdventureHeader from "./AdventureHeader.vue";
import FactoidView from "./FactoidView.vue";
import axios from "axios";

export default {
  components: {
    AdventureHeader,
    FactoidView,
  },
  data() {
    return {
      jsonData: null,
      originInput: "",
      destinationInput: "",
    };
  },
  methods: {
    async fetchJsonData() {
      const origin = this.originInput;
      const destination = this.destinationInput;

      try {
        const token = localStorage.getItem("jwtToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `http://localhost:8000/routes/data/?origin=${origin}&destination=${destination}`,
          { headers }
        );
        this.jsonData = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    },
  },
};
</script>
