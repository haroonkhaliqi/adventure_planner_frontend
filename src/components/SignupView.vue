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
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          autocomplete="on"
          required
        />
      </div>
      <button class="btn mt-3" type="submit">Signup</button>
    </form>
    <p v-if="error">{{ this.error }}</p>
    <div class="text-center fs-6">
      Already have an Account?
      <router-link to="/login">Login here!</router-link>
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
      const params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);

      axios
        .post("http://localhost:8000/signup/", params)
        .then((response) => {
          if (response.status === 201) {
            this.$router.push({ name: "login" });
          } else {
            this.error = "";
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            this.error = "Username already exists";
          } else {
            this.error = "Registration failed. Please check your input.";
          }
        });
    },
  },
};
</script>
