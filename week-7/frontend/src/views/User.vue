<template>
  <div class="user">
      Profile
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {
  name: 'User',
  components: {
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
