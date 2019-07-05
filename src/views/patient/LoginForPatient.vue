<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <br/>
                  <h1>自助服务</h1>
                  <p class="text-muted">Register By Yourself</p>
                  <br/>
                  <b-row>
                    <b-col cols="8">
                      <b-button variant="primary" class="px-8" v-on:click="submitLogin" :disabled="disabledLogin">作为患者登录</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-left">
                <div>
                  <h2>HIS门诊工作站</h2>
                  <p>HIS系统致力于为您提供更加便捷和智能的工作体验!</p>
                  <p>HIS系统的主要功能按照数据流量、流向及处理过程分为临床诊疗、药品管理、经济管理、综合管理与统计分析等!</p>
                  <b-button variant="primary" class="active mt-3">联系我们!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: 'LoginForPatient',
    data:function() {
      return {
        userName:undefined,
        password:undefined,
        dismissCountDown: 0,
        defaultDismissDes:3,
        message:""
      };

    },
    computed:{
      disabledLogin(){
        return this.errors.has('password') || this.errors.has("userName");
      },
      validFeedback(){
        return "valid";
      },
      ...mapState("common",['curr_user_type'])
    },
    methods:{
      ...mapMutations('common',['set_curr_user_type']),
      ...mapMutations('common',['set_curr_user']),
      ...mapMutations('common',['set_curr_user_id']),
      ...mapMutations('common',['set_curr_dept']),
      ...mapMutations('common',['set_curr_role']),
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      forgetPass(){//忘记密码

      },
      alertLoginFail(){//弹出登陆失败的对话框
        this.dismissCountDown = this.defaultDismissDes;
      },
      submitLogin(){
        this.set_curr_user_type('patient');
        this.$router.push("/" + this.curr_user_type + "/homePage");
      },
    }
  }
</script>
