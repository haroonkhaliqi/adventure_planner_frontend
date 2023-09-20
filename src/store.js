import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    username: null,
    token: localStorage.getItem("jwtToken") || null,
  },
  mutations: {
    setUser(state, username) {
      state.username = username;
      localStorage.setItem("username", username);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("jwtToken", token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("jwtToken");
    },
    clearUser(state) {
      state.username = null;
      localStorage.removeItem("username");
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    getUsername() {
      return localStorage.getItem("username");
    },
  },
});

export default store;
