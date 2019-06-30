// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Doctors
const DoctorHome = () => import('../views/doctor/doctorHome');
const DepartmentTable = () => import('../views/statistics/workloadPage');
const Workload = () => import('../views/statistics/component/workload');
const WorkloadChart = () => import('../views/statistics/component/workloadChart');
const UserTable = () => import('../views/statistics/dayCalPage');
const personalWorkload = () => import('../views/statistics/personalworkload');
const dayCalHistory = () => import('../views/statistics/component/dayCalHistory');
export default {
  path:'/doctor',
    redirect:'/doctor/doctorHome',
  name:'Doctor',
  component: DefaultContainer,
  children: [
  {
    path: 'doctorHome',
    name: 'doctorHome',
    component: DoctorHome
  },
    {
      path: 'departmentTable',
      name: 'departmentTable',
      component: DepartmentTable
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
      path: 'userTable',
      name: 'userTable',
      component: UserTable
    },
    {
      path: 'workloadChart',
      name: 'workloadChart',
      component: WorkloadChart
    }
]
}
