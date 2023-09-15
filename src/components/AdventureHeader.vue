<template>
  <header class="mb-4">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
            src="https://media.discordapp.net/attachments/1141811053399920671/1148778213250703433/logo.png?width=1024&height=1024"
            alt=""
            width="40"
            height="40"
            class="d-inline-block align-text-center"
          />
          WanderWaze
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto">
            <h5 class="username justify-content-between" v-if="isLoggedIn">
              <span class="text-white">Welcome, {{ displayedUsername }}</span>
            </h5>
          </ul>
          <ul class="navbar-nav ms-auto d-none d-lg-inline-flex">
            <li class="nav-item" v-if="!isLoggedIn">
              <a class="nav-link" href="/signup">Signup</a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
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
    ...mapGetters(["isLoggedIn", "getUsername"]),
    isAuthenticated() {
      return this.isLoggedIn;
    },
    displayedUsername() {
      return this.getUsername;
    },
  },
};
</script>
