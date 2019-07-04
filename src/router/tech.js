// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Tech
const Tech = () => import('../views/tech/tech');
const commonlyUsedItems = () =>import('../views/tech/commonlyUsedItems');

export default {
  path:'/tech',
  redirect:'/tech/tech',
  name:'Tech',
  component: DefaultContainer,
  children: [
    {
      path:'tech',
      name:'tech',
      component:Tech
    },
    {
      path:'/tech/commonlyUsedItems',
      name:'commonlyUsedItems',
      component:commonlyUsedItems
    }
  ],
}
