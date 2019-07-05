<template>
  <div class="animated fadeIn">
      <b-col sm="12">
        <b-card header="病历详情">
          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            病历详情
          </div>

          <b-tabs>
            <b-tab title="病历描述">
              <br>
              <b-row>
                <b-col sm="1"></b-col>
                <b-col sm="10">
                  <b-form>
                    <!--  主诉chiefComplaint -->
                    <b-form-group
                      label="主诉"
                      label-for="chiefComplaint"
                      :label-cols="2"
                      :horizontal="true">
                      <p>{{medicalRecordHomePage.chiefComplaint}}</p>
                    </b-form-group>
                    <!--  现病史presentHistory -->
                    <b-form-group
                      label="现病史"
                      label-for="presentHistory"
                      :label-cols="2"
                      :horizontal="true">
                      <p id="presentHistory"  >{{medicalRecordHomePage.presentHistory}}</p>
                    </b-form-group>
                    <!--  现病治疗情况presentTreatment-->
                    <b-form-group
                      label="现病治疗情况"
                      label-for="presentTreatment"
                      :label-cols="2"
                      :horizontal="true">
                      <p id="presentTreatment">{{medicalRecordHomePage.presentTreatment}}</p>
                    </b-form-group>
                    <!--既往史pastHistory-->
                    <b-form-group
                      label="既往史"
                      label-for="pastHistory"
                      :label-cols="2"
                      :horizontal="true">
                      <p id="pastHistory"  >{{medicalRecordHomePage.pastHistory}}</p>
                    </b-form-group>
                    <!--  过敏史allergicHistory-->
                    <b-form-group
                      label="过敏史"
                      label-for="allergicHistory"
                      :label-cols="2"
                      :horizontal="true">
                      <p id="allergicHistory"  >{{medicalRecordHomePage.allergicHistory}}</p>
                    </b-form-group>
                    <!--  体格检查physicalExamination-->
                    <b-form-group
                      label="体格检查"
                      label-for="physicalExamination"
                      :label-cols="2"
                      :horizontal="true">
                      <p id="physicalExamination"  >{{medicalRecordHomePage.physicalExamination}}</p>
                    </b-form-group>

                    <b-form-group
                      label="辅助检查"
                      label-for="assistantExamination"
                      :label-cols="2"
                      :horizontal="true">
                      <p id="assistantExamination" >{{medicalRecordHomePage.assistantExamination}}</p>
                    </b-form-group>
                  </b-form>
                </b-col>
                <b-col sm="1">
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="诊断信息">
              <b-card header="初诊信息">
                <b-table
                  show-empty
                  stacked="sm"
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
                  stacked="sm"
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
  </div>
</template>

<script>
    export default {
      name: "medicalRecord",
      props:{
        medicalRecordId:{
          type:Number,
          default:()=>{return 0}
        }
      },
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
        }
      },
      mounted:function () {
        this.getMedicalHomePage();
      },
      methods:{
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
          this.api.selectMedicalRecordHomePageByMedicalRecordIdParams.medicalRecordId = this.medicalRecordId;
          this.api.listFirstDiagnosisByMedicalRecordIdParams.medicalRecordId = this.medicalRecordId;
          this.api.listFinalDiagnosisByMedicalRecordIdParams.medicalRecordId = this.medicalRecordId;
          this.$get(this.api.selectMedicalRecordHomePageByMedicalRecordIdApi, this.api.selectMedicalRecordHomePageByMedicalRecordIdParams).then(res => {
            if(res.status==="OK") {
              console.log("打印病历");
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
      },
      watch:{
        medicalRecordId:{
          handler(){
            this.getMedicalHomePage()
          }
        }
      },
    }
</script>

<style scoped>

</style>
