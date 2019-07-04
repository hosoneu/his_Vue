<template>
  <b-row>
    <b-col lg="4">
      <patient-table
        :initial-fields="fields"
        :per-page="5"
        :tabs="tabs"
      ></patient-table>
    </b-col>
  </b-row>
</template>

<script>
  import PatientTable from "./component/patientTable";
    export default {
      name: "PersonalWorkload",
      components: {PatientTable},
      data: () => {
        return{
          tabs:[{
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
          }
          ],
          fields: [
            {key: 'id', label: 'id', sortable: true},
            {key: 'department_name', label: '姓名', sortable: true},
          ],
        }
      },
      methods:{
      }
    }
</script>

<style scoped>

</style>
