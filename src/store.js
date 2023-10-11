import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    username: localStorage.getItem("username") || null,
    token: localStorage.getItem("jwtToken") || null,
    exp: localStorage.getItem("exp") || null,
    address: localStorage.getItem("address") || null,
  },
  mutations: {
    setUser(state, username) {
      state.username = username;
      localStorage.setItem("username", username);
    },
    setToken(state, { token, exp }) {
      state.token = token;
      state.exp = exp;
      localStorage.setItem("exp", exp);
      localStorage.setItem("jwtToken", token);
    },
    clearToken(state) {
      state.token = null;
      state.exp = null;
      localStorage.removeItem("exp");
      localStorage.removeItem("jwtToken");
    },
    clearUser(state) {
      state.username = null;
      localStorage.removeItem("username");
    },
    setAddress(state, address) {
      const addressString = String(address);
      state.address = addressString;
    },
    clearAddress(state) {
      state.address = null;
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    getUsername(state) {
      return state.username;
    },
    getTimeDifference(state) {
      const currentTimestamp = Date.now() / 1000;
      const expirationTimestamp = state.exp;
      const timeDifference = expirationTimestamp - currentTimestamp;

      const hours = Math.floor(timeDifference / 3600);
      const minutes = Math.floor((timeDifference % 3600) / 60);
      const seconds = Math.floor(timeDifference % 60);

      return { hours, minutes, seconds };
    },
    getAddress(state) {
      return state.address;
    },
  },
});

export default store;
