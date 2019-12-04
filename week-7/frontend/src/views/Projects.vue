<template>
  <div>
    <span v-for="project in projects" :key="project.id">
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
  },
  created() {
    this.fetchProjects();
  },
};
</script>
