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

    ADD_PROJECT(state, project) {
      state.items = state.items.concat(project);
    },

    ADD_SPRINT(state, sprint) {
      state.item.sprints.push(sprint);
    },

    ADD_TASK_TO_BACKLOG(state, task) {
      state.item.backlog.tasks = state.item.backlog.tasks.concat(task);
    },

    ADD_TASK_TO_SPRINT(state, { sprintId, task }) {
      const sprintIndex = state.item.sprints.findIndex(sprint => sprint._id === sprintId);
      state.item.sprints[sprintIndex].tasks = state.item.sprints[sprintIndex].tasks.concat(task);
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

    async addProject({ commit }, project) {
      const result = await axios.post(`http://localhost:3000/project`, project);
      commit('ADD_PROJECT', result.data);
    },

    async addSprint({ commit }, sprint) {
      const result = await axios.post(`http://localhost:3000/project/${this.state.project.item._id}/sprint`, sprint);
      commit('ADD_SPRINT', result.data);
    },

    async addTaskToBacklog({ commit }, task) {
      const result = await axios.post(
        `http://localhost:3000/project/${this.state.project.item._id}/backlog/task`,
        task
      );
      commit('ADD_TASK_TO_BACKLOG', result.data);
    },

    async addTaskToSprint({ commit }, { sprintId, task }) {
      const result = await axios.post(`http://localhost:3000/sprint/${sprintId}/task`, task);
      commit('ADD_TASK_TO_SPRINT', { sprintId, task: result.data });
    },
  },
};
