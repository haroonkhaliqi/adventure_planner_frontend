<template>
  <div>
    <div id="sidebar" :class="{ active: isSidebarOpen }">
      <div class="sidebar-content">
        <template v-for="(place, index) in places" :key="index">
          <div>
            <div class="container border p-3">
              <div class="d-flex justify-content-center align-items-center">
                <h1 class="mb-2 text-white">{{ place.name }}</h1>
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <h5 v-if="place.price_level" class="text-white">
                  Price Level:
                  <span v-for="d in place.price_level" :key="d">&#36;</span>
                </h5>
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <h5 v-if="place.rating" class="text-white">
                  Rating: {{ place.rating }}
                </h5>
              </div>
              <p class="mb-0 mt-3">
                <span
                  v-for="(type, typeIndex) in place.types.slice(0, 5)"
                  :key="typeIndex"
                  class="badge bg-dark fw-lighter fs-6 me-1 text-center"
                >
                  {{ type.replace(/_/g, " ") }}
                </span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <button
      @click="toggleSidebar"
      class="btn btn-dark sidebar-button"
      :class="{ active: isSidebarOpen }"
      :style="{ right: isSidebarOpen ? '400px' : '0' }"
    >
      {{ isSidebarOpen ? ">" : "<" }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  props: {
    places: Array,
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const button = this.$el.querySelector(".sidebar-button");
      button.style.transition = "right 0.3s ease";
    });
  },
};
</script>

<style src="./SidebarComponent.css"></style>
