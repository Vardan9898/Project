<template>
<div class="all-users-block">
  <b-button @click="Logout" class="logout" variant="danger">Logout</b-button>
  <div
    class="user-card"
    v-for="user in users[0]"
  >
    <div>
      <div class="user-image">
        <img src="https://infinity-tm.ru/sb/theme/img/profile-pics/2.jpg" alt="">
      </div>
      <div class="user-data">
        <h4 class="user-name">{{user.name}}</h4>
        <b-button class="mt-1" variant="primary" block>Add to friends</b-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: {},
    }
  },
  methods: {
    Logout(){
      this.$store.dispatch('LOGOUT')
        .then((res) => {
          if (res) {
            this.$router.push({name: 'Login'})
          }
        })
    }
  },
  mounted() {
    this.$store.dispatch('GET_ALL_USERS')
      .then((res) => {
        if(res) {
          this.users = this.$store.getters.getAllUsers
        }
      })
      .catch(error => console.log(error))
  }
}

</script>

<style scoped>
.all-users-block{
  width: 100%;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  padding: 15px;
  position: relative;
}
.user-card{
  padding: 15px;
}
.user-image,.user-data{
  width: 100%;
  background-color: rgba(0,0,0,0.1);
  padding: 10px 20px;
}
.user-image>img{
  width: 100%;
  border-radius: 100%;
}
.user-name{
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #2d3748;
}
.user-card:hover{
  padding: 10px;
}
.user-card:hover>div{
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
}
.logout{
  position: absolute;
  opacity: 25%;
}
.logout:hover{
  opacity: 100%;
}

@media only screen and (max-width: 1200px) {
  .all-users-block{
    grid-template-columns: 25% 25% 25% 25%;
  }
}
@media only screen and (max-width: 900px) {
  .all-users-block{
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media only screen and (max-width: 700px) {
  .all-users-block{
    grid-template-columns: 1fr 1fr ;
  }
}
@media only screen and (max-width: 500px) {
  .all-users-block{
    grid-template-columns: 100% ;
  }
}
</style>
