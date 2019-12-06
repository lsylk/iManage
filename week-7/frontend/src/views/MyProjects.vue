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
      user: state => state.user.item,
    }),
  },
  methods: {
    ...mapActions({ fetchUser: 'project/fetchUser', fetchProject: 'project/fetchProject' }),
    goToProject(projectId) {
      this.$router.push({ name: 'project', params: { id: projectId } });
    },
  },
  created() {
    this.fetchUser();
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
