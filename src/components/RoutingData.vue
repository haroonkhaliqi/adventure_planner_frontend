<template>
  <AdventureHeader />
  <div class="routing_data_container pt-5">
    <h1>SEARCH ROUTE DETAILS</h1>
    <form @submit.prevent="handleSubmit">
      <input
        class="input_container text-center pr-5"
        v-model="originInput"
        placeholder="Enter starting origin"
        @keyup.enter="handleSubmit"
      />
      <input
        class="right_input_container text-center pl-5"
        v-model="destinationInput"
        placeholder="Enter final destination"
        @keyup.enter="handleSubmit"
      />
    </form>
    <button class="btn btn-dark mt-3" @click="handleSubmit">Search</button>
    <div v-if="formError" class="error-message">
      Please fill in both addresses.
    </div>
    <div class="error-message" v-if="this.error">{{ this.error }}</div>
  </div>
  <div class="results_container">
    <div v-if="jsonData">
      <h4>Search Results:</h4>
      <div class="text-dark bg-light mb-3">
        <p class="card-text">
          Distance: Estimated {{ jsonData.distance }} miles
        </p>
        <p class="card-text" v-if="jsonData.duration.hours == 0">
          Duration: Estimated {{ jsonData.duration.minutes }} minutes
          {{ jsonData.duration.seconds }} seconds
        </p>
        <p class="card-text" v-else>
          Duration: Estimated {{ jsonData.duration.hours }} hours
          {{ jsonData.duration.minutes }} miniutes
          {{ jsonData.duration.seconds }} seconds
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AdventureHeader from "./AdventureHeader.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: {
    AdventureHeader,
  },
  data() {
    return {
      jsonData: null,
      originInput: "",
      destinationInput: "",
      formError: null,
      error: "",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    isAuthenticated() {
      return this.isLoggedIn;
    },
  },
  methods: {
    async handleSubmit() {
      if (!this.isLoggedIn) {
        this.error =
          "User is not logged in. Please log in to search for addresses.";
        return;
      }

      const origin = this.originInput;
      const destination = this.destinationInput;

      if (!origin || !destination) {
        this.formError = "Please fill in both addresses.";
        return;
      } else {
        this.formError = null;
      }

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
      } catch (error) {
        console.error(error);
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style src="./RoutingDataStyling.css" />
