<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Sprint</md-dialog-title>
      <md-dialog-content>
        <form novalidate class="md-layout" @submit.prevent="validateSprint">
          <md-field :class="getValidationClass('sprintName')">
            <label for="sprint-name">Sprint Name</label>
            <md-input name="sprint-name" id="sprint-name" v-model="form.sprintName" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.sprintName.required">The sprint name is required</span>
            <span class="md-error" v-else-if="!$v.form.sprintName.minlength">Invalid sprint name</span>
          </md-field>

          <md-field :class="getValidationClass('springDeadline')">
            <md-field>
              <md-icon>event</md-icon>
              <label for="sprint-deadline">Deadline</label>
              <md-input v-model="form.springDeadline"></md-input>
            </md-field>
            <span class="md-error">The deadline is required</span>
          </md-field>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-snackbar :md-active.sync="sprintSaved">The sprint {{ sprintName }} was saved with success!</md-snackbar>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button title="Add new sprint" aria-label="Add new sprint" class="md-fab md-mini" @click="showDialog = true">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'SprintModal',
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    form: {
      sprintName: null,
      deadline: null,
    },
    sprintSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      sprintName: {
        required,
        minLength: minLength(3),
      },
      deadline: {
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
      this.form.sprintName = null;
      this.form.springDeadline = null;
    },
    saveSprint() {
      this.sending = true;

      //TO DO: Make request to Save Sprint
      // window.setTimeout(() => {
      //   this.sprintSaved = true
      //   this.sending = false
      //   this.clearForm()
      // }, 1500)
    },
    validateSprint() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveSprint();
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
