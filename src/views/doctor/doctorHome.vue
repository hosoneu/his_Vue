<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <patient-info :initial-user="selected_items" ></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="4">
        <patient-table @select_user="selectUser" :is-busy="isBusy" :initial-fields="fields" :initial-items="items"></patient-table>
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
            isBusy: false,
            fields: [
              {key: 'id', label: 'id', sortable: true},
              {key: 'user_name', label: '姓名', sortable: true},
              {key: 'status', label:'状态', sortable: true},
            ],
            selected_items:{ status: "secondary", sex: "未选择", id: '未选择', user_name: '未选择', pay_way:'未选择'},
            items:[]
          }
      },
      mounted: function(){
        console.log("mounted");
        this.getPatientList(0);
      },
      methods:{
        selectUser(key){
          console.log("called");
          console.log(key + " outer");
          this.selected_items = this.items[key];
        },
        getPatientList(page){
          console.log("请求患者列表");
          this.$get('/getPatientList', {page:page}).then(res=>{
            console.log(res);
            if(res.code === true){
              this.items = res.data;
              this.isBusy = false;
            }else{
              console.log("加载失败");
            }
          });
        }
      }
    }
</script>

<style scoped>

</style>
