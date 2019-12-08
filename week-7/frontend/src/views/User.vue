<template>
  <div class="user">
    <div class="profileCover">
      <img :src="`https://picsum.photos/2000/250?random=007`" alt="Cover Image" />
    </div>

    <div class="profileContent">
      <img :src="`https://picsum.photos/200?random=${this.$route.params.id}`" alt="Random profile picture" />
      <div class="md-title">{{ formatUserName() }}</div>
      <div class="md-subhead">{{ user.position }}</div>
      <div class="md-subhead">Projects: {{ user.projects.length }}</div>
      <div class="md-subhead">Tasks: {{ user.tasks.length }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'User',
  components: {},
  computed: {
    ...mapState({
      user: state => state.user.item,
    }),
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
    }),
    formatUserName() {
      return `${this.user.name[0].toUpperCase()}${this.user.name.slice(
        1
      )} ${this.user.surname[0].toUpperCase()}${this.user.surname.slice(1)}`;
    },
    created() {
      this.fetchUser(this.$route.params.id);
    },
  },
};
</script>

<style>
.md-content {
  padding: 0px !important;
}

.user {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-flow: column;
  position: relative;
}

.profileContent {
  position: relative;
}
.profileContent img {
  border-radius: 50%;
  position: relative;
  top: -65px;
  z-index: 5;
  margin-bottom: -40px;
}
</style>
