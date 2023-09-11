import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    // The 'isAuthenticated' state variable is set based on the value in localStorage
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    username: localStorage.getItem("username") || "",
  },
  mutations: {
    toggleAuthentication(state) {
      // Invert the value of 'isAuthenticated' in the state
      state.isAuthenticated = !state.isAuthenticated;

      // Update localStorage to persist the authentication state across page refreshes
      localStorage.setItem("isAuthenticated", state.isAuthenticated.toString());
    },
    setUsername(state, username) {
      state.username = username;

      // Update localStorage to persist the username across page refreshes
      localStorage.setItem("username", username);
    },
  },
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
    getUsername: (state) => state.username,
  },
});

export default store;
