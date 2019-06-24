//默认容器组件
import DefaultContainer from "../containers/DefaultContainer";

//挂号表单组件
import RegisterForm from "../views/register/component/registerForm";

//挂号表格组件
import RegisterTable from "../views/register/component/registerTable";

export default {
  path: '/register',
  name: 'register',
  component: DefaultContainer,
  children: [
    {
      path: 'registerForm',
      name: 'registerForm',
      component: RegisterForm
    },
    {
      path: 'registerTable',
      name: 'registerTable',
      component: RegisterTable
    }
  ]
}
