<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Project</md-dialog-title>
      <md-dialog-content>
        <form novalidate class="md-layout" @submit.prevent="validateProject">
          <md-field :class="getValidationClass('name')">
            <label for="name">Project Name</label>
            <md-input name="name" id="name" v-model="form.name" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.name.required">The project name is required</span>
            <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid project name</span>
          </md-field>

          <md-field :class="getValidationClass('users')">
            <label for="users">Users</label>
            <md-select name="users" id="users" v-model="form.users" :disabled="sending" multiple>
              <span v-for="user in users" :key="user._id">
                <md-option :value="user._id">{{ formatUserName(user) }}</md-option>
              </span>
            </md-select>
          </md-field>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-snackbar :md-active.sync="projectSaved">The project {{ form.name }} was saved with success!</md-snackbar>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button type="submit" class="md-primary" @click="saveProject()" :disabled="sending">Save</md-button>
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'projectModal',
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    form: {
      name: null,
      users: [],
    },
    projectSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
    },
  },
  methods: {
    ...mapActions({ addProjectToUser: 'user/addProjectToUser', addProject: 'project/addProject' }),
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
      this.form.name = null;
      this.form.users = [];
    },
    async saveProject() {
      this.sending = true;
      if (this.$route.name === 'myProjects') {
        await this.addProjectToUser(this.form);
      } else {
      await this.addProject(this.form);
      }
      this.projectSaved = true;
      this.sending = false;
      this.clearForm();
    },
    validateProject() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveProject();
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
</style>
