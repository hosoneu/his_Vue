<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <patient-info :initial-user="selected_items" ></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="4">
        <patient-table
          @select_user="selectUser"
          :initial-fields="fields"
          :per-page="5"
          :getPatientApi="getPatientAPI"
          :countPatientApi="countPatientAPI"
        ></patient-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import PatientTable from "./patientTable";
    import PatientInfo from "./patientInfo";
    export default {
      name: "doctorHome",
      components: {PatientInfo, PatientTable},
      data: () => {
          return{
            getPatientAPI:"",
            countPatientAPI:"",
            fields: [
              {key: 'id', label: 'id', sortable: true},
              {key: 'user_name', label: '姓名', sortable: true},
              {key: 'status', label:'状态', sortable: true},
            ],
            selected_items:{ status: "secondary", sex: "未选择", id: '未选择', user_name: '未选择', pay_way:'未选择'},
          }
      },
      methods:{
        selectUser(user){
          this.selected_items = JSON.parse(JSON.stringify(user));
        },
      }
    }
</script>

<style scoped>

</style>
