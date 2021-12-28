import axios from "axios";

export default {
  state: {
    user: {},
    token: '',
    users: {},
  },
  mutations: {
    setUserData(state, data){
       state.user = data
    },
    getAllUsers(state, data) {
      state.user = data
    },
    setToken(state, data){
      localStorage.setItem('access_token', data)
    },
    delToken(state, data){
      localStorage.removeItem('access_token')
    },
  },
  getters: {
    getUserData(state) {
      return state.user
    },
    getAllUsers(state) {
      return state.user
    },
  },
  actions: {
    LOGIN_USER(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', data)
          .then((res) => {
            if (res.status === 200) {
              context.commit('setToken', res.data.access_token)
              resolve(true)
              location.replace('Profile')
            }
          },)
          .catch(error => {alert("Please enter correct email or password or check Your email address")})
      })
    },
    REGISTER_USER(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/auth/register', data)
          .then((res) => {
            if (res.status === 200){
              resolve(res.data);
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    GET_USER(context){
      return new Promise((resolve, reject) => {
        axios.post('/auth/me')
          .then(res => {
            if(res.status === 200){
              context.commit('setUserData', res.data)
              resolve(true)
              if (res.data[0] == null){
                location.replace('Login')
              }
            }
          }).catch(error => {
            reject(error)
        })
      })
    },
    GET_ALL_USERS(context){
      return new Promise((resolve, reject) => {
        axios.post('/auth/all_users')
          .then(res => {
            if(res.status === 200){
              context.commit('getAllUsers', res.data)
              resolve(true)
              console.log(res.data)
            }
          }).catch(error => {
          reject(error)
          if (error['message'] === 'Request failed with status code 500'){location.replace('Login')}
        })
      })
    },
    LOGOUT(context){
      return new Promise((resolve, reject) => {
        axios.post('/auth/logout',)
          .then((res) => {
            if (res.status === 200) {
              context.commit('delToken')
              resolve(true)
            }
          },)
          .catch(error => {console.log(error)})
      })
    },
    VERIFIED_EMAIL(context, data){
      return new Promise((resolve, reject) => {
        axios.post('/auth/verify', data)
          .then((res) => {
            if (res.status === 200){
              resolve(res.data);
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
    }
  }
