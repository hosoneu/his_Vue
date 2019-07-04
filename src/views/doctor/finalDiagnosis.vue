<template>
  <div class="animated fadeIn" >
    <b-row>
      <b-col lg="12">
        <patient-info
          ref="patientInfo"
        ></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3">
        <!--  挂号列表-->
        <registration-list
          ref="registrationList"
          @selectPatient="selectPatient"
        >
        </registration-list>
      </b-col>
      <b-col lg="9">
        <b-card header="填写模块">

          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            填写模块
            <div class="card-header-actions">
              <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                  <b-button size="sm" :disabled="this.ifReadonly" @click="finalDiagnosisReset" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                <b-button size="sm" :disabled="this.ifReadonly" @click="finalDiagnosisSubmit" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
              </b-button-group>
            </div>
          </div>

          <b-tabs>
            <b-tab title="中医诊断" >
              <chinese-diagnosis
                ref="chineseDiagnosis"
                :type=0
                :diagnosis-items="finalChineseDiagnosisItems"
                :if-seen="ifSeen"
                :define-diagnosis-mark="'2'"
              >
              </chinese-diagnosis>
              <!--  体格检查physicalExamination-->
            </b-tab>
            <b-tab title="西医诊断" >
              <western-diagnosis
                ref="westernDiagnosis"
                :type=1
                :diagnosis-items="finalWesternDiagnosisItems"
                :if-seen="ifSeen"
                :define-diagnosis-mark="'2'"
              >
              </western-diagnosis>
            </b-tab>
            <b-tab title="已开检查">
              <history-examination1-list
                :type=0
              ></history-examination1-list>
            </b-tab>
            <b-tab title="已开检验">
              <history-examination2-list
                :type=1
              ></history-examination2-list>
            </b-tab>
            <b-tab title="辅助检查" >
              <b-row>
                <b-col md="1">
                </b-col>
                <b-col md="10 ">
                  <br>
                  <b-form-group
                    label="辅助检查"
                    label-for="assistantExamination"
                    :label-cols="2"
                    :horizontal="true">
                    <b-form-textarea  :readonly="this.ifReadonly" v-model="assistantExamination" id="assistantExamination" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
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
  import HistoryExamination1List from "./component/examinationList";
  import HistoryExamination2List from "./component/examinationList";
  import {mapState} from 'vuex';
    export default {
      name: "finalDiagnosis",
      components:{RegistrationList,PatientInfo,ChineseDiagnosis,WesternDiagnosis,HistoryExamination1List,HistoryExamination2List},
      data(){
        return{
          ifSeen:true,
          finalWesternDiagnosisItems:[],
          finalChineseDiagnosisItems:[],
          assistantExamination:'',
          ifReadonly:false,
          api:{
            listFirstDiagnosisByMedicalRecordId:"/doctor/homepage/listFirstDiagnosisByMedicalRecordId",
            listFinalDiagnosisByMedicalRecordId:"/doctor/diagnosis/listFinalDiagnosisByMedicalRecordId",
            insertFinalDiagnosis:"/doctor/diagnosis/insertFinalDiagnosis",//插入终诊数据
            insertAssistantExamination:"/doctor/diagnosis/insertAssistantExamination",//插入辅助检查结果
          }
        }
      },
      computed:{
        ...mapState("doctor",["patient"]),
        ...mapState("doctor",["medicalRecordState"]),
        ...mapState("doctor",["registration"]),
      },
      mounted:function () {
        this.getDiagnosisList();
      },
      watch:{
        patient:{
          handler(){
            this.getDiagnosisList();
          }
        },
      },
      methods:{
        getDiagnosisList(){
          if(this.medicalRecordState==='已初诊'){
            this.ifReadonly=false;
            this.privateGetDiagnosisList('初诊');
          }else {
            if(this.medicalRecordState==='未初诊') {
              // alert('您还没初诊，不能确诊');
              this.finalChineseDiagnosisItems=[];
              this.finalWesternDiagnosisItems=[];
            }else {
              this.ifReadonly=true;
              this.privateGetDiagnosisList('确诊');
            }
          }
        },
        privateGetDiagnosisList(type){//得到诊断列表
          let para = {};
          let reqApi='';
          if(type==='初诊'){//如果未确诊
            reqApi=this.api.listFirstDiagnosisByMedicalRecordId;
          }else{//如果已确诊
            reqApi=this.api.listFinalDiagnosisByMedicalRecordId;
          }
          para.medicalRecordId = this.registration.medicalRecordId;//得到病历号
          this.$get(reqApi, para).then(res => {
            console.log(res);
            if (res.status === 'OK') {
              if(res.data[0].disease.diseaseTypeId===472){//判断是中医疾病还是西医疾病 472为中医
                this.finalChineseDiagnosisItems = res.data;
                for(let i=0;i<this.finalChineseDiagnosisItems.length;i++){
                  this.finalChineseDiagnosisItems[i].diagnosisMark='2';
                }
                console.log("终诊信息为");
                console.log(this.finalChineseDiagnosisItems);
              }else{
                this.finalWesternDiagnosisItems = res.data;
                for(let i=0;i<this.finalWesternDiagnosisItems.length;i++){
                  this.finalWesternDiagnosisItems[i].diagnosisMark='2';
                }
                console.log("终诊信息为");
                console.log(this.finalWesternDiagnosisItems);
              }
              this.isBusy = false;
            } else {
              console.log("加载失败");
            }
          });
        },
        selectPatient(){//切换患者
          // do nothing
          // if(this.medicalRecordState==="未初诊"||this.medicalRecordState==="诊毕"){
          //     this.ifReadonly = true;
          // }else{
          //   this.ifReadonly = false;
          // }
        },
        finalDiagnosisReset(){//重置确诊信息
          if(this.medicalRecordState==='已初诊'){
            this.finalChineseDiagnosisItems=[];
            this.finalWesternDiagnosisItems=[];
          }else{
            if(this.medicalRecordState==='未初诊'){
              this.ifReadonly = true;
              console.log("您还没初诊，不能确诊");
            }else{
              console.log("已确诊");
            }
          }
        },
        finalDiagnosisSubmit(){//提交确诊信息
          if(this.finalChineseDiagnosisItems.length===0&&this.finalWesternDiagnosisItems.length===0){//判断是否有诊断信息
            alert("你不能提交");
          }else{
            //插入终诊结果
            let diagnosisItems = this.finalWesternDiagnosisItems.concat(this.finalChineseDiagnosisItems);
            this.$post(this.api.insertFinalDiagnosis,JSON.parse(JSON.stringify(diagnosisItems))).then(res=>{
              console.log(res);
              if(res.status === "OK"){
                console.log(res.data);
                this.$refs["registrationList"].getPatientList();
                this.$refs["patientInfo"].initPatient();
                alert(res.msg);
              }else{
                console.log("插入失败");
                alert(res.msg);
              }
            });
            //录入辅助检查结果
            let para = {};
            para.medicalRecordId = this.registration.medicalRecordId;//得到病历号
            para.assistantExamination = this.assistantExamination;
            if(!(this.assistantExamination==='')){
              this.$get(this.api.insertAssistantExamination,JSON.parse(JSON.stringify(para))).then(res=>{
                console.log(res);
                if(res.status === "OK"){
                  console.log(res.data);
                  console.log(res.message);
                }else{
                  console.log(res.message);
                }
              });
            }
          }
        },
      },

    }
</script>

<style scoped>

</style>
