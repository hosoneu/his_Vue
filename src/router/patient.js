// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');


const HomePage = () => import('../views/patient/homePage');
export default {
  path:'/patient',
  redirect:'/patient/homePage',
  name:'Patient',
  component: DefaultContainer,
  children: [
    {
      path: 'homePage',
      name: 'homePage',
      component: HomePage
    },
  ]
}
