<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Task</md-dialog-title>
      <md-dialog-content>
        <form novalidate class="md-layout" @submit.prevent="validateTask">
          <md-field :class="getValidationClass('description')">
            <label for="description">Task Description</label>
            <md-input name="description" id="description" v-model="form.description" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.description.required">The task description is required</span>
            <span class="md-error" v-else-if="!$v.form.description.minlength">Invalid task description</span>
          </md-field>

          <div class="task-options md-field md-theme-default" :class="getValidationClass('type')">
            <label for="type">Type </label>
            <div v-for="(taskType, index) in types" :key="index">
              <md-radio v-model="form.type" :value="taskType">{{ taskType }}</md-radio>
            </div>
            <!-- <span class="md-error" v-if="!$v.form.type.required">The task type is required</span> -->
          </div>

          <md-field :class="getValidationClass('users')">
            <label for="users">Users</label>
            <md-select name="users" id="users" v-model="form.users" md-dense :disabled="sending" multiple>
              <span v-for="user in users" :key="user._id">
                <md-option :value="user._id">{{ formatUserName(user) }}</md-option>
              </span>
            </md-select>
          </md-field>

          <div class="task-options md-field md-theme-default" :class="getValidationClass('status')">
            <label for="status">Status </label>
            <div v-for="(taskStatus, index) in status" :key="index">
              <md-radio v-model="form.status" :value="taskStatus">{{ taskStatus }}</md-radio>
            </div>
            <!-- <span class="md-error" v-if="!$v.form.status.required">The task status is required</span> -->
          </div>

          <md-field :class="getValidationClass('notes')">
            <label for="notes">Notes</label>
            <md-textarea name="notes" id="notes" v-model="form.notes" :disabled="sending"> </md-textarea>
          </md-field>

          <md-field :class="getValidationClass('comments')">
            <label for="comments">comments</label>
            <md-textarea name="comments" id="comments" v-model="form.comments" :disabled="sending"> </md-textarea>
          </md-field>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-snackbar :md-active.sync="taskSaved">The task {{ form.description }} was saved with success!</md-snackbar>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button type="submit" class="md-primary" @click="saveTask()" :disabled="sending">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button title="Add new task" aria-label="Add new task" class="md-fab md-mini" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'taskModal',
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    types: ['Feature', 'Bug', 'Test'],
    status: ['To do', 'In Progress', 'Done'],
    form: {
      description: null,
      type: null,
      users: [],
      status: null,
      notes: null,
      comments: null,
    },
    taskSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      description: {
        required,
        minLength: minLength(3),
      },
      type: {
        required,
      },
      status: {
        required,
      },
    },
  },
  props: {
    backlog: {
      type: Object,
    },
  },
  methods: {
    ...mapActions({
      addTask: 'user/addTask',
      addTaskToBacklog: 'project/addTaskToBacklog',
      addTaskToSprint: 'project/addTaskToSprint',
    }),
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.description = null;
      this.form.type = null;
      this.form.users = [];
      this.form.comments = [];
      this.form.notes = [];

      this.form.status = null;
    },
    async saveTask() {
      this.sending = true;
      if (this.backlog.name === 'Backlog') {
        await this.addTaskToBacklog(this.form);
      } else if (this.backlog.name === 'UserTasks') {
        await this.addTask(this.form);
      } else {
        await this.addTaskToSprint({ sprintId: this.backlog._id, task: this.form });
      }
      this.taskSaved = true;
      this.sending = false;
      this.clearForm();
    },
    validatetask() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.savetask();
      }
    },
    formatUserName(user) {
      return `${user.name[0].toUpperCase()}${user.name.slice(1)} ${user.surname[0].toUpperCase()}${user.surname.slice(
        1
      )}`;
    },
  },
  computed: {
    ...mapState({
      users: state => state.user.items,
    }),
  },
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
form {
  margin: 12px;
}
.task-options {
  display: flex;
  justify-content: center;
  align-content: center;
  div {
    margin-top: 15px !important;
  }
}
</style>
