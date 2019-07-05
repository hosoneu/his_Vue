// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');


const HomePage = () => import('../views/patient/homePage');
const Register = () => import('../views/patient/register');
export default {
  path:'/patient',
  // redirect:'/',
  name:'Patient',
  component: DefaultContainer,
  children: [
    {
      path: 'homePage',
      name: 'homePage',
      component: HomePage
    },
    {
      path: 'register',
      name: 'register',
      component: Register
    },
  ]
}
