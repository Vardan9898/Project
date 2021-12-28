<template>
  <div class="register-body">
  <div class="mt-5 register-form">
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

<!--       <b-form-file v-model="form.image" class="mt-3" plain></b-form-file>-->


        <b-button block type="submit" variant="primary">Submit</b-button>
        <b-button @click="GoToLogin" block variant="success">Go to Login</b-button>
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
    form: {
        name: "",
        email: "",
        password: "",
        age: "",
        address: "",
        image: ""
    }
  }),
  methods: {
     RegisterUser() {
      this.$store.dispatch('REGISTER_USER', this.form)
      .then(res => {
        if (res){
          alert(res.message)
          this.$router.push({name: "Login"})
        }
      })
      .catch(error => {console.log(error)})
    },
    GoToLogin(){
       this.$router.push('Login')
    }
  }
}
</script>

<style scoped>

.register-body{
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, rgba(0,255,187,1) 0%, rgba(35,169,177,1) 50%, rgba(0,212,255,0.8802871490393032) 100%);
}
.register-form{
  max-width: 600px;
  width: 100%;
  padding: 25px;
  background-color: white;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 7px 6px rgba(0,0,0,0);
  border-radius: 10px;
}

</style>
