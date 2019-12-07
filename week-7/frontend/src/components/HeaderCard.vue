<template>
  <div>
    <md-card :class="backlog.name === 'Backlog' ? 'backlog' : 'sprint'">
      <md-card-area>
        <md-card-header>
          <div class="md-title">
            <md-badge :md-content="getTaskCount" class="md-default">
              <div class="header">{{ backlog.name }}</div>
            </md-badge>
            <md-menu md-size="small">
              <md-button md-menu-trigger class="md-fab md-mini"> <md-icon>add</md-icon></md-button>

              <md-menu-content>
                <md-menu-item title="Add New Spring" aria-label="Add New Spring">
                  <md-icon>ballot</md-icon> Add sprint</md-menu-item
                >
                <md-menu-item title="Add New Task" aria-label="Add New Task"
                  ><md-icon>confirmation_number</md-icon> Add task</md-menu-item
                >
              </md-menu-content>
            </md-menu>
          </div>
          <div v-if="backlog.name !== 'Backlog'" class="md-subhead">Deadline: {{ backlog.deadline }}</div>
        </md-card-header>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'HeaderCard',
  props: {
    backlog: {
      type: Object,
      default: () => ({
        name: 'name',
        deadline: '10/222',
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

  methods: {},
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
    .md-menu {
      position: absolute;
      top: 10px;
      right: 14px;
      .md-button {
        height: 30px;
        width: 30px;
      }
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
