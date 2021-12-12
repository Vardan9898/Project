<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSend)">
      <ValidationProvider rules="required|email" name="Email" v-slot="{ valid, errors }">
        <b-form-group>
          <b-form-input
            class="mt-5"
            type="email"
            v-model="email"
            :state="errors[0] ? false : (valid ? true : null)"
            placeholder="Enter email"
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <b-button type="submit" variant="primary">Send</b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "BootstrapForm",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    email: "",
  }),
  methods: {
    onSend() {
      console.log("Form submitted yay!");
    },
  }
};
</script>

<style scoped>

</style>
