<template>
  <header class="mb-4">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">WanderWaze</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ms-auto">
              <h5 class="username justify-content-between" v-if="isAuthenticated">
                <span class="text-white">Welcome, {{ displayedUsername }}</span>
              </h5>
            </ul>
          <ul class="navbar-nav ms-auto d-none d-lg-inline-flex">
            <li class="nav-item" v-if="!isAuthenticated">
              <a class="nav-link" href="/signup">Signup</a>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <LogoutView />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import logo from "@/assets/logo.png";
import LogoutView from "@/components/LogoutView.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    LogoutView,
  },
  data() {
    return {
      logo: logo,
    };
  },
  computed: {
    ...mapGetters(["getIsAuthenticated", "getUsername"]),
    isAuthenticated() {
      return this.getIsAuthenticated
    },
    displayedUsername() {
      return this.getUsername;
    }
  }
};
</script>
