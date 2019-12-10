<template>
  <div>
    <md-card :class="backlog.name === 'Backlog' ? 'backlog' : 'sprint'">
      <md-card-area>
        <md-card-header>
          <div class="md-title">
            <md-badge :md-content="getTaskCount" class="md-default">
              <div class="header">{{ backlog.name }}</div>
            </md-badge>
            <span class="taskModal">
              <TaskModal :backlog="backlog" />
            </span>
          </div>
          <div v-if="backlog.name !== 'Backlog'" class="md-subhead">Deadline: {{ backlog.deadline }}</div>
        </md-card-header>
      </md-card-area>
      <md-card-actions md-alignment="right">
        <md-button
          title="Edit Sprint"
          arial-label="Edit Sprint"
          v-if="backlog.name !== 'Backlog'"
          class="md-icon-button md-small md-list-action"
          disabled
        >
          <md-icon class="md-primary">edit</md-icon>
        </md-button>
        <md-button
          title="Delete Sprint"
          arial-label="Delete Sprint"
          v-if="backlog.name !== 'Backlog'"
          class="md-icon-button md-small md-list-action"
          @click="deleteSprint(backlog._id)"
        >
          <md-icon class="md-primary">delete</md-icon>
        </md-button>
        <md-button
          title="Delete all tasks"
          arial-label="Delete all tasks"
          class="md-icon-button md-small md-list-action"
          @click="deleteAllTasks()"
        >
          <md-icon class="md-primary">delete_sweep</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import TaskModal from '@/components/modals/TaskModal.vue';
import { mapActions } from 'vuex';

export default {
  name: 'HeaderCard',
  components: {
    TaskModal,
  },
  props: {
    backlog: {
      type: Object,
      default: () => ({
        name: 'name',
        deadline: '',
      }),
    },
    tasksCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getTaskCount() {
      if (this.backlog.name === 'Backlog') {
        return this.tasksCount;
      } else {
        return this.backlog.tasks.length;
      }
    },
  },

  methods: {
    ...mapActions({
      deleteSprint: 'project/deleteSprint',
      deleteAllBacklogTasks: 'project/deleteAllBacklogTasks',
      deleteAllSprintTasks: 'project/deleteAllSprintTasks',
    }),
    deleteAllTasks() {
      if (this.backlog.name === 'Backlog') {
        this.deleteAllBacklogTasks();
      } else {
        this.deleteAllSprintTasks(this.backlog._id);
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
    position: relative;
    margin: 0px;
    padding: 5px 0px;
    .taskModal {
      position: absolute;
      top: 6px;
      right: 9px;
    }
    .md-subhead {
      display: flex;
      justify-content: center;
      opacity: unset;
      padding: 5px;
    }
  }
}
.header {
  margin: 10px;
}
.backlog {
  background-color: #b3a5a587 !important;
}
.sprint {
  background-color: rgba(218, 84, 84, 0.25) !important;
}
</style>
