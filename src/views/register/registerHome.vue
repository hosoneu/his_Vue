<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <RegisterTable
          :caption="'挂号信息'"
          :initial-fields="fields"
          :per-page="10"
          :table-data="items"
          @withdraw="withdraw"
        ></RegisterTable>
      </b-col>
      <b-col lg="9">
        <RegisterForm
          @refresh="refresh"
          :department-list="departmentList"
          :doctor-list="doctorList"
          :patient-list="patientList"
        >

        </RegisterForm>
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
                key: 'medicalRecord.medicalRecordId',
                sortable: true,
                label: '病历号'
              },
              {
                key: 'registrationStatus',
                sortable: true,
                label: '挂号状态'
              },
            ],
            //items一般都是刚创建vue时接收的主列表 这里是挂号列表registrationList
            items: [],
            departmentList: [],
            doctorList: [],
            patientList:[],
          }
        },
        mounted: async function(){
          // this.$store.commit('common/set_curr_user_type', 'register');
          await this.getRegistrationList();
          await this.getDepartmentList();
          await this.getDoctorList();
          await this.getPatientList();
        },
        methods:{
          getDepartmentList(){
            console.log("请求科室列表");
            this.$get('department/getAllDepartmentWithCategory').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.departmentList = res.data;
                // return  res.data;
              }else{
                console.log("加载科室列表失败");
              }
            })
          },
          getDoctorList(){
            console.log("请求医生列表");
            this.$get('user/getUserByRole', {roleId: 1}).then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.doctorList = res.data;
                // return res.data;
              }else{
                console.log("加载医生列表失败");
              }
            })
          },
          getRegistrationList(){
            console.log("请求挂号列表");
            this.$get('registration/showRegistration').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.items = res.data;
                console.log(this.items);
              }else{
                console.log("加载挂号列表失败");
              }
            })
          },
          getPatientList(){
            this.$get('registration/getAllPatient').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                let that = this;
                this.patientList = res.data;
                this.patientList.forEach(function (patient) {
                  patient.patientBirth = that.$moment(patient.patientBirth).format("YYYY-MM-DD");
                });
              }else{
                console.log("加载挂号列表失败");
              }
            })
          },
          withdraw(item){
            this.$get('registration/withdraw', {"expenseItemsId": item.expenseItems.expenseItemsId, "userId": this.$store.state.register.cashier.userId}).then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                alert("退号成功！");
                this.refresh();
              }else{
                console.log("加载挂号列表失败");
              }
            })
          },
          //刷新左侧挂号信息表格
          refresh(){
            this.getRegistrationList();
          },
        }
    }
</script>

<style scoped>

</style>
