<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <patient-info v-bind:initial-user="selected_items"></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6">
        <patient-table @select_user="selectUser" v-bind:initial-fields="fields" v-bind:initial-items="items"></patient-table>
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
            fields: [
              {key: 'id', label: 'id'},
              {key: 'user_name', label: '姓名', sortable: true},
              {key: 'status', label:'状态', sortable: true},
            ],
            selected_items:{ status: "secondary", sex: "未选择", id: '未选择', user_name: '未选择', pay_way:'未选择'},
            items:[
              { status: "primary", sex: "男", id: '1111', user_name: '李小明', pay_way:'自费'},
              { status: "primary", sex: "男", id: '1112', user_name: '李小明', pay_way:'自费'},
              { status: "primary", sex: "男", id: '1113', user_name: '李小明', pay_way:'自费'},
              { status: "primary", sex: "男", id: '1114', user_name: '李小明', pay_way:'自费'},
              { status: "primary", sex: "男", id: '1115', user_name: '李小明', pay_way:'自费'},
            ]
          }
      },
      methods:{
        selectUser(key){
          console.log("called");
          console.log(key + " outer");
          this.selected_items = this.items[key];
        }
      }
    }
</script>

<style scoped>

</style>
