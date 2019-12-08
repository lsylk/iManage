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
    ADD_USER(state, user) {
      state.items = state.items.concat(user);
    },

    ADD_TASK(state, task) {
      state.item.tasks = state.item.tasks.concat(task);
    },

    DELETE_TASK(state, id) {
      state.item.tasks = state.item.tasks.filter(task => {
        task._id !== id;
      });
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

    async addUser({ commit }, user) {
      const result = await axios.post(`http://localhost:3000/user`, user);
      commit('ADD_USER', result.data);
    },

    async addTask({ commit }, task) {
      const result = await axios.post(`http://localhost:3000/user/${this.state.user.item._id}/task`, task);
      commit('ADD_TASK', result.data);
    },

    async deleteTask({ commit }, id) {
      await axios.delete(`http://localhost:3000/user/${this.state.user.item._id}/task/${id}`);
      commit('DELETE_TASK', id);
    },
  },
};
