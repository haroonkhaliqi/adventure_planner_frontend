<template>
  <AdventureHeader />
  <div class="wrapper">
    <div class="logo">
      <img
        src="https://media.discordapp.net/attachments/1141811053399920671/1148778213250703433/logo.png?width=1024&height=1024"
        alt=""
      />
    </div>
    <div class="text-center mt-4 name">WanderWaze</div>
    <p>Welcome back!</p>
    <form class="p-3 mt-3" ref="loginForm" @submit.prevent="login">
      <div class="form-field d-flex align-items-center">
        <span class="far fa-user"></span>
        <input type="text" v-model="username" placeholder="Username" required />
      </div>
      <div class="form-field d-flex align-items-center">
        <span class="fas fa-key"></span>
        <input type="password" v-model="password" placeholder="Password" autocomplete="on" required />
      </div>
      <button class="btn mt-3" type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <div class="text-center fs-6">
      New to WanderWaze?
      <a href="/signup">Sign up here!</a>
    </div>
  </div>
</template>

<script>
import AdventureHeader from "@/components/AdventureHeader.vue";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    AdventureHeader,
  },
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  computed: {
    // Map the isAuthenticated getter from the Vuex store
    ...mapGetters(["getIsAuthenticated"]),
    isAuthenticated() {
      return this.getIsAuthenticated;
    },
  },
  methods: {
    login() {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      }

      const params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);

      axios
        .post("http://localhost:8000/login/", params)
        .then((response) => {
          const responseData = response.data; // Parse the JSON data

          // Check if the response contains the JWT token
          if (responseData.jwt) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + responseData.jwt;
            localStorage.setItem("jwt", responseData.jwt);
            this.toggleAuthentication();
            this.$store.commit("setUsername", responseData.username);
            this.$refs.loginForm.reset();
            this.$router.push({ name: "home" });
          } else {
            // Handle the case where the response doesn't contain the JWT token
            console.error("JWT token not found in the response:", responseData);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    ...mapMutations(["toggleAuthentication"]),
  },
};
</script>
