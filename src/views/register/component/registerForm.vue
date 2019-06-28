<template>
  <b-card>
    <div slot="header">
      挂号表单
    </div>
    <div>
      <span style="font-style: italic"><strong>患者信息</strong></span>
      <b-button class="pull-right" type="submit" size="sm" variant="primary" @click="submit"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
      <b-button class="pull-right" type="reset" size="sm" variant="danger" @click="reset"><i class="fa fa-ban"></i> Reset</b-button>
    </div>
    <br/>
    <div style="background:linear-gradient(to left,#efefef,#b6b6b6);height:1px;"></div>
    <br/>

    <b-form @submit.prevent="">
      <b-row>
        <b-col md="6">
          <b-form-group
            description=""
            label="患者身份证号"
            label-for="patientIdentity"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="patient.patientIdentity" id="patientIdentity" type="text"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="1">
          <b-button variant="outline-Dark" class="btn btn-outline-dark btn-block" @click="getPatient">查询</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group
            description=""
            label="患者姓名"
            label-for="patientName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="patient.patientName" id="patientName" type="text" autocomplete="name"></b-form-input>
          </b-form-group>
          <b-form-group
            label="患者性别"
            label-for="patientGender"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              id="patientGender"
              name="patientGender">
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="patient.patientGender" type="radio" id="male" name="patientGender" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="male">男</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="patient.patientGender" type="radio" id="female" name="patientGender" class="custom-control-input" value="2">
                <label class="custom-control-label" for="female">女</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group
            label="患者生日" label-for="patientBirth"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="patient.patientBirth" type="date" id="patientBirth"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <div>
        <span style="font-style: italic"><strong>挂号信息</strong></span>
      </div>
      <br/>
      <div style="background:linear-gradient(to left,#efefef,#b6b6b6);height:1px;"></div>
      <br/>

      <b-row>
        <b-col md="6">
          <b-form-group
            label="选择科室"
            label-for="selectDepartment"
            :label-cols="3"
            :horizontal="true">
            <b-form-select id="selectDepartment"
                           size="lg"
                           :plain="true"
                           v-model="registration.departmentId">
              <option v-for="department in departmentList" :key="department.departmentId" :value="department.departmentId" :label="department.departmentName"></option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="选择医生"
            label-for="selectDoctor"
            :label-cols="3"
            :horizontal="true">
            <b-form-select id="selectDoctor"
                           size="lg"
                           :plain="true"
                           v-model="registration.doctorId">
              <option v-for="doctor in doctorList" :key="doctor.userId" :value="doctor.userId" :label="doctor.userName"></option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group
            label="结算类别"
            label-for="calculationType"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              v-model="registration.calculationTypeId"
              id="calculationType"
              name="calculationType">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="ownExpense" name="calculationType" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="ownExpense">自费</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="medicalInsurance" name="calculationType" class="custom-control-input" value="2">
                <label class="custom-control-label" for="medicalInsurance">医保</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="nrcms" name="calculationType" class="custom-control-input" value="3">
                <label class="custom-control-label" for="nrcms">新农合</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            label="挂号级别"
            label-for="registrationLevel"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              v-model="registration.registrationLevelId"
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

      <b-row>
        <b-col md="6">
          <b-form-group
            label="是否购买病历本?"
            label-for="buyMedical"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              v-model="registration.buyMedicalRecord"
              id="buyMedical"
              name="customRadioInline1">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="yes" name="customRadioInline1" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="yes">否</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="no" name="customRadioInline1" class="custom-control-input" value="2">
                <label class="custom-control-label" for="no">是</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

<!--      <div slot="footer">-->
<!--        <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>-->
<!--        <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>-->
<!--      </div>-->
    </b-form>
  </b-card>
</template>

<script>
    export default {
        name: "registerForm",
        props: {
          departmentList: {
            type: [Array, Object],
            default: () => []
          },
          doctorList: {
            type: [Array, Object],
            default: () => []
          },
          patientList: {
            type: [Array, Object],
            default: () => []
          },
        },
        data: () => {
            return{
              patient: {
                patientName:'',
                patientGender: '',
                patientBirth: '',
                patientIdentity: '',
              },
              registration: {
                registrationLevelId: '',
                departmentId: '',
                calculationTypeId: '',
                //doctorId可谓不填项，则insertSelective不更新
                doctorId: null,
                buyMedicalRecord: 1,
              },
            }
          },
      methods:{
        getPatient(){
          let ds = this.patientList.filter(patient => {if(patient.patientIdentity === this.patient.patientIdentity) return true;});
          if(ds.length > 0) {
            this.patient = JSON.parse(JSON.stringify(ds[0]));
          }
          else {
            alert("此患者尚未在本医院就诊过！");
          }
        },
        submit(){
          alert(this.doctorList);
          alert(this.departmentList);
        },
        reset(){

        }
      },
    }
</script>

<style scoped>

</style>
