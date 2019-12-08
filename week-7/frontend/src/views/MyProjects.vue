<template>
  <div class="myProjects">
    <div id="myProjectsLeftContent">
      <div
        v-for="project in user.projects"
        :key="project._id"
        @click="
          goToProject(project);
          fetchProject(project._id);
        "
      >
        <ProjectCard :item="project" />
      </div>
    </div>

    <div id="myProjectsRightContent"><ProjectModal /></div>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';
import ProjectModal from '@/components/modals/ProjectModal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Project',
  components: {
    ProjectCard,
    ProjectModal,
  },
  computed: {
    ...mapState({
      pageHeader: state => state.pageHeader,

      user: state => state.user.item,
    }),
  },
  methods: {
    ...mapActions({
      updatePageHeader: 'updatePageHeader',
      fetchUser: 'user/fetchUser',
      fetchProject: 'project/fetchProject',
    }),
    goToProject(project) {
      this.updatePageHeader(`Project: ${project.name}`);

      this.$router.push({ name: 'project', params: { id: project._id } });
    },
  },
  created() {
    this.fetchUser('5debedd01c51afd731f72496');
  },
};
</script>

<style>
.myProjects {
  display: grid;
  grid-template-areas: 'myProjectsLeftContent myProjectsRightContent';
  grid-template-columns: 95% 5%;
}

#myProjectsLeftContent {
  grid-area: myProjectsLeftContent;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

#myProjectsRightContent {
  grid-area: myProjectsRightContent;
}
</style>
