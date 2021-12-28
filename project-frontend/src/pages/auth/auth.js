import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";
import Profile from "./Profile";
import Users from "./Users";

export default [
  {path: '/login',name: 'Login', component: Login},
  {path: '/register',name: 'Register', component: Register},
  {path: '/verify',name: 'Verify', component: Verify},
  {path: '/profile',name: 'Profile', component: Profile},
  {path: '/users',name: 'Users', component: Users},
]
