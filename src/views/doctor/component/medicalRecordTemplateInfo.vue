<template>
  <div>
    <b-card md="10" >
      <!--  主诉chiefComplaint -->
      <b-form-group
        label="模板名称"
        label-for="name"
        :label-cols="3">
        <label id="name">{{medicalRecordTemplateInfoItem.name}}</label>
      </b-form-group>

      <!--  主诉chiefComplaint -->
      <b-form-group
        label="主诉"
        label-for="chiefComplaint"
        :label-cols="3">
        <label id="chiefComplaint">{{medicalRecordTemplateInfoItem.chiefComplaint}}</label>
      </b-form-group>

      <!--  现病史presentHistory -->
      <b-form-group
        label="现病史"
        label-for="presentHistory"
        :label-cols="3"
        :horizontal="true">
        <label id="presentHistory">{{medicalRecordTemplateInfoItem.presentHistory}}</label>

      </b-form-group>

      <!--  体格检查physicalExamination-->
      <b-form-group
        label="体格检查"
        label-for="physicalExamination"
        :label-cols="3"
        :horizontal="true">
        <label id="physicalExamination">{{medicalRecordTemplateInfoItem.physicalExamination}}</label>
      </b-form-group>
    </b-card>
    <b-card md="10" >
      <b-table
        show-empty
        hover
        stacked="md"
        :items="medicalRecordTemplateInfoItem.diagnosisTemplateList"
        :fields="diagnosisFields"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
      >
      </b-table>
    </b-card>
  </div>

</template>

<script>
    export default {
        name: "medicalRecordTemplateInfo",
      props:{
        medicalRecordTemplateInfoItem:{//请求一个item包含疾病列表
          type:Object,
          default:()=>{return {}},
        },
      },
      data(){
          return {
            total:5,
            perPage: 5,
            pageOptions: [5, 10, 15],
            currentPage:1,// currentPage:1 表示当前页码为1
            sortBy: null,
            sortDesc: false,
            sortDirection: 'asc',
            diagnosisFields:[
              {key: 'disease.diseaseCode', label:'疾病代码', sortable: true},
              {key: 'disease.diseaseIcd', label: '疾病ICD', sortable: true},
              {key: 'disease.diseaseName', label: '疾病名', sortable: true},
            ]
          }
      },
    }
</script>

<style scoped>

</style>
