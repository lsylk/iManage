<template>
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
          <md-avatar class="md-avatar-icon md-small">{{ formatUserName(user) }}</md-avatar>
        </span>
      </div>
      <md-button class="md-icon-button md-list-action">
        <md-icon class="md-primary">edit</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      default: () => ({
        description: '',
        type: '',
        notes: [],
        comments: [],
        users: [{ name: '', surname: '' }],
        status: '',
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
  width: 300px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  .md-card-header {
    padding: 6px 16px;
    .med-title {
      font-size: 20px;
    }
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
  .md-card-content {
    padding: 0;
    margin: 0px 10px 10px 10px;
  }
}
.users {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: auto;
}
</style>
