<template>
  <div>
    <PlacesTest @placesLoaded="updatePlaces" />
    <AdventureMap :places="places" />
  </div>
</template>

<script>
import PlacesTest from "./PlacesTest.vue";
import AdventureMap from "./AdventureMap.vue";

export default {
  components: {
    PlacesTest,
    AdventureMap,
  },
  data() {
    return {
      places: [],
    };
  },
  methods: {
    updatePlaces(places) {
      this.places = places;
    },
  },
};
</script>
