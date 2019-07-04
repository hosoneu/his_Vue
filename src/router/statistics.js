// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Doctors
const workloadPage = () => import('../views/statistics/workloadPage');
const Workload = () => import('../views/statistics/component/workload');
const WorkloadChart = () => import('../views/statistics/component/workloadChart');
const DayCalPage = () => import('../views/statistics/dayCalPage');
const personalWorkload = () => import('../views/statistics/personalworkload');
const dayCalHistory = () => import('../views/statistics/component/dayCalHistory');
export default {
  path:'/statistics',
  redirect:'/statistics/workloadPage',
  name:'statistics',
  component: DefaultContainer,
  children: [
    {
      path: 'workloadPage',
      name: 'workloadPage',
      component: workloadPage
    },
    {
      path: 'workload',
      name: 'workload',
      component: Workload
    },
    {
      path: 'dayCalHistory',
      name: 'dayCalHistory',
      component: dayCalHistory,
    },
    {
      path: 'personalworkload',
      name: 'personalworkload',
      component: personalWorkload
    },
    {
      path: 'dayCalPage',
      name: 'dayCalPage',
      component: DayCalPage
    },
    {
      path: 'workloadChart',
      name: 'workloadChart',
      component: WorkloadChart
    }
  ]
}
