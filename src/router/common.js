const Page404 = () => import('../views/common/Page404');
const Page500 = () => import('../views/common/Page500');
const Login = () => import('../views/common/Login');
const Register = () => import('../views/common/RegisterForLogin');

const LoginForPatient = () => import('../views/patient/LoginForPatient');


export default {
  path: '/',
    redirect: '/login',
  // redirect:'/loginForPatient',
  name: 'Pages',
  component: {
  render (c) { return c('router-view') }
},
  children: [
    {
      path: '404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '500',
      name: 'Page500',
      component: Page500
    },
    {
      path: 'login',
      name: 'Login',
      component: Login
    },
    {
      path: 'registerForLogin',
      name: 'Register',
      component: Register
    },
    {
      path: 'loginForPatient',
      name: 'loginForPatient',
      component: LoginForPatient
    }
  ]
}
