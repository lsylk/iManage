import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Project from '../views/Project.vue';
import Projects from '../views/Projects.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
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
