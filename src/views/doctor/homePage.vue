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
        <!--    病历模板-->
        <medical-record-template
          ref="medical-record-template-cite"
          @onCite="onCite"
        >

        </medical-record-template>

      </b-col>
      <b-col lg="9">
        <b-row>
          <b-col lg="12">
          <b-card header="基本信息" >
            <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
              填写模块
              <div class="card-header-actions">
                <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                  <b-button size="sm" @click="medicalRecordReset" :disabled="this.ifReadonly" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                  <b-button size="sm" @click="medicalRecordSave" :disabled="this.ifReadonly" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 存档</b-button>
                  <b-button size="sm" @click="medicalRecordSubmit" :disabled="this.ifReadonly"  class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
                </b-button-group>
              </div>
            </div>

            <b-modal ref="medical-record-template" size="md" @ok="onSave" centered title="存为模板">
              <!--  名称 -->
              <b-form-group
                label="模板名称"
                label-for="templateName"
                :label-cols="3"
                :horizontal="true">
                <b-form-input v-model="templateName" id="templateName" type="text" placeholder="请输入内容..."></b-form-input>
              </b-form-group>
              <!--  范围 -->
              <b-form-group
                label="适用范围"
                label-for="templateScope"
                :label-cols="3">
                <b-form-radio-group
                  id="templateScope"
                  v-model="templateScope"
                  :options="templateScopeOptions"
                ></b-form-radio-group>
              </b-form-group>
            </b-modal>

            <b-tabs >
              <!--主模块部分的分菜单栏-->
              <b-tab title = "病史内容">
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
                        <b-form-input :readonly="this.ifReadonly" v-model="medicalRecordHomePage.chiefComplaint" id="chiefComplaint" type="text" placeholder="请输入内容..."></b-form-input>
                      </b-form-group>
                      <!--  现病史presentHistory -->
                      <b-form-group
                        label="现病史"
                        label-for="presentHistory"
                        :label-cols="2"
                        :horizontal="true">
                        <b-form-textarea  :readonly="this.ifReadonly" v-model="medicalRecordHomePage.presentHistory" id="presentHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                      </b-form-group>
                      <!--  现病治疗情况presentTreatment-->
                      <b-form-group
                        label="现病治疗情况"
                        label-for="presentTreatment"
                        :label-cols="2"
                        :horizontal="true">
                        <b-form-textarea  :readonly="this.ifReadonly" v-model="medicalRecordHomePage.presentTreatment" id="presentTreatment" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                      </b-form-group>
                      <!--既往史pastHistory-->
                      <b-form-group
                        label="既往史"
                        label-for="pastHistory"
                        :label-cols="2"
                        :horizontal="true">
                        <b-form-textarea  :readonly="this.ifReadonly" v-model="medicalRecordHomePage.pastHistory" id="pastHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                      </b-form-group>
                      <!--  过敏史allergicHistory-->
                      <b-form-group
                        label="过敏史"
                        label-for="allergicHistory"
                        :label-cols="2"
                        :horizontal="true">
                        <b-form-textarea  :readonly="this.ifReadonly" v-model="medicalRecordHomePage.allergicHistory" id="allergicHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                      </b-form-group>
                      <!--  体格检查physicalExamination-->
                      <b-form-group
                        label="体格检查"
                        label-for="physicalExamination"
                        :label-cols="2"
                        :horizontal="true">
                        <b-form-textarea  :readonly="this.ifReadonly" v-model="medicalRecordHomePage.physicalExamination" id="physicalExamination" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                      </b-form-group>
                    </b-form>
                  </b-col>
                  <b-col md="1">

                  </b-col>
                </b-row>

              </b-tab>
              <b-tab title="中医诊断">
                <chinese-diagnosis
                  ref="chineseDiagnosis"
                  :type=0
                  :diagnosis-items="firstChineseDiagnosisItems"
                  :if-seen="ifSeen"
                  :define-diagnosis-mark="'1'"
                >
                </chinese-diagnosis>
                <!--  体格检查physicalExamination-->
              </b-tab>
              <b-tab title="西医诊断">
                <western-diagnosis
                  ref="westernDiagnosis"
                  :type=1
                  :diagnosis-items="firstWesternDiagnosisItems"
                  :if-seen="ifSeen"
                  :define-diagnosis-mark="'1'"
                >
                </western-diagnosis>
              </b-tab>

              <b-tab title="历史病历">
                <medical-record-history>
                </medical-record-history>
              </b-tab>

            </b-tabs>
          </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import PatientInfo from "./component/patientInfo";//患者信息
    import MedicalRecordTemplate from "./component/medicalRecordTemplate";//病历模板
    import ChineseDiagnosis from "./component/diagnosis";//中医诊断
    import WesternDiagnosis from "./component/diagnosis";//西医诊断
    import MedicalRecordHistory from "./component/medicalRecordHistory";//历史病历
    import RegistrationList from "./component/registrationList";//挂号列表
    import {mapState} from 'vuex';//得到全局变量
    export default {
      name: "homePage",
      components: {RegistrationList,MedicalRecordHistory, ChineseDiagnosis,WesternDiagnosis, MedicalRecordTemplate, PatientInfo,},
      data(){
          return{
            api:{
              insertMedicalRecordHomePageApi:"/doctor/homepage/insertMedicalRecordHomePage",//插入病历首页内容
              insertFirstDiagnosisApi:"/doctor/homepage/insertFirstDiagnosis",//插入初诊结果
              selectMedicalRecordHomePageApi:"/doctor/homepage/selectMedicalRecordHomePageByMedicalRecordId",//查询病历首页文字部分
              selectMedicalRecordHomePageParams:{},
              listFirstDiagnosisByMedicalRecordIdApi:"/doctor/homepage/listFirstDiagnosisByMedicalRecordId",//列出所有的初诊信息
              listFirstDiagnosisByMedicalRecordIdParams:{},
              insertMedicalRecordHomePageTemplateApi:"/doctor/homepage/insertMedicalRecordHomePageTemplate",//存为模板
            },
            ifReadonly:true,//默认为不只读（即可以录入病历首页信息）
            ifSeen:true,//默认为可见
            firstChineseDiagnosisItems:[],
            firstWesternDiagnosisItems:[],
            medicalRecordHomePage:{//提交到后台的病历首页对象
              medicalRecordHomePageId:-1,
              medicalRecordId:1,
              doctorId:1,
              chiefComplaint:'',
              presentHistory:'',
              presentTreatment:'',
              pastHistory:'',
              allergicHistory:'',
              physicalExamination:'',
              assistantExamination:'',
            },//传给后台的病历首页对象
            templateScope:'1',
            templateName:'',
            templateScopeOptions:[
              { text: '个人', value: '1' },
              { text: '科室', value: '2' },
              { text: '全院', value: '3' },
            ]
          }
      },
      computed:{
        ...mapState("doctor",["medicalRecord"]),//得到当前的病历内容 得到就诊状态 未选择 未初诊、已初诊、已终诊、诊毕
        ...mapState("doctor",["medicalRecordState"]),
        ...mapState("doctor",["doctor"]),
      },
      methods:{
        selectPatient(registration){//切换患者时需要更新当前的MedicalRecord的部分
          if(!(this.medicalRecordState==='未初诊')){//如果已初诊 查询病历首页的信息
            // this.inputDisabled=true;
            this.api.selectMedicalRecordHomePageParams.medicalRecordId=registration.medicalRecordId;
            this.$get(this.api.selectMedicalRecordHomePageApi,JSON.parse(JSON.stringify(this.api.selectMedicalRecordHomePageParams))).then(res=>{
              console.log(res);
              if(res.status === "OK"){
                this.medicalRecordHomePage = res.data;
                console.log(res.data);
              }else{
                console.log(res.message);
              }
            });
            this.api.listFirstDiagnosisByMedicalRecordIdParams.medicalRecordId=registration.medicalRecordId;
            this.$get(this.api.listFirstDiagnosisByMedicalRecordIdApi,JSON.parse(JSON.stringify(this.api.listFirstDiagnosisByMedicalRecordIdParams))).then(res=>{
              console.log(res);
              if(res.status === "OK"){
                if(res.data[0].diagnosisMark==='1'){//如果是中医疾病
                  this.firstChineseDiagnosisItems = res.data;//填充中医Items
                }else{//如果是西医疾病
                  this.firstWesternDiagnosisItems = res.data;//填充西医Items
                }
                console.log(res.data);
              }else{
                console.log(res.message);
              }
            });
            this.ifReadonly = true;//如果不是未初诊 则更改为只读
            this.ifSeen = false;//改为不可见
          }else{
            this.medicalRecordReset();//清空
            this.ifReadonly = false;//如果未初诊 则改为可编辑
            this.ifSeen = true;//改为可见
          }

        },
        medicalRecordSubmit(){
          let chineseDiagnosisItems = this.$refs["chineseDiagnosis"].diagnosisItems;
          let westernDiagnosisItems = this.$refs["westernDiagnosis"].diagnosisItems;
          if(chineseDiagnosisItems.length===0&&westernDiagnosisItems.length===0){//判断是否有诊断信息
            alert("您还没有诊断");
          }else{
            if(this.medicalRecordHomePage.chiefComplaint.trim()===''||this.medicalRecordHomePage.allergicHistory.trim()===''||this.medicalRecordHomePage.pastHistory.trim()===''||this.medicalRecordHomePage.physicalExamination.trim()===''||this.medicalRecordHomePage.presentHistory.trim()===''||this.medicalRecordHomePage.presentTreatment.trim()===''){
                alert("请填写完整病历首页");
            }else{
              this.$post(this.api.insertMedicalRecordHomePageApi,JSON.parse(JSON.stringify(this.medicalRecordHomePage))).then(res=>{
                console.log(res);
                if(res.status === "OK"){
                  console.log(res.data);
                }else{
                  console.log("插入失败");
                }
              });
              let diagnosisItems = chineseDiagnosisItems.concat(westernDiagnosisItems);
              this.$post(this.api.insertFirstDiagnosisApi,JSON.parse(JSON.stringify(diagnosisItems))).then(res=>{
                console.log(res);
                if(res.status === "OK"){
                  console.log(res.data);
                  console.log(res.message);
                  alert("病历首页录入成功");
                }else{
                  console.log(res.message);
                }
              });
            }
          }
          this.$refs['registrationList'].getPatientList();
        },
        onSave(){
          if(this.templateName===''){
            alert("请输入模板名称");
          }else{
            let medicalRecordHomePageTemplate = {};
            let diagnosisItems = this.firstChineseDiagnosisItems.concat(this.firstWesternDiagnosisItems);
            medicalRecordHomePageTemplate.doctorId = this.doctor.userId;
            medicalRecordHomePageTemplate.name=this.templateName;
            medicalRecordHomePageTemplate.scope=this.templateScope;
            medicalRecordHomePageTemplate.chiefComplaint = this.medicalRecordHomePage.chiefComplaint;
            medicalRecordHomePageTemplate.presentHistory = this.medicalRecordHomePage.presentHistory;
            medicalRecordHomePageTemplate.physicalExamination = this.medicalRecordHomePage.physicalExamination;
            medicalRecordHomePageTemplate.diagnosisTemplateList = diagnosisItems;
            this.$post(this.api.insertMedicalRecordHomePageTemplateApi,JSON.parse(JSON.stringify(medicalRecordHomePageTemplate))).then(res=>{
              console.log(res);
              if(res.status === "OK"){
                alert("插入成功");
                console.log(res.data);
              }else{
                alert("插入失败");
                console.log("插入失败");
              }
            });
          }
        },
        medicalRecordSave(){//存为模板
          this.$refs["medical-record-template"].show();
        },
        medicalRecordReset(){
          this.firstChineseDiagnosisItems=[];
          this.firstWesternDiagnosisItems=[];
          this.medicalRecordHomePage = {
            medicalRecordId:this.medicalRecord.medicalRecordId,
            doctorId:this.medicalRecord.doctorId,
            chiefComplaint:'',
            presentHistory:'',
            presentTreatment:'',
            pastHistory:'',
            allergicHistory:'',
            physicalExamination:'',
            assistantExamination:'',
          };
        },
        onCite(medicalRecordTemplateInfoItem){//引用模板
          if(this.medicalRecordState==="未初诊"){//可以引用
            this.medicalRecordHomePage.chiefComplaint=medicalRecordTemplateInfoItem.chiefComplaint;
            this.medicalRecordHomePage.presentHistory=medicalRecordTemplateInfoItem.presentHistory;
            this.medicalRecordHomePage.physicalExamination=medicalRecordTemplateInfoItem.physicalExamination;
            if(medicalRecordTemplateInfoItem.diagnosisTemplateList[0].disease.diseaseTypeId===472){//判断为中医疾病模板
              for(let i=0;i<medicalRecordTemplateInfoItem.diagnosisTemplateList.length;i++ ){
                let templateDiagnosisItem = {};
                templateDiagnosisItem.diseaseId = medicalRecordTemplateInfoItem.diagnosisTemplateList[i].disease.diseaseId;
                templateDiagnosisItem.medicalRecordId = this.medicalRecord.medicalRecordId;
                templateDiagnosisItem.mainDiagnosisMark = medicalRecordTemplateInfoItem.diagnosisTemplateList[i].mainDiagnosisMark;
                templateDiagnosisItem.suspectMark = medicalRecordTemplateInfoItem.diagnosisTemplateList[i].suspectMark;
                templateDiagnosisItem.disease = medicalRecordTemplateInfoItem.diagnosisTemplateList[i].disease;
                templateDiagnosisItem.onsetDate='';
                templateDiagnosisItem.diagnosisMark='1';//诊断标志：初诊1 终诊2
                this.firstChineseDiagnosisItems.push(templateDiagnosisItem);
              }
            }else{//判断为西医疾病模板
              for(let i=0;i<medicalRecordTemplateInfoItem.diagnosisTemplateList.length;i++ ){
                let templateDiagnosisItem = {};
                templateDiagnosisItem.diseaseId = medicalRecordTemplateInfoItem.diagnosisTemplateList[i].disease.diseaseId;
                templateDiagnosisItem.medicalRecordId = this.medicalRecord.medicalRecordId;
                templateDiagnosisItem.mainDiagnosisMark = medicalRecordTemplateInfoItem.diagnosisTemplateList[i].mainDiagnosisMark;
                templateDiagnosisItem.suspectMark = medicalRecordTemplateInfoItem.diagnosisTemplateList[i].suspectMark;
                templateDiagnosisItem.disease = medicalRecordTemplateInfoItem.diagnosisTemplateList[i].disease;
                templateDiagnosisItem.onsetDate='';
                templateDiagnosisItem.diagnosisMark='1';//诊断标志：初诊1 终诊2
                this.firstWesternDiagnosisItems.push(templateDiagnosisItem);
              }
            }

          }else{
            alert("患者已经初诊了喔！");
          }
        },
      }
    }
</script>

<style scoped>

</style>
