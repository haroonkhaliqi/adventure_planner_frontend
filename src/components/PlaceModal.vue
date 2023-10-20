<template>
  <div>
    <div class="modal-background" v-if="placeDetails">
      <div class="modal-dialog">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-white">
          <div class="container-fluid">
            <div>
              <!-- Left Column -->
            </div>
            <div>
              <!-- Middle Column -->
              <h5 class="modal-title">{{ selectedPlace.name }}</h5>
            </div>
            <div>
              <!-- Right Column -->
              <button
                type="button"
                class="btn-close btn-close-white"
                @click="closeModal"
              ></button>
            </div>
          </div>
        </nav>

        <div class="container pt-2">
          <img
            class="img-container pb-2"
            v-if="placePhoto"
            :src="placePhoto"
            alt="Place Photo"
          />
          <!-- Body Section -->
          <div v-if="this.placeDetails.formatted_address">
            <h5>Address</h5>
          </div>
          <p>{{ this.placeDetails.formatted_address }}</p>
          <div v-if="this.placeDetails.formatted_phone_number">
            <h5>Phone Number</h5>
            <p>{{ this.placeDetails.formatted_phone_number }}</p>
          </div>
          <a
            v-if="placeDetails.website"
            :href="placeDetails.website"
            target="_blank"
            class="btn btn-primary"
            >Visit Website</a
          >
        </div>
        <footer class="bg-dark text-center text-white fixed-bottom">
          <!-- footer -->
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    selectedPlace: Object,
    openModal: Boolean,
  },
  data() {
    return {
      placeDetails: null,
      placePhoto: null,
    };
  },
  created() {
    if (this.openModal) {
      this.fetchPlaceDetails();
      this.fetchPlacePhoto();
    }
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    fetchPlaceDetails() {
      axios
        .get(
          `http://localhost:8000/api/place/details/?place_id=${this.selectedPlace.place_id}`
        )
        .then((response) => {
          this.placeDetails = response.data.results.result;
        })
        .catch((error) => {
          console.error("Error fetching place details:", error);
        });
    },
    fetchPlacePhoto() {
      if (
        this.selectedPlace &&
        this.selectedPlace.photos &&
        this.selectedPlace.photos.length > 0
      ) {
        axios
          .get(
            `http://localhost:8000/api/photos/?reference=${this.selectedPlace.photos[0].photo_reference}`
          )
          .then((response) => {
            this.placePhoto = response.request.responseURL;
          })
          .catch((error) => {
            console.error("Error fetching place photo:", error);
          });
      }
    },
  },
};
</script>

<style scoped src="./PlaceModal.css"></style>
