<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button v-if="!menuVisible" class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
        </md-button>
        <div class="md-title">{{ page }}</div>
        <!-- TO DO: add user avatar -->
        <div class="user">
          user avatar
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" :md-persistent="getPersistentType">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end" aria-label="Menu">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list>
          <md-list-item title="Profile" aria-label="Profile">
            <md-icon>account_circle</md-icon
            ><span class="md-list-item-text" @click="togglePage('profile')">
              <router-link :to="{ name: 'user', params: { id: '123' } }"> Profile</router-link>
            </span>
          </md-list-item>

          <!-- REMOVE after testing start-->
          <md-list-item title="Project" aria-label="Project">
            <md-icon>perm_media</md-icon
            ><span class="md-list-item-text" @click="togglePage('Project')">
              <router-link :to="{ name: 'project', params: { id: 'abc' } }"> Project</router-link>
            </span>
          </md-list-item>
          <!-- REMOVE after testing end-->

          <md-list-item title="My Tasks" aria-label="My Tasks">
            <md-icon>confirmation_number </md-icon
            ><span class="md-list-item-text" @click="togglePage('myTasks')">
              <router-link :to="{ name: 'myTasks' }">My Tasks</router-link>
            </span>
          </md-list-item>
          <md-list-item title="My Projects" aria-label="My Projects">
            <md-icon>folder_shared</md-icon
            ><span class="md-list-item-text" @click="togglePage('myProjects')">
              <router-link :to="{ name: 'myProjects' }"> My Projects</router-link>
            </span>
            <md-divider class="md-inset"></md-divider>
          </md-list-item>
          <md-list-item title="Projects" aria-label="Projects">
            <md-icon>perm_media</md-icon
            ><span class="md-list-item-text" @click="togglePage('Projects')">
              <router-link :to="{ name: 'projects' }"> Projects</router-link>
            </span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <transition name="slide">
          <router-view> </router-view>
        </transition>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DrawerNavbar',
  components: {},
  data: () => ({
    menuVisible: false,
    page: 'Projects',
  }),
  computed: {
    ...mapState({
      project: state => state.project.item,
    }),
    getPersistentType() {
      return window.screen.width > 414 ? 'mini' : 'full';
    },
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    togglePage(page) {
      if (page === 'project') {
        this.page = `${page} :${this.project.name}`;
      }
    },
    reRoute(routerObject) {
      this.$router.push(routerObject);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 350px;
}
.md-app-toolbar {
  background-color: #258aa0 !important;
  display: flex;
  justify-content: space-between;

  .social-media {
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      height: 28px;
      padding-right: 4px;
    }
  }
}

.md-drawer {
  width: 235px;
  max-width: calc(100vw - 125px);
}

@media (min-width: 600px) {
  .md-app-content {
    border-right: 0px;
  }
}
</style>
