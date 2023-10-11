<template>
  <div>
    <button
      type="button"
      class="btn btn-dark btn-sq-responsive mt-5"
      @click="goToPlaces('cafe')"
    >
      Cafe
    </button>
    <button
      type="button"
      class="btn btn-dark btn-sq-responsive mt-5"
      @click="goToPlaces('church')"
    >
      Church
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAddress"]),
  },
  methods: {
    async goToPlaces(type) {
      const address = this.getAddress;

      if (address !== null) {
        this.$router.push({
          name: "places_bad",
          query: { address, type },
        });
      } else {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
