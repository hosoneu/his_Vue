// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Doctors
const DoctorHome = () => import('../views/doctor/homePage');
const FinalDiagnosis = () => import('../views/doctor/finalDiagnosis');
const PatentPrescription = () => import('../views/doctor/patentPrescription');
const HerbalPrescription = () => import('../views/doctor/herbalPrescription');
const Treatment = () => import('../views/doctor/treatment');
const ExaminationFirst = () => import('../views/doctor/examination1');
const ExaminationSecond = () => import('../views/doctor/examination2');
const TreatmentOver = () => import('../views/doctor/treatmentOver');
const ExpenseSearch = () => import('../views/doctor/expenseSearch');
export default {
  path:'/doctor',
  redirect:'/doctor/homePage',
  name:'Doctor',
  component: DefaultContainer,
  children: [
    {
      path: 'homePage',
      name: 'homePage',
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
    },
    {
      path:'treatmentOver',
      name:'treatmentOver',
      component:TreatmentOver
    },
    {
      path:'expenseSearch',
      name:'expenseSearch',
      component:ExpenseSearch
    }
  ]
}
