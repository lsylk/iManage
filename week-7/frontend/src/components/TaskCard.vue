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
    <md-card-actions md-alignment="right">
      <div class="users" v-if="task.users && task.users.length > 0">
        <span v-for="user in task.users" :key="user._id">
          <md-avatar class="md-avatar-icon md-small  md-list-action">{{ formatUserName(user) }}</md-avatar>
        </span>
      </div>
      <md-button class="md-icon-button md-small md-list-action" disabled>
        <md-icon class="md-primary">edit</md-icon>
      </md-button>
      <md-button class="md-icon-button md-small md-list-action" @click="deleteTask(task._id)">
        <md-icon class="md-primary">delete</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      default: () => ({
        description: 'descriptiom',
        type: 'type',
        notes: [],
        comments: [],
        users: [{ name: 'name', surname: 'surname' }],
        status: 'status',
      }),
    },
    taskContainer: {
      type: Object,
      default: () => ({
        type: null,
        id: null,
      }),
    },
  },
  computed: {},

  methods: {
    ...mapActions({
      deleteUserTask: 'user/deleteUserTask',
      deleteBacklogTask: 'project/deleteBacklogTask',
      deleteSprintTask: 'project/deleteSprintTask',
    }),
    deleteTask(id) {
      if (this.taskContainer.type === 'user') {
        this.deleteUserTask(id);
      } else if (this.taskContainer.type === 'backlog') {
        this.deleteBacklogTask(id);
      } else {
        this.deleteSprintTask({ sprintId: this.taskContainer.id, id });
      }
    },
    formatUserName(user) {
      if (user.name.length > 0 && user.surname.length > 0) {
        return `${user.name[0].toUpperCase()}${user.surname[0].toUpperCase()}`;
      }
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
