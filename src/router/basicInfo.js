//默认容器组件
import DefaultContainer from "../containers/DefaultContainer";

//科室信息组件
import DepartmentInfo from "../views/basicInfo/departmentInfo"

//用户信息组件
import UserInfo from "../views/basicInfo/userInfo"

//挂号级别信息组件
import RegistrationLevelInfo from "../views/basicInfo/registrationLevelInfo"

//结算类别信息组件
import CalculationTypeInfo from "../views/basicInfo/calculationTypeInfo"

//诊断目录信息组件
import DiseaseInfo from "../views/basicInfo/diseaseInfo"

//非药品收费项目信息组件
import FmedicalItemsInfo from "../views/basicInfo/fmedicalItemsInfo"

//排班信息组件
import SchedulingInfo from "../views/basicInfo/schedulingInfo"

//排班信息组件
import ExpenseTypeInfo from "../views/basicInfo/expenseTypeInfo"

//排班信息组件
import DrugsInfo from "../views/basicInfo/drugsInfo"

export default {
  path: '/basicInfo',
  name: 'basicInfo',
  redirect:'/basicInfo/departmentInfo',
  component: DefaultContainer,
  children: [
    {
      path: 'departmentInfo',
      name: 'departmentInfo',
      component: DepartmentInfo
    },
    {
      path: 'userInfo',
      name: 'userInfo',
      component: UserInfo
    },
    {
      path: 'registrationLevelInfo',
      name: 'registrationLevelInfo',
      component: RegistrationLevelInfo
    },
    {
      path: 'calculationTypeInfo',
      name: 'calculationTypeInfo',
      component: CalculationTypeInfo
    },
    {
      path: 'diseaseInfo',
      name: 'diseaseInfo',
      component: DiseaseInfo
    },
    {
      path: 'fmedicalItemsInfo',
      name: 'fmedicalItemsInfo',
      component: FmedicalItemsInfo
    },
    {
      path: 'schedulingInfo',
      name: 'schedulingInfo',
      component: SchedulingInfo
    },
    {
      path: 'expenseTypeInfo',
      name: 'expenseTypeInfo',
      component: ExpenseTypeInfo
    },
    {
      path: 'drugsInfo',
      name: 'drugsInfo',
      component: DrugsInfo
    },
  ]
}
