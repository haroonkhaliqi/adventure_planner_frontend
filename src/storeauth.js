import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    // The 'isAuthenticated' state variable is set based on the value in sessionStorage
    isAuthenticated: sessionStorage.getItem("isAuthenticated") === "true",
  },
  mutations: {
    toggleAuthentication(state) {
      // Invert the value of 'isAuthenticated' in the state
      state.isAuthenticated = !state.isAuthenticated;

      // Update sessionStorage to persist the authentication state across page refreshes
      sessionStorage.setItem("isAuthenticated", state.isAuthenticated.toString());
    },
  },
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

export default store;
