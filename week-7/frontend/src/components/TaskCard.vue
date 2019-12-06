<template>
  <div>
    <md-card :md-with-hover="true">
      <md-card-area>
        <md-card-header>
          <div class="md-subhead">
            <span
              ><b>Status: {{ task.status }}</b></span
            >
            <md-badge class="md-square" :md-content="task.type" />
          </div>
        </md-card-header>

        <md-card-content>
          {{ task.description }}
        </md-card-content>
      </md-card-area>

      <md-card-actions md-alignment="right" v-if="task.users && task.users.length > 0">
        <div class="users">
          <span v-for="user in task.users" :key="user._id">
            <md-avatar class="md-avatar-icon">{{ formatUserName(user) }}</md-avatar>
          </span>
          <md-avatar class="md-avatar-icon md-small">JD</md-avatar>
          <md-avatar class="md-avatar-icon md-small">JP</md-avatar>
          <md-avatar class="md-avatar-icon md-small">SM</md-avatar>
          <md-avatar class="md-avatar-icon md-small">LK</md-avatar>
        </div>
        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">edit</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      default: () => ({
        description: 'description',
        type: 'type',
        notes: [],
        comments: [],
        users: [{ name: 'John', surname: 'Doe' }],
        status: 'status',
      }),
    },
  },
  computed: {},

  methods: {
    formatUserName(user) {
      return `${user.name[0]}${user.surname[0]}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  .md-subhead {
    display: flex;
    justify-content: space-between;
    align-content: center;
    opacity: unset;

    .md-badge {
      position: relative;
    }
  }
}
.users {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: auto;
}
</style>
