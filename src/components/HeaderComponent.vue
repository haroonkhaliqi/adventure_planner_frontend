<template>
  <nav
    class="navbar navbar-dark navbar-expand-md bg-dark d-flex justify-content-evenly"
  >
    <!-- Entire Navbar -->
    <div class="container-fluid">
      <!-- Hamburger Menu -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 1st Column -->
      <div class="navbar-nav col-4 justify-content-start align-items-center">
        <li
          class="navbar-brand"
          role="button"
          @click="$router.push({ name: 'home' })"
        >
          <img
            src="https://media.discordapp.net/attachments/1141811053399920671/1148778213250703433/logo.png?width=1024&height=1024"
            alt=""
            width="40"
            height="40"
          />
          WanderWaze
        </li>
      </div>

      <!-- 2nd Column -->
      <div class="navbar-nav col-4 justify-content-center align-items-center">
        <h5 class="username" v-if="isLoggedIn">
          <span class="username-text text-white user-select-none"
            >Welcome, {{ displayedUsername }}</span
          >
        </h5>
        <h5 class="username" v-if="!isLoggedIn">
          <span class="username-text text-white user-select-none">
            <FactoidComponent />
          </span>
        </h5>
      </div>

      <!-- 3rd Column -->
      <div
        class="navbar-nav navbar-collapse col-4 justify-content-end"
        id="navbarNav"
      >
        <li class="nav-item" role="button" v-if="isLoggedIn">
          <a class="nav-link" @click="$router.push({ name: 'routing_data' })">
            Routing
          </a>
        </li>
        <li class="nav-item" role="button" v-if="isLoggedIn">
          <a class="nav-link" @click="$router.push({ name: 'places_mapped' })">
            Map
          </a>
        </li>
        <li class="nav-item" role="button" v-if="!isLoggedIn">
          <a class="nav-link" @click="$router.push({ name: 'signup' })"
            >Signup
          </a>
        </li>
        <li class="nav-item" role="button" v-if="!isLoggedIn">
          <a class="nav-link" @click="$router.push({ name: 'login' })">Login</a>
        </li>
        <li class="nav-link" role="button" v-if="isLoggedIn">
          <LogoutComponent />
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from "@/assets/logo.png";
import FactoidComponent from "./FactoidComponent.vue";
import { mapGetters } from "vuex";
import LogoutComponent from "./LogoutComponent.vue";

export default {
  computed: {
    ...mapGetters(["isLoggedIn", "getUsername"]),
    isAuthenticated() {
      return this.isLoggedIn;
    },
    displayedUsername() {
      return this.getUsername;
    },
  },
  components: {
    FactoidComponent,
    LogoutComponent,
  },
  data() {
    return {
      logo: logo,
    };
  },
};
</script>
