<template>
  <div class="myTasks">
    <div id="myTasksLeftContent">
      <div v-for="task in user.tasks" :key="task._id">
        <TaskCard :task="task" />
      </div>
    </div>
    <div id="myTasksRightContent"><TaskModal :backlog="userTaskDetails" /></div>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue';
import TaskModal from '@/components/modals/TaskModal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MyTasks',
  components: {
    TaskCard,
    TaskModal,
  },
  data: () => ({
    userTaskDetails: {
      name: 'UserTasks',
      deadline: null,
    },
  }),
  computed: {
    ...mapState({
      user: state => state.user.item,
    }),
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
    }),
  },
  created() {
    this.fetchUser(this.$route.params.id);
  },
};
</script>

<style>
.myTasks {
  display: grid;
  grid-template-areas: 'myTasksLeftContent myTasksRightContent';
  grid-template-columns: 95% 5%;
  margin: 16px;
}

#myTasksLeftContent {
  grid-area: myTasksLeftContent;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

#myTasksRightContent {
  grid-area: myTasksRightContent;
}
</style>
