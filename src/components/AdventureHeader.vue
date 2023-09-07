<template>
  <header class="mb-4">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img :src="logo" alt="Logo" width="60" height="60" />
          WanderWaze
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav ms-auto">
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
    ...mapGetters(["getIsAuthenticated"]),
    isAuthenticated() {
      return this.getIsAuthenticated;
    },
  },
};
</script>
