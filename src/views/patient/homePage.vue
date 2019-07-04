<template>
  <div>
<!--    <b-form-input v-model="inputMedicalRecordId" id="chiefComplaint" type="text" placeholder="请输入内容..."></b-form-input>-->
<!--    <b-button size="sm" @click="researchMedicalRecord" class="d-sm-down-none" variant="success">查询</b-button>-->
    <expense-items-list
      :medical-record-id=3
    >
    </expense-items-list>
    <medical-record-info
      :medical-record-id=3
    >
    </medical-record-info>
  </div>

</template>

<script>
  import ExpenseItemsList from "./component/expenseItems";
  import MedicalRecordInfo from "./component/medicalRecord";
    export default {
      name: "homePage",
      components:{MedicalRecordInfo, ExpenseItemsList},
      data(){
        return {
          medicalRecordId:0,
          inputMedicalRecordId:0,
        }
      },
      methods:{
        // researchMedicalRecord(){
        //   this.medicalRecordId = JSON.parse(JSON.stringify(this.inputMedicalRecordId));
        // }
      }
    }
</script>

<style scoped>

</style>
