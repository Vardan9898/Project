<template>
  <div class="login-body">
  <div class="login-form">
    <h2 class="mt-3">Sign In</h2>
    <ValidationObserver ref="login_observer" v-slot="{ handleSubmit }">
      <b-form @submit.prevent="LoginUser">
        <ValidationProvider rules="required|email" name="Email" v-slot="{ valid, errors }">
          <b-form-group>
            <b-form-input
              class="mt-3"
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
          name="regex"
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

        <b-button block type="submit" variant="primary">Login</b-button>
        <b-button @click="GoToRegister" block variant="success">Create account</b-button>
      </b-form>
    </ValidationObserver>
  </div>
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
    form:{
      email: "",
      password: "",
      email_verified_status: "active"
    },

  }),
  methods: {
    LoginUser() {
      this.$store.dispatch('LOGIN_USER', this.form)
        .then(res => {
          if(res){
            //this.$router.push({name: 'Profile'})
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    GoToRegister(){
      this.$router.push({name: 'Register'})
    }
  },

};
</script>

<style scoped>
.login-body{
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, rgba(0,255,187,1) 0%, rgba(35,169,177,1) 50%, rgba(0,212,255,0.8802871490393032) 100%);
}
.login-form{
  max-width: 600px;
  width: 100%;
  padding: 25px;
  background-color: white;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 7px 6px rgba(0,0,0,0);
  border-radius: 10px;
}
</style>
