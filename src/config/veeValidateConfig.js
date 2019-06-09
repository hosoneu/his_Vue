import {Validator} from "vee-validate";
import zh from "vee-validate/dist/locale/zh_CN";

Validator.locale ="zh_CN";
Validator.localize(Validator.locale,{
  messages: zh.messages,
  attributes:{
    loginName:'登录名',
    loginPassword:'密码'
  }
});
