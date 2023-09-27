<template>
  <h4>Authentication status: <b>{{ isLoggedIn ? 'Valid' : 'Not Valid' }}</b></h4>
  <h4>Current username: <b>{{ getUsername || "username null" }}</b></h4>
  <h4 class="home-header mt-5" v-if="isLoggedIn">Your Token Expires In:</h4>
  <div v-if="isLoggedIn">
    <b>{{ getTimeDifference.hours }}</b> hours
    <b>{{ getTimeDifference.minutes }}</b> minutes
    <b>{{ getTimeDifference.seconds }}</b> seconds
  </div>
  <div v-else>
    <b>You are not currently logged in.</b>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoggedIn", "getUsername", "getTimeDifference", "getIsExpired"]),
  },
};
</script>
