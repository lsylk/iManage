<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Task</md-dialog-title>
      <md-dialog-content>
        <form novalidate class="md-layout" @submit.prevent="validateTask">
          <md-field :class="getValidationClass('taskDeacription')">
            <label for="taskt-description">Task Description</label>
            <md-input
              name="task-description"
              id="task-description"
              v-model="form.taskDescription"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.taskDescription.required">The task description is required</span>
            <span class="md-error" v-else-if="!$v.form.taskDescription.minlength">Invalid task description</span>
          </md-field>

          <md-field :class="getValidationClass('taskType')">
            <label for="taskt-type">Type </label>
            <div v-for="(type, index) in taskTypes" :key="index">
              <md-radio v-model="taskType" :value="type">{{ type }}</md-radio>
            </div>
            <span class="md-error" v-if="!$v.form.taskType.required">The task type is required</span>
          </md-field>

          <md-field :class="getValidationClass('users')">
            <label for="users">Users</label>
            <md-select name="users" id="users" v-model="form.users" md-dense :disabled="sending" multiple>
              <span v-for="user in users" :key="user._id">
                <md-option :value="`${user.name} ${user.surname}`">{{ formatUserName(user) }}</md-option>
              </span>
            </md-select>
            <span class="md-error">The users are required</span>
          </md-field>

          <md-field :class="getValidationClass('taskStatus')">
            <label for="taskt-status">Status </label>
            <div v-for="(status, index) in taskStatus" :key="index">
              <md-radio v-model="taskStatus" :value="status">{{ status }}</md-radio>
            </div>
            <span class="md-error" v-if="!$v.form.taskStatus.required">The task status is required</span>
          </md-field>

          <md-field :class="getValidationClass('notes')">
            <label for="notes">Notes</label>
            <md-textarea name="notes" id="notes" v-model="form.notes" :disabled="sending"> </md-textarea>
          </md-field>

          <md-field :class="getValidationClass('comments')">
            <label for="comments">comments</label>
            <md-textarea name="comments" id="comments" v-model="form.comments" :disabled="sending"> </md-textarea>
          </md-field>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-snackbar :md-active.sync="taskSaved">The task {{ taskName }} was saved with success!</md-snackbar>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
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
export default {
  name: 'taskModal',
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    taskTypes: ['Feature', 'Bug', 'Test'],
    taskStatus: ['To do', 'In Progress', 'Done'],
    form: {
      taskDescription: null,
      taskType: null,
      users: [],
      taskStatus: null,
      notes: null,
      comments: null,
    },
    taskSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      taskDescription: {
        required,
        minLength: minLength(3),
      },
      taskType: {
        required,
      },
      taskStatus: {
        required,
      },
    },
  },
  methods: {
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
      this.form.taskName = null;
      this.form.deadline = null;
    },
    savetask() {
      this.sending = true;

      //TO DO: Make request to Save task
      // window.setTimeout(() => {
      //   this.taskSaved = true
      //   this.sending = false
      //   this.clearForm()
      // }, 1500)
    },
    validatetask() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.savetask();
      }
    },
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
</style>
