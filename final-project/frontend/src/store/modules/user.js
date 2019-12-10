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

    ADD_PROJECT_TO_USER(state, project) {
      state.item.projects = state.item.projects.concat(project);
    },

    ADD_TASK_TO_USER(state, task) {
      state.item.tasks = state.item.tasks.concat(task);
    },

    DELETE_USER_TASK(state, id) {
      state.item.tasks = state.item.tasks.filter(task => task._id.toString() !== id);
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

    async addProjectToUser({commit}, project) {
      //TO DO: use dispatch to call ADD_PROJECT action from project modules
      const result = await axios.post(`http://localhost:3000/project`, project);
      commit('ADD_PROJECT', result.data);
      await axios.post(`http://localhost:3000/user/${this.state.user.item._id}/project/${result.data._id}`);
      commit('ADD_PROJECT_TO_USER', result.data);
    },

    async addTaskToUSer({ commit }, task) {
      const result = await axios.post(`http://localhost:3000/user/${this.state.user.item._id}/task`, task);
      commit('ADD_TASK_TO_USER', result.data);
    },

    async deleteUserTask({ commit }, id) {
      await axios.delete(`http://localhost:3000/user/${this.state.user.item._id}/task/${id}`);
      commit('DELETE_USER_TASK', id);
    },
  },
};
