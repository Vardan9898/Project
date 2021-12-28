<template>
  <div class="profile-page-body">
    <b-button @click="Logout" class="logout" variant="danger">Logout</b-button>
    <div class="profile-image-block">
      <div class="profile-image">
        <img src="https://infinity-tm.ru/sb/theme/img/profile-pics/2.jpg" alt="profile image">
      </div>
    </div>
    <div class="profile-data-block">
      <div class="profile-data" v-if="user[0]">
        <h1 class="user-name">{{user[0].name}}</h1>
        <div class="user-age">
          <img src="https://cdn-icons-png.flaticon.com/512/6443/6443358.png" alt="user age">
          <p>{{user[0].age}}</p>
        </div>
        <div class="user-email">
          <img src="https://cdn-icons.flaticon.com/png/512/3178/premium/3178283.png?token=exp=1640455137~hmac=5258c24ff655e53562949088cb5e687c" alt="user email">
          <p>{{user[0].email}}</p>
        </div>
        <div class="user-address">
          <img src="https://cdn-icons.flaticon.com/png/512/1433/premium/1433265.png?token=exp=1640509150~hmac=d68a0a5e043b2214174259362c5114de" alt="user address">
          <p>{{user[0].address}}</p>
        </div>
        <b-button class="mt-2" @click="GoToUsers" href="#" variant="outline-success" block><span class="show-all-users">All Users</span></b-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Profile",
  methods: {
    GoToUsers(){
      this.$router.push({name: 'Users'})
    },
    Logout(){
      this.$store.dispatch('LOGOUT')
      .then((res) => {
        if (res) {
          this.$router.push({name: 'Login'})
        }
      })
    }
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
   this.$store.dispatch('GET_USER')
      .then((res) => {
          if(res) {
           this.user = this.$store.getters.getUserData
        }
      })
    .catch(error => console.log(error))
  }
}
</script>

<style scoped>
.profile-page-body{
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  box-sizing: border-box;
  position: relative;
}
.profile-image-block{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.profile-image{
  width: 100%;
  height: auto;
  max-width: 480px;
  max-height: 480px;
  border-radius: 100%;
  overflow: hidden;
}
.profile-image>img{
  width: 100%;
  height: auto;
}

.profile-data-block{
  display: flex;
  align-items: center;
  padding: 20px;
}

.user-name{
  font-size: 60px;
  font-weight: bold;
  color: #2d3748;
  text-align: left;
}

.user-age,.user-address,.user-email {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.user-age,.user-email {
  border-bottom: 1px solid #cbd5e0;
}

.user-age>img,.user-address>img,.user-email>img {
  width: 50px;
  height: 50px;
  margin-right: 16px;
}
.user-age>p,.user-address>p,.user-email>p{
  font-size: 25px;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0;
  text-align: left;
}

.show-all-users{
  font-size: 25px !important;
}

.profile-data{
  width: 100%;
}
.logout{
  position: absolute;
}

@media only screen and (max-width: 700px) {
  .profile-page-body{
    grid-template-columns: 100%;
    height: auto;
    grid-template-rows: auto auto;
  }
  .user-age>p,.user-address>p,.user-email>p{
    font-size: 16px;
  }
  .show-all-users{
    font-size: 16px !important;
  }
  .user-name {
    font-size: 40px;
  }
  }

</style>
