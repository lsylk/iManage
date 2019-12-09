<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Sprint</md-dialog-title>
      <md-dialog-content>
        <form novalidate class="md-layout" @submit.prevent="validateSprint">
          <md-field :class="getValidationClass('name')">
            <label for="name">Sprint Name</label>
            <md-input name="name" id="name" v-model="form.name" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.name.required">The sprint name is required</span>
            <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid sprint name</span>
          </md-field>

          <md-field :class="getValidationClass('deadline')">
            <md-field>
              <md-icon>event</md-icon>
              <label for="deadline">Deadline</label>
              <md-input v-model="form.deadline"></md-input>
            </md-field>
            <span class="md-error">The deadline is required</span>
          </md-field>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-snackbar :md-active.sync="sprintSaved">The sprint {{ form.name }} was saved with success!</md-snackbar>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button type="submit" class="md-primary" @click="saveSprint()" :disabled="sending">Save</md-button>
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
import { mapActions } from 'vuex';
export default {
  name: 'SprintModal',
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    form: {
      name: null,
      deadline: new Date(),
    },
    sprintSaved: false,
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      deadline: {
        required,
      },
    },
  },
  methods: {
    ...mapActions({ addSprint: 'project/addSprint' }),
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
      this.form.deadline = null;
    },
    async saveSprint() {
      this.sending = true;
      await this.addSprint(this.form);
      this.sprintSaved = true;
      this.sending = false;
      this.clearForm();
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
