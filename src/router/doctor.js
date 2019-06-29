// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Doctors
const DoctorHome = () => import('../views/doctor/homePage');
const FinalDiagnosis = () => import('../views/doctor/finalDiagnosis');
const PatentPrescription = () => import('../views/doctor/patentPrescription');
const HerbalPrescription = () => import('../views/doctor/herbalPrescription');
const Treatment = () => import('../views/doctor/treatment');
const ExaminationFirst = () => import('../views/doctor/firstExamination');
const ExaminationSecond = () => import('../views/doctor/secondExamination');


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
      path:'finalDiagnosis',
      name:'finalDiagnosis',
      component:FinalDiagnosis
    },
    {
      path:'patentPrescription',
      name:'patentPrescription',
      component:PatentPrescription
    },
    {
      path:'herbalPrescription',
      name:'herbalPrescription',
      component:HerbalPrescription
    },
    {
      path:'treatment',
      name:'treatment',
      component:Treatment
    },
    {
      path:'examination1',
      name:'examination1',
      component:ExaminationFirst
    },
    {
      path:'examination2',
      name:'examination2',
      component:ExaminationSecond
    }

]
}
