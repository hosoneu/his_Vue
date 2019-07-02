// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Pharmacy
const PharmacyHome = () => import('../views/pharmacy/pharmacyHome');
const pharmacy = () => import("../views/pharmacy/pharmacy");

export default {
  path:'/pharmacy',
  redirect:'/pharmacy/pharmacyHome',
  name:'Pharmacy',
  component: DefaultContainer,
  children: [
    {
      path: 'pharmacyHome',
      name: 'pharmacyHome',
      component: PharmacyHome
    },
    {
      path:'pharmacy',
      name:'pharmacy',
      component:pharmacy
    }
  ]
}
