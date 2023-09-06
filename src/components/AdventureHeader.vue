<template>
  <header class="mb-4">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <b-navbar variant="faded" type="light">
          <b-navbar-brand href="#">
            <img :src="logo" alt="Logo" :width="60" :height="60" />
            WanderWaze
          </b-navbar-brand>
        </b-navbar>
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
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Download</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import logo from "@/assets/logo.png"; // Adjust the path as needed

export default {
  data() {
    return {
      logo: logo,
    };
  },
};
</script>
