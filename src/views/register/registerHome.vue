<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <register-table
          :caption="'挂号信息'"
          :initial-fields="fields"
          :per-page="10"
          :table-data="items"
        ></register-table>
      </b-col>
      <b-col lg="9">
        <register-form

        >

        </register-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import RegisterTable from "./component/registerTable";
    import RegisterForm from "./component/registerForm";
    export default {
        name: "registerHome",
        components: {RegisterForm, RegisterTable},
        data: () => {
          return{
            fields:[
              {
                key: 'patient.patientName',
                sortable: true,
                label: '患者姓名'
              },
              {
                key: 'department.departmentName',
                sortable: true,
                label: '所挂科室'
              },
              {
                key: 'registrationLevel.registrationLevelName',
                sortable: true,
                label: '挂号级别'
              },
              {
                key: 'medicalRecordId',
                sortable: false,
                label: '病历号'
              },
              {
                key: 'registrationStatus',
                sortable: true,
                label: '挂号状态'
              },
            ],
            items: [],
          }
        },
        mounted: async function(){
          await this.getRegistrationList();
        },
        methods:{
          getRegistrationList(){
            console.log("请求挂号列表");
            this.$get('http://localhost:8080/hoso/registration/showRegistration').then((res)=> {
              alert(res.status);
              console.log(res.data);
              if(res.status === 'OK'){
                this.items = res.data;
                console.log(this.items);
              }else{
                console.log("加载挂号列表失败");
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
