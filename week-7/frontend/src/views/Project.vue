<template>
  <div>
    <div class="project">
      <div class="backlog">
        <span v-if="project.backlog.tasks.length > 0">
          <HeaderCard :backlog="backlogDetails"> </HeaderCard>
          <draggable
            group="all-tasks"
            class="draggable-list"
            ghost-class="moving-card"
            filter=".action-button"
            :list="project.backlog.tasks"
            :animation="200"
          >
            <TaskCard v-for="task in project.backlog.tasks" :task="task" :key="task._id"></TaskCard>
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
            <TaskCard v-for="task in sprint.tasks" :task="task" :key="task._id"></TaskCard>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import HeaderCard from '@/components/HeaderCard.vue';
import TaskCard from '@/components/TaskCard.vue';
import { mapState, mapActions } from 'vuex';

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
  methods: {
    ...mapActions({ fetchProjects: 'project/fetchProjects', fetchTasksTEST: 'project/fetchTasksTEST' }),
  },
  created() {
    this.fetchProjects();
  },
};
</script>

<style>
.project {
  display: flex;
  justify-content: center;
  align-content: center;
}
.sprints {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
