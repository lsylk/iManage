import Vue from 'vue';
import VueRouter from 'vue-router';
import User from '../views/User.vue';
import MyTasks from '../views/MyTasks.vue';
import MyProjects from '../views/MyProjects.vue';
import Project from '../views/Project.vue';
import Projects from '../views/Projects.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: User,
  },
  {
    path: '/user/:id/task/my-tasks',
    name: 'myTasks',
    component: MyTasks,
  },
  {
    path: '/user/:id/project/my-projects',
    name: 'myProjects',
    component: MyProjects,
  },
  {
    path: '/project/:id',
    name: 'project',
    component: Project,
  },
  {
    path: '/project/all',
    name: 'projects',
    component: Projects,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
