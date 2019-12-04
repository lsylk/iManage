<template>
  <div>
    <md-card :md-with-hover="true">
      <md-card-area>
        <md-card-media>
          <img :src="`https://picsum.photos/320/53?random=${item._id}`" alt="Random cover image for project card" />
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
          <md-avatar class="md-avatar-icon">{{ user }}</md-avatar>
        </span>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      default: () => ({
        title: 'Title',
        subtitle: 'Subtitle',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.',
        users: [{ firstName: 'John', lastName: 'Doe' }],
      }),
    },
  },
  computed: {},

  methods: {
    //   sendMessage () {
    //     window.alert('Send a message...')
    //   },
    //   doACall () {
    //     window.alert('Calling someone...')
    //   }
    //   formatUserName(user) {
    //         return `${user.fistName[0]}${user.lastName[0]}`
    //     }
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
</style>
