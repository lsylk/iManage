<template>
  <div class="project">
    <div class="backlog">
      <HeaderCard :backlog="backlogDetails" :tasksCount="project.backlog.tasks.length"> </HeaderCard>
      <span v-if="project.backlog.tasks.length > 0">
        <draggable
          group="all-tasks"
          class="draggable-list"
          ghost-class="moving-card"
          filter=".action-button"
          :list="project.backlog.tasks"
          :animation="200"
        >
          <TaskCard
            v-for="task in project.backlog.tasks"
            :task="task"
            :key="task._id"
            :taskContainer="{ type: 'backlog', id: null }"
          ></TaskCard>
        </draggable>
      </span>
    </div>
    <div class="sprints" v-if="project.sprints.length > 0">
      <div v-for="sprint in project.sprints" :key="sprint._id">
        <HeaderCard :backlog="sprint"> </HeaderCard>
        <draggable
          group="all-tasks"
          class="draggable-list"
          ghost-class="moving-card"
          filter=".action-button"
          :list="sprint.tasks"
          :animation="200"
        >
          <TaskCard
            v-for="task in sprint.tasks"
            :task="task"
            :key="task._id"
            :taskContainer="{ type: 'sprint', id: sprint._id }"
          ></TaskCard>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import HeaderCard from '@/components/HeaderCard.vue';
import TaskCard from '@/components/TaskCard.vue';
import { mapState } from 'vuex';

export default {
  name: 'Project',
  components: {
    Draggable,
    HeaderCard,
    TaskCard,
  },
  data: () => ({
    backlogDetails: {
      name: 'Backlog',
      deadline: null,
    },
  }),
  computed: {
    ...mapState({
      project: state => state.project.item,
    }),
  },
  methods: {},
};
</script>

<style>
.project {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 16px;
}
.sprints {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
