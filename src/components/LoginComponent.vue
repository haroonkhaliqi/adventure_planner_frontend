<template>
  <div>
    <HeaderComponent />
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
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-field d-flex align-items-center">
          <span class="fas fa-key"></span>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            autocomplete="on"
            required
          />
        </div>
        <button class="btn mt-3" type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <div class="text-center fs-6">
        New to WanderWaze?
        <router-link to="/signup">Sign up here!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  components: {
    HeaderComponent,
  },
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login() {
      try {
        const formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);

        const response = await axios.post(
          "http://localhost:8000/login/",
          formData
        );

        const responseData = response.data;

        if (responseData.jwt) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + responseData.jwt;
          this.$refs.loginForm.reset();
          this.setUser(responseData.username);
          this.setToken({ token: responseData.jwt, exp: responseData.exp });
          this.$router.push({ name: "home" });
        } else {
          console.error("JWT token not found in the response:", responseData);
          this.error = responseData.message;
        }
      } catch (error) {
        console.error("Error:", error);
        this.error = "Login failed. Please check your credentials.";
      }
    },
  },
};
</script>
