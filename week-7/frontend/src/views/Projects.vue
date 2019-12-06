<template>
  <div class="projects">
    <span
      v-for="project in projects"
      :key="project._id"
      @click="
        goToProject(project._id);
        fetchProject(project._id);
      "
    >
      <ProjectCard :item="project" />
    </span>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Project',
  components: {
    ProjectCard,
  },
  computed: {
    ...mapState({
      projects: state => state.project.items,
    }),
  },
  methods: {
    ...mapActions({ fetchProject: 'project/fetchProject', fetchProjects: 'project/fetchProjects' }),
    goToProject(projectId) {
      this.$router.push({ name: 'project', params: { id: projectId } });
    },
  },
  created() {
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
}
</style>
