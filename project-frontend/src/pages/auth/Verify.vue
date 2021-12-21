<template>
<div>
  <div
    v-if="email"
    class="d-flex flex-column text-center "
  >
    <b>Congrats {{email}} </b>
    <p>You are fully registered</p>
    <p class="">Welcome</p>
  </div>
  <b-button @click="GoToLogin" type="submit" variant="primary">Go to Login page</b-button>
</div>
</template>


<script>
export default {
  data(){
    return {
      email: ""
    }
      },
  mounted() {
    this.showParams();
  },
  name: "Verify",
  methods: {
    showParams() {
      this.email = this.$route.query.email
    },
    GoToLogin(){
      this.$router.push({name : "Login"});
    }
  }
}
</script>

<style scoped>

</style>
