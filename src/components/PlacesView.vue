<template>
    <AdventureHeader />
    <div class="locations_container pt-5">
      <form @submit.prevent="fetchJsonData">
        <input
          class="input_container text-center"
          v-model="addressInput"
          placeholder="Enter address to search"
        />
    </form>
    <button class="btn btn-dark mt-3" @click="fetchJsonData">Search</button>
    </div>
    <div class="error-message pt-2" v-if="this.error">{{ this.error }}</div>
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
  import AdventureHeader from "./AdventureHeader.vue";
  import { mapGetters } from "vuex";
  import axios from "axios";

  export default {
    components: {
      AdventureHeader,
    },
    data() {
      return {
        jsonData: null,
        addressInput: "",
        searchQuery: "",
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
      async fetchJsonData() {
        if (!this.isLoggedIn) {
          this.error =
            "User is not logged in. Please log in to search for addresses.";
          return;
        }

        const address = this.addressInput;

        try {
          const token = localStorage.getItem("jwtToken");
          console.log(token);
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            `http://localhost:8000/places?address=${address}`,
            { headers }
          );
          this.jsonData = response.data;
          this.searchQuery = this.addressInput;
        } catch (error) {
          if (error.response && error.response.data) {
            console.error(error);
            this.error = error.response.data.error;
          }
        }
      },
    },
  };
  </script>

  <style src="./ContentStyling.css"></style>
