<template>
  <div>
    <AdventureHeader />
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        autocomplete="on"
        required
      />

      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
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
    // Use the correct getter name
    ...mapGetters(["getIsAuthenticated"]),
  },
  methods: {
  login() {
    console.log("Logging in...");

    const params = new URLSearchParams();
    params.append("username", this.username);
    params.append("password", this.password);

    axios
      .post("http://localhost:8000/login/", params)
      .then((response) => {
        console.log("Login successful");
        if (response.data) {
          // Store the session ID in sessionStorage
          sessionStorage.setItem("sessionId", response.data.session_key);
          // Toggle the boolean switch in the Vuex store
          this.toggleAuthentication();

          // Redirect to the home page
          this.$router.push({ name: 'home' });
        }
      })
      .catch((error) => {
        this.error = "Invalid credentials";
        console.error("Login error", error);
      });
  },
  ...mapMutations(["toggleAuthentication"]),
},

};
</script>
