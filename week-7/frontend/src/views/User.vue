<template>
  <div class="user">
      USERS
    <span v-for="project in projects" :key="project.id">
      <ItemCard :item="project" />
    </span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ItemCard from '@/components/ItemCard.vue';

export default {
  name: 'User',
  components: {
    ItemCard,
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
  created() {
    this.fetchUser(this.$route.params.id);
  },
};
</script>
