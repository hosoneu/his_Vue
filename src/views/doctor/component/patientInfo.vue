<template>

      <b-card>
        <b-row>
          <b-col lg="2">
            <!--                  <span><i class="fa fa-money"> 缴费方式</i> : {{this.computedCalculationType}}</span>-->
          </b-col>
          <b-col lg="2">
            <span><i class="fa fa-id-card"> 病历号</i> : {{initialPatient.medicalRecordId}}</span>
          </b-col>
          <b-col lg="2">
            <span><i class="fa fa-user"> 患者姓名</i> : {{initialPatient.patientName}}</span>
          </b-col>
          <b-col lg="2">
            <span><i class="fa fa-genderless"> 性别</i> : {{this.computedPatientGender}}</span>
          </b-col>
          <b-col lg="2">
            <span><i class="fa fa-hashtag"> 状态</i> : <b-badge variant="primary">{{initialPatient.medicalRecordState}}</b-badge></span>
          </b-col>
        </b-row>
      </b-card>

</template>

<script>
  import {mapState} from 'vuex';
    export default {
      name: "patientInfo",
      data(){
        return{
          initialPatient:{medicalRecordState: "未选择", patientGender: "未选择", medicalRecordId: '未选择', patientName: '未选择', calculationTypeId:0},
        }
      },
      mounted:async function () {
        await this.initPatient();
      },
      computed:{
        ...mapState("doctor",["patient"]),
        computedPatientGender(){
          if(this.initialPatient.patientGender==='1'){
            return '男';
          }else if(this.initialPatient.patientGender==='2'){
            return '女';
          }else{
            return '未选择';
          }
        },
        computedCalculationType(){
          let transformCalculationType='';
          if(this.initialPatient.calculationTypeId===51){
            transformCalculationType='现金';
          }else if(this.initialPatient.calculationTypeId===52){
            transformCalculationType='医保卡';
          }else if(this.initialPatient.calculationTypeId===53){
            transformCalculationType='银行卡';
          }else if(this.initialPatient.calculationTypeId===54){
            transformCalculationType='信用卡';
          }else if(this.initialPatient.calculationTypeId===55){
            transformCalculationType='微信';
          }else if(this.initialPatient.calculationTypeId===56){
            transformCalculationType='支付宝';
          }else if(this.initialPatient.calculationTypeId===57){
            transformCalculationType='云闪付';
          }else if(this.initialPatient.calculationTypeId===58){
            transformCalculationType='其他';
          }else if(this.initialPatient.calculationTypeId===0){
            transformCalculationType='未选择';
          }else{
            return '未选择';
          }
          return transformCalculationType;
        },
      },
      watch:{
        patient:{
          handler() {
            this.initialPatient = this.patient;
          },
        }
      },
      methods:{
        initPatient(){
          this.initialPatient=this.patient;
        }
      }
    }
</script>

<style scoped>

</style>
