<template>
  <AdventureHeader />
  <h3 class="factoid_container mt-5 mb-5">
    <FactoidView />
  </h3>
  <div class="locations_container">
    <div class="add_location">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" id="description" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="latitude">Latitude</label>
          <input type="text" class="form-control" id="latitude" v-model="latitude" />
        </div>
        <div class="form-group">
          <label for="longitude">Longitude</label>
          <input type="text" class="form-control" id="longitude" v-model="longitude" />
        </div>
        <div class="form-group">
          <button type="submit">Add Location</button>
        </div>
      </form>
    </div>
    <div class="locations_content">
      <h1>Locations</h1>
      <ul class="locations_list">
        <li v-for="location in locations" :key="location.id">
          <h2>{{ location.name }}</h2>
          <p>{{ location.description }}</p>
          <p>Latitude: {{ location.latitude }}</p>
          <p>Longitude: {{ location.longitude }}</p>
          <button @click="deleteLocation(location)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
  <AdventureMap />
</template>

<script>
import AdventureMap from '@/components/AdventureMap.vue';
import AdventureHeader from './AdventureHeader.vue';
import FactoidView from './FactoidView.vue';
export default {
  components: {
    AdventureMap,
    AdventureHeader,
    FactoidView,
  },
  data() {
    return {
      locations: [],
      name: "",
      description: "",
      latitude: "",
      longitude: "",
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("http://localhost:8000/api/locations/");
        this.locations = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitForm() {
      try {
        const response = await this.$http.post("http://localhost:8000/api/locations/", {
          name: this.name,
          description: this.description,
          latitude: this.latitude,
          longitude: this.longitude,
        });
        this.locations.push(response.data);
        this.name = "";
        this.description = "";
        this.latitude = "";
        this.longitude = "";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLocation(location) {
      let confirmation = confirm("Do you want to delete this location?");

      if (confirmation) {
        try {
          await this.$http.delete(`http://localhost:8000/api/locations/${location.id}/`);
          const index = this.locations.findIndex((item) => item.id === location.id);
          if (index !== -1) {
            this.locations.splice(index, 1);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },

  },
  created() {
    this.getData();
  },
};
</script>
