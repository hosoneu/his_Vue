<template>
  <div class="animated fadeIn">
    <b-row>

      <b-col lg="12">
        <patient-info></patient-info>
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

        <b-card header="病历详情">
          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            病历详情
            <div class="card-header-actions">
              <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                <b-button size="sm" @click="treatmentOver" :disabled="this.ifReadonly" variant="success"><i class="fa fa-check"></i> 诊毕</b-button>

              </b-button-group>
            </div>
          </div>

          <b-tabs>
            <b-tab title="病历描述">
              <br>
              <b-row>
                <b-col md="1"></b-col>
                <b-col md="10">
                  <b-form>
                    <!--  主诉chiefComplaint -->
                    <b-form-group
                      label="主诉"
                      label-for="chiefComplaint"
                      :label-cols="2"
                      :horizontal="true">
                      <b-form-input disabled v-model="medicalRecordHomePage.chiefComplaint" id="chiefComplaint" type="text" placeholder="请输入内容..."></b-form-input>
                    </b-form-group>
                    <!--  现病史presentHistory -->
                    <b-form-group
                      label="现病史"
                      label-for="presentHistory"
                      :label-cols="2"
                      :horizontal="true">
                      <b-form-textarea disabled v-model="medicalRecordHomePage.presentHistory" id="presentHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                    </b-form-group>
                    <!--  现病治疗情况presentTreatment-->
                    <b-form-group
                      label="现病治疗情况"
                      label-for="presentTreatment"
                      :label-cols="2"
                      :horizontal="true">
                      <b-form-textarea disabled v-model="medicalRecordHomePage.presentTreatment" id="presentTreatment" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                    </b-form-group>
                    <!--既往史pastHistory-->
                    <b-form-group
                      label="既往史"
                      label-for="pastHistory"
                      :label-cols="2"
                      :horizontal="true">
                      <b-form-textarea disabled v-model="medicalRecordHomePage.pastHistory" id="pastHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                    </b-form-group>
                    <!--  过敏史allergicHistory-->
                    <b-form-group
                      label="过敏史"
                      label-for="allergicHistory"
                      :label-cols="2"
                      :horizontal="true">
                      <b-form-textarea disabled v-model="medicalRecordHomePage.allergicHistory" id="allergicHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                    </b-form-group>
                    <!--  体格检查physicalExamination-->
                    <b-form-group
                      label="体格检查"
                      label-for="physicalExamination"
                      :label-cols="2"
                      :horizontal="true">
                      <b-form-textarea disabled v-model="medicalRecordHomePage.physicalExamination" id="physicalExamination" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                    </b-form-group>

                    <b-form-group
                      label="辅助检查"
                      label-for="assistantExamination"
                      :label-cols="2"
                      :horizontal="true">
                      <b-form-textarea disabled v-model="medicalRecordHomePage.assistantExamination" id="assistantExamination" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                    </b-form-group>
                  </b-form>
                </b-col>
                <b-col md="1">
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="诊断信息">
              <b-card header="初诊信息">
                <b-table
                  show-empty
                  stacked="md"
                  hover
                  :items="firstDiagnosis"
                  :fields="diagnosisFields"
                >
                  <template slot="mainDiagnosisMark" slot-scope="row">
                    {{transformMainDiagnosisMark(row.item)}}
                  </template>

                  <template slot="suspectMark" slot-scope="row">
                    {{transformSuspectMark(row.item)}}
                  </template>

                  <template slot="onsetDate" slot-scope="row">
                    {{transformOnsetDate(row.item)}}
                  </template>
                </b-table>
              </b-card>
              <b-card header="终诊信息">
                <b-table
                  show-empty
                  stacked="md"
                  hover
                  :items="finalDiagnosis"
                  :fields="diagnosisFields"
                >
                  <template slot="mainDiagnosisMark" slot-scope="row">
                    {{transformMainDiagnosisMark(row.item)}}
                  </template>

                  <template slot="suspectMark" slot-scope="row">
                    {{transformSuspectMark(row.item)}}
                  </template>

                  <template slot="onsetDate" slot-scope="row">
                    {{transformOnsetDate(row.item)}}
                  </template>
                </b-table>
              </b-card>

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
  import {mapState} from "vuex";
    export default {
      name: "treatmentOver",
      components:{RegistrationList,PatientInfo},
      data(){
        return{
          medicalRecordHomePage:{},
          firstDiagnosis:[],//初诊信息
          finalDiagnosis:[],//终诊信息
          api:{
            selectMedicalRecordHomePageByMedicalRecordIdApi:"/doctor/homepage/selectMedicalRecordHomePageByMedicalRecordId",
            selectMedicalRecordHomePageByMedicalRecordIdParams:{},
            listFirstDiagnosisByMedicalRecordIdApi:"/doctor/homepage/listFirstDiagnosisByMedicalRecordId",
            listFirstDiagnosisByMedicalRecordIdParams:{},
            listFinalDiagnosisByMedicalRecordIdApi:"/doctor/diagnosis/listFinalDiagnosisByMedicalRecordId",
            listFinalDiagnosisByMedicalRecordIdParams:{},
            treatmentOverApi:"/doctor/diagnosis/treatmentOver",
            treatmentOverParams:{}
          },
          diagnosisFields:[
            {key: 'disease.diseaseIcd', label: 'ICD编码', sortable: true},
            {key: 'disease.diseaseName', label: '疾病名称', sortable: true},
            {key: 'mainDiagnosisMark', label:'主诊', sortable: true},
            {key: 'suspectMark', label:'疑似', sortable: true},
            {key: 'onsetDate', label:'发病日期', sortable: true},
          ],
          ifReadonly:true,
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
            this.getMedicalHomePage();
          }
        }
      },
      methods:{
        treatmentOver(){//诊毕
          this.api.treatmentOverParams.medicalRecordId = this.registration.medicalRecordId;
          this.$get(this.api.treatmentOverApi, this.api.treatmentOverParams).then(res => {
            if(res.status==="OK"){
              alert(res.msg);
              this.$refs["registrationList"].getRegistrationList();
            }else{
              alert(res.msg);
            }
          });
        },
        transformOnsetDate(item){//得到发病日期
          if(JSON.parse(JSON.stringify(item.onsetDate))==''||item.onsetDate===null){
            return '';
          }else{
            return item.onsetDate.split("T")[0];
          }
        },
        transformMainDiagnosisMark(item){//得到主诊标志
          if(item.mainDiagnosisMark==='1'){
            return '否';
          }else{
            return '是';
          }
        },
        transformSuspectMark(item){//得到疑似标志
          if(item.suspectMark==='1'){
            return '否';
          }else{
            return '是';
          }
        },
        getMedicalHomePage(){
          if(this.medicalRecordState==="未初诊"){
            this.medicalRecordHomePage = {};
            this.firstDiagnosis = [];
            this.finalDiagnosis = [];
            this.ifReadonly = true;
          }else{
            if(this.medicalRecordState==="诊毕"){
              this.ifReadonly = true;
            }else{
              this.ifReadonly = false;
            }
          this.api.selectMedicalRecordHomePageByMedicalRecordIdParams.medicalRecordId = this.registration.medicalRecordId;
          this.api.listFirstDiagnosisByMedicalRecordIdParams.medicalRecordId = this.registration.medicalRecordId;
          this.api.listFinalDiagnosisByMedicalRecordIdParams.medicalRecordId = this.registration.medicalRecordId;
          this.$get(this.api.selectMedicalRecordHomePageByMedicalRecordIdApi, this.api.selectMedicalRecordHomePageByMedicalRecordIdParams).then(res => {
            if(res.status==="OK") {
              this.medicalRecordHomePage = res.data;
              this.$get(this.api.listFirstDiagnosisByMedicalRecordIdApi, this.api.listFirstDiagnosisByMedicalRecordIdParams).then(ress => {
                if (ress.status === "OK") {
                  this.firstDiagnosis = ress.data;
                  this.$get(this.api.listFinalDiagnosisByMedicalRecordIdApi, this.api.listFinalDiagnosisByMedicalRecordIdParams).then(resss =>{
                    if (resss.status === "OK") {
                      this.finalDiagnosis = resss.data;
                    }else{
                      console.log(resss.msg);
                    }
                  });
                } else {
                  console.log(ress.msg);
                }
                console.log(res.data);
              });
            }
            else{
              console.log(res.msg);
            }
          });
          }
        }
      }
    }
</script>

<style scoped>

</style>
