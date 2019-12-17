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

    DELETE_PROJECT(state, id) {
      state.items = state.items.filter(item => item._id !== id);
    },

    DELETE_SPRINT(state, id) {
      state.item.sprints = state.item.sprints.filter(sprint => sprint._id !== id);
    },

    DELETE_ALL_BACKLOG_TASKS(state) {
      state.item.backlog.tasks = [];
    },

    DELETE_ALL_SPRINT_TASKS(state, id) {
      const sprintIndex = state.item.sprints.findIndex(sprint => sprint._id === id);
      state.item.sprints[sprintIndex].tasks = [];
    },

    DELETE_BACKLOG_TASK(state, id) {
      state.item.backlog.tasks = state.item.backlog.tasks.filter(task => task._id !== id);
    },

    DELETE_SPRINT_TASK(state, { sprintId, id }) {
      const sprintIndex = state.item.sprints.findIndex(sprint => sprint._id === sprintId);
      state.item.sprints[sprintIndex].tasks = state.item.sprints[sprintIndex].tasks.filter(task => task._id !== id);
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

    async deleteProject({ commit }, id) {
      await axios.delete(`http://localhost:3000/project/${id}`);
      commit('DELETE_PROJECT', id);
    },

    async deleteSprint({ commit }, id) {
      await axios.delete(`http://localhost:3000/sprint/${id}`);
      commit('DELETE_SPRINT', id);
    },

    async deleteAllBacklogTasks({ commit }) {
      await axios.delete(`http://localhost:3000/project/${this.state.project.item._id}/backlog`);
      commit('DELETE_ALL_BACKLOG_TASKS');
    },

    async deleteAllSprintTasks({ commit }, id) {
      await axios.delete(`http://localhost:3000/sprint/${id}/tasks`);
      commit('DELETE_ALL_SPRINT_TASKS', id);
    },

    async deleteBacklogTask({ commit }, id) {
      await axios.delete(`http://localhost:3000/project/${this.state.project.item._id}/backlog/task/${id}`);
      commit('DELETE_BACKLOG_TASK', id);
    },

    async deleteSprintTask({ commit }, { sprintId, id }) {
      await axios.delete(`http://localhost:3000/sprint/${sprintId}/task/${id}`);
      commit('DELETE_SPRINT_TASK', { sprintId, id });
    },
  },
};
