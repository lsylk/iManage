import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import project from './modules/project';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageHeader: '',
  },
  mutations: {
    SET_PAGE_HEADER(state, header) {
      state.pageHeader = header;
    },
  },
  actions: {
    async updatePageHeader({ commit }, pageHeader) {
      commit('SET_PAGE_HEADER', pageHeader);
    },
  },
  modules: {
    user,
    project,
  },
});
