import axios from 'axios';

export default {
  namespaced: true,

  state: {
    item: {},
    items: [],
  },

  getters: {},

  mutations: {
    SET_USER(state, data) {
      state.item = data;
    },
    SET_USERS(state, data) {
      state.items = data;
    },
  },

  actions: {
    async fetchUser({ commit }, id) {
      const result = await axios.get(`http://localhost:3000/user/${id}`);
      commit('SET_USER', result.data);
    },

    async fetchUsers({ commit }) {
      const result = await axios.get(`http://localhost:3000/user/show/all`);
      commit('SET_USERS', result.data);
    },
  },
};
