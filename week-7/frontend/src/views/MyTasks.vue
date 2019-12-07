<template>
  <div>
    My Tasks
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MyTasks',
  components: {},
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
