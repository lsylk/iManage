import axios from 'axios';

export default {
  namespaced: true,

  state: {
    item: {},

    items: [],
  },

  getters: {},

  mutations: {
    SET_PROJECT(state, project) {
      state.item = project;
    },

    SET_PROJECTS(state, projects) {
      state.items = projects;
    },
  },

  actions: {
    async fetchProject({ commit }, id) {
      const result = await axios.get(`http://localhost:3000/project/${id}`);
      commit('SET_PROJECT', result.data);
    },

    async fetchProjects({ commit }) {
      const result = await axios.get(`http://localhost:3000/project/show/all`);
      commit('SET_PROJECTS', result.data);
    },
  },
};
