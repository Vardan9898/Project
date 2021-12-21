import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Verify from "./Verify";
import Profile from "./Profile";

export default [
  {path: '/login',name: 'Login', component: Login},
  {path: '/register',name: 'Register', component: Register},
  {path: '/forgot',name: 'ForgotPassword', component: ForgotPassword},
  {path: '/verify',name: 'Verify', component: Verify},
  {path: '/profile',name: 'Profile', component: Profile},
]
