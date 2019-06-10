// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

//Doctors
const DoctorHome = () => import('@/views/doctorWorkspace/doctorHome')

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
]
}
