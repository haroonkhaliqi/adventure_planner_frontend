<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="locations_container">
    <div class="add_location">
      <form v-on:submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="title" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" id="description" v-model="description"></textarea>
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
          <h2>{{ location.title }}</h2>
          <p>{{ location.description }}</p>
          <button @click="toggleLocation(location)">
            {{ location.completed ? "Undo" : "Complete" }}
          </button>
          <button @click="deleteLocation(location)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locations: [""],
      title: "",
      description: "",
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
          title: this.title,
          description: this.description,
          completed: false,
        });
        this.locations.push(response.data);
        this.title = "";
        this.description = "";
      } catch (error) {
        console.log(error);
      }
    },
    async toggleLocation(location) {
      try {
        const response = await this.$http.put(`http://localhost:8000/api/locations/${location.id}/`, {
          completed: !location.completed,
          title: location.title,
          description: location.description,
        });

        let locationIndex = this.locations.findIndex((t) => t.id === location.id);

        this.locations = this.locations.map((location) => {
          if (this.locations.findIndex((t) => t.id === location.id) === locationIndex) {
            return response.data;
          }
          return location;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLocation(location) {
      let confirmation = confirm("Do you want to delete this location?");

      if (confirmation) {
        try {
          await this.$http.delete(`http://localhost:8000/api/locations/${location.id}`);

          this.getData();
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
