<template>
  <b-card>
    <div slot="header">
      排班规则
    </div>
    <div>
      <span style="font-style: italic"><strong>排班医生</strong></span>
      <b-button class="pull-right" type="submit" size="sm" variant="primary" @click="submit"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
      <b-button class="pull-right" type="saveRule" size="sm" variant="info" @click="saveRule"><i class="fa fa-dot-circle-o"></i> Save As Rule</b-button>
      <b-button class="pull-right" type="reset" size="sm" variant="danger" @click="reset"><i class="fa fa-ban"></i> Reset</b-button>
    </div>
    <br/>
    <div style="background:linear-gradient(to left,#efefef,#b6b6b6);height:1px;"></div>
    <br/>

    <b-form>
      <b-row>
        <b-col md="4">
          <b-form-group
            description=""
            label="医生姓名"
            label-for="doctorName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="user.userName" id="doctorName" type="text" placeholder="请输入医生姓名"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group
            description=""
            label="医生用户名"
            label-for="doctorLoginname"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="user.userLoginname" id="doctorLoginname" type="text" placeholder="请输入医生用户名"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="1">
          <b-button variant="outline-Dark" class="btn btn-outline-dark btn-block" @click="getDoctor">查询</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group
            label="排班起始时间" label-for="schedulingStartTime"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="schedulingInfo.schedulingStarttime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" id="schedulingStartTime"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="排班结束时间" label-for="schedulingEndTime"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="schedulingInfo.schedulingEndtime" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" id="schedulingEndTime"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group
            label="午别"
            label-for="schedulingNoonbreak"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              id="schedulingNoonbreak"
              name="schedulingNoonbreak">
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="schedulingInfo.schedulingNoonbreak" type="radio" id="Morning" name="schedulingNoonbreak" class="custom-control-input" value="Morning" checked>
                <label class="custom-control-label" for="Morning">上午</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="schedulingInfo.schedulingNoonbreak" type="radio" id="Noon" name="schedulingNoonbreak" class="custom-control-input" value="Noon">
                <label class="custom-control-label" for="Noon">中午</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="schedulingInfo.schedulingNoonbreak" type="radio" id="Afternoon" name="schedulingNoonbreak" class="custom-control-input" value="Afternoon">
                <label class="custom-control-label" for="Afternoon">下午</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="schedulingInfo.schedulingNoonbreak" type="radio" id="Night" name="schedulingNoonbreak" class="custom-control-input" value="Night">
                <label class="custom-control-label" for="Night">晚上</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            description=""
            label="限号数量"
            label-for="schedulingLimitcount"
            :label-cols="3"
            :horizontal="true">
            <b-form-input :state="countState" v-model="schedulingInfo.schedulingLimitcount" id="schedulingLimitcount" type="text" placeholder="请输入限号数量"></b-form-input>
            <b-form-invalid-feedback id="schedulingLimitcount">
              请输入大于0的数字
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group
            label="挂号级别"
            label-for="registrationLevel"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              id="registrationLevel"
              name="registrationLevel">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="general" name="registrationLevel" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="general">普通</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="expert" name="registrationLevel" class="custom-control-input" value="2">
                <label class="custom-control-label" for="expert">专家</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="emergency" name="registrationLevel" class="custom-control-input" value="3">
                <label class="custom-control-label" for="emergency">急诊</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

    </b-form>
  </b-card>
</template>

<script>
    export default {
        name: "schedulingInfoForm",
        props: {
          doctorList: {
            type: [Array, Object],
            default: () => []
          },
        },
        data: () => {
          return{
            schedulingInfo: {
              // schedulingInfoId: 10,
              schedulingStarttime: '',
              schedulingEndtime:'',
              schedulingNoonbreak: 'Morning',
              schedulingLimitcount: '',
              doctorId: '',
            },
            user: {
              userName: '',
              userLoginname: '',
            },
            schedulingData: {},
          }
        },
        computed:{
          countState(){
            return !isNaN(this.schedulingInfo.schedulingLimitcount) && this.schedulingInfo.schedulingLimitcount > 0;
          },
        },
        methods:{
          getDoctor(){
            let ds = this.doctorList.filter(doctor => {if(doctor.userName === this.user.userName && doctor.userLoginname === this.user.userLoginname) return true;});
            if(ds.length > 0) {
              this.user = JSON.parse(JSON.stringify(ds[0]));
              alert("已找到此医生，可以进行排班操作");
            }
            else {
              alert("未找到此医生！");
            }
          },
          submit(){
            this.schedulingInfo.doctorId = this.user.userId;
            console.log("接下来打印");
            console.log(this.schedulingInfo);
            this.$post('http://localhost:8080/hoso/scheduling/insertInfo', this.schedulingInfo).then((res) => {
              if (res.status === 'OK') {
                alert("生成排班信息成功");
              } else {
                console.log("挂号失败");
              }
            });
            this.$emit('convertInfo', JSON.parse(JSON.stringify(this.schedulingInfo)), this.user.userName);
            // this.schedulingData = {};
            // this.reset();
          },
          reset(){
            this.user = {};
            this.schedulingInfo = {};
          },
          saveRule(){
            let schedulingData = this.schedulingInfo;
            schedulingData.userId = this.user.userId;
            this.$post('http://localhost:8080/hoso/scheduling/insertRule', {"schedulingInfo": schedulingData}).then((res) => {
              if (res.status === 'OK') {
                alert("生成排班规则成功");
              } else {
                console.log("挂号失败");
              }
            });
            this.$emit('convertRule', JSON.parse(JSON.stringify(schedulingData)), this.user.userName);
            this.reset();
          },
        },
    }
</script>

<style scoped>

</style>
