<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <RegisterTable
          :caption="'挂号信息'"
          :initial-fields="registrationFields"
          :per-page="10"
          :table-data="registrationList"
        ></RegisterTable>
      </b-col>
      <b-col lg="9">
        <ChargeTable
          :caption="'费用项目信息'"
          :initial-fields="expenseItemsFields"
          :per-page="10"
          :expense-items-list-for-patient="expenseItemsListForPatient"
        >
        </ChargeTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import RegisterTable from "./component/registerTable";
    import ChargeTable from "./component/chargeTable";
    export default {
        name: "ChargeHome",
        components:{RegisterTable,ChargeTable},
        data: () => {
          return{
            registrationFields:[
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
            expenseItemsFields: [
              //是药品就显示药品名 是非药品就显示非药品名  如何实现？ 插槽？
              {
                key: 'registrationStatus',
                sortable: true,
                label: '挂号状态'
              },
            ],
            registrationList: [],
            expenseItemsList: [],
            expenseItemsListForPatient: [],
          }
        },
        mounted: async function(){
          await this.getRegistrationList();
          await this.getExpenseItemsList();
        },
        methods:{
          getRegistrationList(){
            console.log("请求挂号列表");
            this.$get('http://localhost:8080/hoso/registration/showRegistration').then((res)=> {
              if(res.status === 'OK'){
                this.registrationList = res.data;
              }else{
                console.log("加载挂号列表失败");
              }
            })
          },
          getExpenseItemsList(){
            this.$get('http://localhost:8080/hoso/registration/getAllExpenseItems').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.expenseItemsList = res.data;
              }else{
                console.log("加载挂号列表失败");
              }
            })
          },
        }
    }
</script>

<style scoped>

</style>
