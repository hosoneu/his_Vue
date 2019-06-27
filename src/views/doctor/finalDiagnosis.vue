<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <patient-info
        ></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3">
        <!--  挂号列表-->
        <registration-list
          @selectPatient="selectPatient"
        >
        </registration-list>
      </b-col>
      <b-col lg="9">
        <b-card header="填写模块">
          <b-tabs>
            <b-tab title="中医诊断">
              <chinese-diagnosis
                ref="chineseDiagnosis"
                :type=0
                :diagnosis-items="finalChineseDiagnosisItems"
                :if-seen="ifSeen"
              >
              </chinese-diagnosis>
              <!--  体格检查physicalExamination-->
            </b-tab>
            <b-tab title="西医诊断">
              <western-diagnosis
                ref="westernDiagnosis"
                :type=1
                :diagnosis-items="finalWesternDiagnosisItems"
                :if-seen="ifSeen"
              >
              </western-diagnosis>
            </b-tab>
            <b-tab title="辅助检查">

            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RegistrationList from "./component/registrationList";
  import PatientInfo from "./component/patientInfo";
  import ChineseDiagnosis from "./component/diagnosis";//中医诊断
  import WesternDiagnosis from "./component/diagnosis";//西医诊断
  import {mapState} from 'vuex';
    export default {
      name: "finalDiagnosis",
      components:{RegistrationList,PatientInfo,ChineseDiagnosis,WesternDiagnosis},
      data(){
        return{
          ifSeen:true,
          finalWesternDiagnosisItems:[],
          finalChineseDiagnosisItems:[],
          api:{
            listFirstDiagnosisByMedicalRecordId:"/doctor/homepage/listFirstDiagnosisByMedicalRecordId",
            listFinalDiagnosisByMedicalRecordId:"/doctor/diagnosis/listFinalDiagnosisByMedicalRecordId"
          }
        }
      },
      computed:{
        ...mapState("doctor",["patient"]),
        ...mapState("doctor",["medicalRecordState"]),
        ...mapState("doctor",["registration"]),
      },
      watch:{
        patient:{
          handler(){
            this.getDiagnosisList();
          }
        }
      },
      methods:{
        getDiagnosisList(){
          if(this.medicalRecordState==='已初诊'){
            this.privateGetDiagnosisList('初诊');
          }else {
            if(this.medicalRecordState==='未初诊') {
              alert('您还没初诊');
            }else {
              this.privateGetDiagnosisList('确诊');
            }
          }
        },
        selectPatient(){

        },
        privateGetDiagnosisList(type){
          let para = {};
          let reqApi='';
          if(type==='初诊'){
            reqApi=this.api.listFirstDiagnosisByMedicalRecordId;
          }else{
            reqApi=this.api.listFinalDiagnosisByMedicalRecordId;
          }
          para.medicalRecordId = this.registration.medicalRecordId;//得到病历号
          this.$get(reqApi, para).then(res => {
            console.log(res);
            if (res.status === 'OK') {
              if(res.data[0].disease.diseaseTypeId===472){//判断是中医疾病还是西医疾病 472为中医
                this.finalChineseDiagnosisItems = res.data;
              }else{
                this.finalWesternDiagnosisItems = res.data;
              }
              this.isBusy = false;
            } else {
              console.log("加载失败");
            }
          });
        }
      },

    }
</script>

<style scoped>

</style>
