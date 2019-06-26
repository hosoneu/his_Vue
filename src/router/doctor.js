// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Doctors
const DoctorHome = () => import('../views/doctor/doctorHome');
const DepartmentTable = () => import('../views/doctor/departmentTable');
const Workload = () => import('../views/doctor/workload');
const WorkloadChart = () => import('../views/doctor/workloadChart');
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
      path: 'workloadChart',
      name: 'workloadChart',
      component: WorkloadChart
    }
]
}
