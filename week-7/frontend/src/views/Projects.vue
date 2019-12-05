<template>
  <div>
    <span v-for="project in projects" :key="project._id" @click="goToProject(project._id)">
      <ItemCard :item="project" />
    </span>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Project',
  components: {
    ItemCard,
  },
  computed: {
    ...mapState({
      projects: state => state.project.items,
    }),
  },
  methods: {
    ...mapActions({ fetchProjects: 'project/fetchProjects' }),
    goToProject(projectId) {
      this.$router.push({ name: 'project', params: { id: projectId } });
    },
  },
  created() {
    this.fetchProjects();
  },
};
</script>
