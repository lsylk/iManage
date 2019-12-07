<template>
  <div class="projects">
    <div><ProjectModal /></div>
    <div
      v-for="project in projects"
      :key="project._id"
      @click="
        goToProject(project);
        fetchProject(project._id);
      "
    >
      <ProjectCard :item="project" />
    </div>
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
  data: () => ({}),
  computed: {
    ...mapState({
      pageHeader: state => state.pageHeader,
      projects: state => state.project.items,
      users: state => state.user.items,
    }),
  },
  methods: {
    ...mapActions({
      updatePageHeader: 'updatePageHeader',
      fetchUsers: 'user/fetchUsers',
      fetchProject: 'project/fetchProject',
      fetchProjects: 'project/fetchProjects',
    }),
    goToProject(project) {
      this.updatePageHeader(`Project: ${project.name}`);

      this.$router.push({ name: 'project', params: { id: project._id } });
    },
  },
  created() {
    this.fetchUsers();
    this.fetchProjects();
  },
};
</script>

<style>
.projects {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  position: relative;
}
.project-add-button {
  position: absolute;
  top: 10px;
  right: 30px;
}
</style>
