<template>
  <div>
    <AdventureHeader />
    <h1>Login</h1>
    <form ref="loginForm" @submit.prevent="login">
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
      this.$router.push({ name: 'home' });
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
