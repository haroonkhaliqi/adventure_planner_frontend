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
    const params = new URLSearchParams();
    params.append("username", this.username);
    params.append("password", this.password);

      axios
        .post("http://localhost:8000/signup/", params)
        .then((response) => {
          // Handle successful registration
          if (response.data.message === 'User registered successfully.') {
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
            this.error = error.response.data.message; // Update error message
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    },
  },
}
</script>
