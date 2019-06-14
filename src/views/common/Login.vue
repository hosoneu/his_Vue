<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-form-group label-for="inputError2"
                                label="UserID"
                                validated
                                :invalid-feedback="errors.first('userName')"
                                :valid-feedback="validFeedback">
                    <b-form-input v-validate="'required'" name="userName" v-model="userName" type="text" class="form-control-warning" id="inputError2" required></b-form-input>
                  </b-form-group>
                  <b-form-group validated
                                label="Password"
                                label-for="normalPass"
                                v-bind:invalid-feedback="errors.first('password')"
                                v-bind:valid-feedback="validFeedback">
                    <b-form-input v-validate="'required'" v-model="password" name="password" id="normalPass" type="password" placeholder="Enter Password.." required autocomplete="current-password"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col cols="12">
                      <b-alert :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountdown=0" @dismiss-count-down="countDownChanged">
                        用户名或密码错误
                      </b-alert>
                    </b-col>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" v-on:click="submitLogin" :disabled="disabledLogin">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0" v-on:click="forgetPass">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
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
  import {mapState} from 'vuex'
export default {
  name: 'Login',
  data:function() {
  return {
    userName:undefined,
    password:undefined,
    dismissCountDown: 0,
    defaultDismissDes:3,
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
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    submitLogin(){
      console.log("click");
      this.$post('/login', {
        username: this.username,
        password: this.password
      }).then(res=>{
        console.log(res);
        if(res.code === true){
          this.$router.push("/" + this.curr_user_type);
        }else{
          this.alertLoginFail();
        }
      });
    },
    forgetPass(){

    },
    alertLoginFail(){
      this.dismissCountDown = this.defaultDismissDes;
    },
  }
}
</script>
