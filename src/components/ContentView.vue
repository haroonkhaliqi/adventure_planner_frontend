<template>
  <AdventureHeader />
  <div class="full-screen-bg">
    <div class="locations_container pt-3">
      <h3>SEARCH PLACES TO VISIT</h3>
      <div class="main-search-input-item">
        <div class="main-search-input fl-wrap">
          <form @submit.prevent="goToPlaces">
            <input
              class="input_container text-center"
              v-model="addressInput"
              placeholder="Where are we going?"
              @keyup.enter="goToPlaces"
            />
          </form>
          <button class="btn btn-dark mt-2 mb-5" @click="goToPlaces">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="error-message pt-2" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import AdventureHeader from "./AdventureHeader.vue";
import { mapGetters, mapMutations } from "vuex";

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
    ...mapMutations(["setAddress"]),
    async goToPlaces() {
      this.setAddress(this.addressInput);
      this.$router.push({ name: "type_selection" });
    },
  },
};
</script>

<style src="./ContentViewStyling.css"></style>
