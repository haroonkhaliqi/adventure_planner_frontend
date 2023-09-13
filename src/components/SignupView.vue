<template>
  <AdventureHeader />
  <div class="wrapper">
    <div class="logo">
      <img
        src="https://media.discordapp.net/attachments/1141811053399920671/1148778213250703433/logo.png?width=1024&height=1024"
        alt=""
      />
    </div>
    <div class="text-center mt-4 name">Welcome to WanderWaze!</div>
    <p>Signup Now!</p>
    <form class="p-3 mt-3" @submit.prevent="signup">
      <div class="form-field d-flex align-items-center">
        <span class="far fa-user"></span>
        <input type="text" v-model="username" placeholder="Username" required />
      </div>
      <div class="form-field d-flex align-items-center">
        <span class="fas fa-key"></span>
        <input type="password" v-model="password" placeholder="Password" autocomplete="on" required />
      </div>
      <button class="btn mt-3" type="submit">Signup</button>
    </form>
    <div class="text-center fs-6">
      Already have an Account?
      <a href="/login">Log in here!</a>
    </div>
  </div>
</template>

<script>
import AdventureHeader from "@/components/AdventureHeader.vue";
import axios from "axios";

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
  methods: {
    signup() {
      // Handle registration
      const params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);

      axios
        .post("http://localhost:8000/signup/", params)
        .then((response) => {
          // Handle successful registration
          if (response.data.message === "User registered successfully.") {
            console.log("Registration successful");
            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error("Server responded with error:", error.response.status);
            console.error("Response data:", error.response.data);
            this.error = error.response.data.message; // Update error message
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    },
  },
};
</script>
