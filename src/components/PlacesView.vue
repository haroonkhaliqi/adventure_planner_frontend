<template>
  <AdventureHeader />
  <div class="locations_container pt-3">
    <h3>SEARCH PLACES TO VISIT</h3>
    <form @submit.prevent="fetchJsonData">
      <input
        class="input_container text-center"
        v-model="addressInput"
        placeholder="Enter address to search"
        @keyup.enter="fetchJsonData"
      />
      <input
        class="right_input_container text-center"
        v-model="typeInput"
        placeholder="Enter a type of place"
        @keyup.enter="fetchJsonData"
      />
    </form>
    <button class="btn btn-dark mt-2 mb-5" @click="fetchJsonData">Search</button>
  </div>
  <div class="error-message pt-2" v-if="this.error">{{ this.error }}</div>
  <div class="results_container">
    <div v-if="jsonData">
      <ul class="card-list">
        <li v-for="(result, index) in jsonData.results" :key="index">
          <div class="card text-dark bg-light mb-3">
            <div class="card-header h3">{{ result.name }}</div>
            <div class="card-body">
              <details class="card-text" v-if="result.address != null">
                <summary>Address</summary>
                {{ result.address }}
              </details>
              <br />
              <details class="card-text" v-if="result.phone_number != null">
                <summary>Phone Number</summary>
                {{ result.phone_number }}
              </details>
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
      typeInput: "",
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
      const type = this.typeInput;

      try {
        const token = localStorage.getItem("jwtToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `http://localhost:8000/places?address=${address}&type=${type}`,
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

<style src="./PlacesStyling.css"></style>
