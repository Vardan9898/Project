<template>
  <div class="mt-5">
    <h2>Please Register</h2>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(RegisterUser)">

        <ValidationProvider rules="required|" name="Name" v-slot="{ valid, errors }">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="form.name"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter name"
            ></b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider rules="required|email" name="Email" v-slot="{ valid, errors }">
          <b-form-group>
            <b-form-input
              type="email"
              v-model="form.email"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter email"
            ></b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          rules="required|regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/"
          name="Password"
          vid="password"
          v-slot="{ valid, errors }"
        >
          <b-form-group>
            <b-form-input
              type="password"
              v-model="form.password"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter password"
            ></b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          rules="required|numeric"
          name="Age"
          vid="age"
          v-slot="{ valid, errors }"
        >
          <b-form-group>
            <b-form-input
              type="number"
              v-model="form.age"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter Your age"
            ></b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          rules="required"
          name="Address"
          vid="address"
          v-slot="{ valid, errors }"
        >
          <b-form-group>
            <b-form-input
              type="text"
              v-model="form.address"
              :state="errors[0] ? false : (valid ? true : null)"
              placeholder="Enter Your address"
            ></b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>



        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from "axios";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "BootstrapForm",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    form: {
        name: "",
        email: "",
        password: "",
        age: "",
        address: ""
    }
  }),
  methods: {
    RegisterUser() {
      return new Promise((resolve, reject) => {
        axios.post('/auth/register', this.form)
          .then((res) => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
  }
};
</script>

<style scoped>

</style>
