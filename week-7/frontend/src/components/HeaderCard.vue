<template>
  <div>
    <md-card :class="backlog.name === 'Backlog' ? 'backlog' : 'spring'">
      <md-card-area>
        <md-card-header>
          <div class="md-title">
            <div>{{ backlog.name }}</div>
            <md-menu md-size="small">
              <md-button md-menu-trigger class="md-fab md-mini"> <md-icon>add</md-icon></md-button>

              <md-menu-content>
                <md-menu-item title="Add New Spring" aria-label="Add New Spring">
                  <md-icon>ballot</md-icon> spring</md-menu-item
                >
                <md-menu-item title="Add New Task" aria-label="Add New Task"
                  ><md-icon>confirmation_number</md-icon> task</md-menu-item
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
  },
  computed: {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  .md-card-header {
    position: relative;
    margin: 0px;
    .md-menu {
      position: absolute;
      top: 14px;
      right: 14px;
    }
    .md-subhead {
      display: flex;
      justify-content: center;
      opacity: unset;
      padding: 5px;
    }
  }
}
.backlog {
  background-color: #b3a5a587 !important;
}

.spring {
  background-color: rgba(218, 84, 84, 0.25) !important;
}
</style>
