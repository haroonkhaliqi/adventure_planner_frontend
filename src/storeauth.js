import Vuex from "vuex"

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    toggleAuthentication(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },
  },
  actions: {
  },
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

export default store;
