<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <patient-info :initial-patient="selected_patient_items" ></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3">
        <patient-table
          @select_patient="selectPatient"
          :fields="patientFields"
          :per-page="5"
          :tabs="tabs"
        ></patient-table>

        <medical-record-template
          :fields="medicalRecordTemplateFields"
          :per-page="5"
          :tabs="medicalRecordTemplateTabs"
        ></medical-record-template>

        <b-card header="历史病历" >
        </b-card>
        <b-card header="常用诊断">
        </b-card>
      </b-col>
      <b-col lg="9">
        <b-row>
          <b-col lg="12">
          <b-card header="基本信息">
            <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
              填写模块
              <div class="card-header-actions">
                <b-button-group class="pull-right"><!-- 此处为清空暂存提交按钮 -->
                  <b-button size="sm" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                  <b-button size="sm" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 暂存</b-button>
                  <b-button size="sm" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
                </b-button-group>
              </div>
            </div>
            <b-tabs>
              <b-tab title = "病史内容">
                <!--  主诉chiefComplaint -->
                <b-form-group
                  label="主诉"
                  label-for="chiefComplaint"
                  :label-cols="1"
                  :horizontal="true">
                  <b-form-input id="chiefComplaint" type="text" placeholder="请输入内容..."></b-form-input>
                </b-form-group>
                <!--  现病史presentHistory -->
                <b-form-group
                  label="现病史"
                  label-for="presentHistory"
                  :label-cols="1"
                  :horizontal="true">
                  <b-form-textarea id="presentHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                </b-form-group>
                <!--  现病治疗情况presentTreatment-->
                <b-form-group
                  label="现病治疗情况"
                  label-for="presentTreatment"
                  :label-cols="1"
                  :horizontal="true">
                  <b-form-textarea id="presentTreatment" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                </b-form-group>
                <!--既往史pastHistory-->
                <b-form-group
                  label="既往史"
                  label-for="pastHistory"
                  :label-cols="1"
                  :horizontal="true">
                  <b-form-textarea id="pastHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                </b-form-group>
                <!--  过敏史allergicHistory-->
                <b-form-group
                  label="过敏史"
                  label-for="allergicHistory"
                  :label-cols="1"
                  :horizontal="true">
                  <b-form-textarea id="allergicHistory" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                </b-form-group>
                <!--  体格检查physicalExamination-->
                <b-form-group
                  label="体格检查"
                  label-for="physicalExamination"
                  :label-cols="1"
                  :horizontal="true">
                  <b-form-textarea id="physicalExamination" placeholder="请输入内容..." rows="3" ></b-form-textarea>
                </b-form-group>
              </b-tab>
              <b-tab title="评估诊断">

                <diagnosis
                  :tabs="tabs"
                >
                </diagnosis>
                <!--  体格检查physicalExamination-->
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
    import PatientTable from "./component/patientTable";
    import PatientInfo from "./component/patientInfo";
    import MedicalRecordTemplate from "./component/medicalRecordTemplate";
    import Diagnosis from "./component/diagnosis";
    export default {
      name: "doctorHome",
      components: {Diagnosis, MedicalRecordTemplate, PatientInfo, PatientTable},
      data: () => {
          return{
            tabs:[{//tabs定义挂号列表的状态是个人还是科室的挂号列表
              title:"个人",
              getPatientApi:"getPatientList",
              countPatientApi:"countPatientList",
              getPatientParams:{},
              countPatientParams:{}
              },{
              title:"科室",
              getPatientApi:"getPatientList",
              countPatientApi:"countPatientList",
              getPatientParams:{},
              countPatientParams:{}
            }],
            medicalRecordTemplateTabs:[{
              title:"个人",
              getMedicalRecordTemplateApi:"getMedicalRecordTemplateList",
              countMedicalRecordTemplateApi:"countMedicalRecordTemplateList",
              getMedicalRecordTemplateParams:{},
              countMedicalRecordTemplateParams:{}
            },{
              title:"科室",
              getMedicalRecordTemplateApi:"getMedicalRecordTemplateList",
              countMedicalRecordTemplateApi:"countMedicalRecordTemplateList",
              getMedicalRecordTemplateParams:{},
              countMedicalRecordTemplateParams:{}
            }],
            patientFields: [
              {key: 'medical_record_id', label: '病历号', sortable: true},
              {key: 'patient_name', label: '姓名', sortable: true},
              {key: 'diagnosis_status', label:'状态', sortable: true},
            ],
            medicalRecordTemplateFields: [
              {key: 'medical_record_template_id', label: '模板编号', sortable: true},
              {key: 'medical_record_template_name', label: '模板名称', sortable: true},
            ],

            selected_patient_items:{ diagnosis_status: "未知", patient_sex: "未选择", medical_record_id: '未选择', patient_name: '未选择', pay_way:'未选择'},
          }
      },
      methods:{
        selectPatient(patient){
          this.selected_patient_items = JSON.parse(JSON.stringify(patient));
        },
      }
    }
</script>

<style scoped>

</style>
