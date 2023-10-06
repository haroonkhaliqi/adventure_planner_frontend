<template>
  <div
    class="container position-absolute bottom-0 start-50 translate-middle-x pb-5"
  >
    <div class="row">
      <div class="col-4">
        <h4>
          Authentication status
          <br />
          <b>{{ isLoggedIn ? "Valid" : "Not Valid" }}</b>
        </h4>
      </div>
      <div class="col-4 text-center">
        <div class="username-div pl-5">
          <h4>
            Current username
            <br />
            <b>{{ getUsername || "username null" }}</b>
          </h4>
        </div>
      </div>
      <div class="col-4 text-right h4">
        <div v-if="isLoggedIn">
          <h4 class="data-header" v-if="isLoggedIn">Token Expiration</h4>
          <b>{{ getTimeDifference.hours }}</b> :
          <b>{{ getTimeDifference.minutes }}</b> :
          <b>{{ getTimeDifference.seconds }}</b>
        </div>
        <div v-else>
          <b>You are not currently logged in.</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "getUsername",
      "getTimeDifference",
      "getIsExpired",
    ]),
  },
};
</script>
