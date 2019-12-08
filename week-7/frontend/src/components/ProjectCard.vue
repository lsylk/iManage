<template>
  <div>
    <md-card :md-with-hover="true">
      <md-card-area>
        <md-card-media>
          <img :src="`https://picsum.photos/320/53?random=${item._id}`" alt="Random cover image for project card" />
          <div class="action-buttons">
            <md-button class="md-icon-button md-small">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button class="md-icon-button md-small">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ item.name }}</div>
          <div class="md-subhead">
            <span>Sprints: {{ item.sprints.length || 0 }}</span>
            <span>Tasks in Backlog: {{ item.backlog.tasks.length || 0 }}</span>
          </div>
        </md-card-header>

        <md-card-content>
          {{ item.description }}
        </md-card-content>
      </md-card-area>
      <md-card-actions md-alignment="left" v-if="item.users.length > 0">
        <span v-for="(user, index) in item.users" :key="index">
          <md-avatar class="md-avatar-icon md-small  md-list-action">{{ formatUserName(user) }}</md-avatar>
        </span>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    item: {
      type: Object,
      default: () => ({
        title: '',
        subtitle: '',
        description: '',
        users: [{ name: '', surname: '' }],
      }),
    },
  },
  computed: {},

  methods: {
    formatUserName(user) {
      return `${user.name[0].toUpperCase()}${user.surname[0].toUpperCase()}`;
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
    justify-content: space-around;
    align-content: center;
  }
  .md-card-media {
    img {
      max-height: 100px;
    }
  }
}
.action-buttons {
  position: absolute;
  top: 7px;
  right: 10px;
  .md-button {
    background-color: #f5f5f5d1;
  }
}
</style>
