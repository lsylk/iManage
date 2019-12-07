<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Project</md-dialog-title>
      <md-dialog-content>
        <form novalidate class="md-layout" @submit.prevent="validateProject">
          <md-field :class="getValidationClass('projectName')">
            <label for="project-name">Project Name</label>
            <md-input name="project-name" id="project-name" v-model="form.projectName" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.projectName.required">The project name is required</span>
            <span class="md-error" v-else-if="!$v.form.projectName.minlength">Invalid project name</span>
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

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-snackbar :md-active.sync="projectSaved"
            >The project {{ projectName }} was saved with success!</md-snackbar
          >
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button title="Add new project" aria-label="Add new project" class="md-fab md-mini" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'projectModal',
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    form: {
      projectName: null,
      deadline: null,
    },
    projectSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      projectName: {
        required,
        minLength: minLength(3),
      },
      users: {
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
      this.form.projectName = null;
      this.form.users = [];
    },
    saveProject() {
      this.sending = true;

      //TO DO: Make request to Save project
      // window.setTimeout(() => {
      //   this.projectSaved = true
      //   this.sending = false
      //   this.clearForm()
      // }, 1500)
    },
    validateProject() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveProject();
      }
    },
  },
  computed: {
    formatUserName(user) {
      return `${user.name[0].Uppercase()}${user.name.slice(1)} ${user.surname[0].Uppercase()}${user.surname.slice(1)}`;
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
