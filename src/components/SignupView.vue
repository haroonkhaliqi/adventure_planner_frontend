<template>
  <div>
    <AdventureHeader />
    <h1>Signup</h1>
    <form @submit.prevent="signup">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" autocomplete="on" required />
      <button type="submit">Signup</button>
    </form>
    <p v-if="error">{{ error }}</p>
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
      axios
        .post("http://localhost:8000/register/", {
          username: this.username,
          password1: this.password,
          password2: this.password,
        })
        .then((response) => {
          // Handle successful registration
          if (response.data) {
            console.log("Registration successful");
            this.$router.push({ name: 'login' });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.error(
              "Server responded with error:",
              error.response.status
            );
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error:", error.message);
          }
          // Handle registration error
          console.error("Registration error", error);
          this.error = "Registration failed. Please check your input.";
        });
      console.log('Username:', this.username);
    },
  },
};
</script>
