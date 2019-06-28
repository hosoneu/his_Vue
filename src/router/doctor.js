// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Doctors
const DoctorHome = () => import('../views/doctor/doctorHome');
const DepartmentTable = () => import('../views/doctor/departmentTable');
const Workload = () => import('../views/doctor/workload');
const WorkloadChart = () => import('../views/doctor/workloadChart');
const DayCalculate = () => import('../views/doctor/daycalculate');
const UserTable = () => import('../views/doctor/userTable');
const personalWorkload = () => import('../views/doctor/personalworkload');
const dayCalHistory = () => import('../views/doctor/dayCalHistory');
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
      path: 'daycalculate',
      name: 'daycalculate',
      component: DayCalculate
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
