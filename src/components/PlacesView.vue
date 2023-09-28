<template>
  <AdventureHeader />
  <div>
    <h1 class="content-header mt-3">HOME PAGE</h1>
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
  </div>
</template>

<script>
import AdventureHeader from "./AdventureHeader.vue";
import axios from "axios";

export default {
  components: {
    AdventureHeader,
  },
  data() {
    return {
      jsonData: null,
      error: null,
    };
  },
  mounted() {
    this.fetchJsonData();
  },
  methods: {
    async fetchJsonData() {
      const address = this.$route.query.address;
      const type = this.$route.query.type;

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
        this.error = null;
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
