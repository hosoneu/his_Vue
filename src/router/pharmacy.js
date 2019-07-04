// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Pharmacy
// const PharmacyHome = () => import('../views/pharmacy/pharmacy');
const pharmacy = () => import("../views/pharmacy/pharmacy");

export default {
  path:'/pharmacy',
  redirect:'/pharmacy/pharmacy',
  name:'pharmacy',
  component: DefaultContainer,
  children: [
    {
      path: '/pharmacy/pharmacy',
      name: 'pharmacyHome',
      component: pharmacy
    }
  ]
}
