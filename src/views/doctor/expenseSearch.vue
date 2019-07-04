<template>
  <div class="animated fadeIn">
    <b-row>

      <b-col lg="12">
        <patient-info></patient-info>
      </b-col>
    </b-row>
    <b-row>

      <b-col lg="3">
        <!--  挂号列表-->
        <registration-list
          ref="registrationList"
          @selectPatient="selectPatient"
        >
        </registration-list>
      </b-col>
      <b-col lg="9">
        <b-card header="患者费用">
          <br>
          <b-row>
            <b-col md="1">

            </b-col>
            <b-col md="10">
              <b-table
                show-empty
                selectable
                select-mode="single"
                hover
                :items="expenseItemsList"
                :fields="expenseItemsFields"
                :busy="isBusy"
                @row-selected="selectDiagnosisItems">
              </b-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RegistrationList from "./component/registrationList";
  import PatientInfo from "./component/patientInfo";
  import {mapState} from "vuex";

  export default {
    name: "expenseSearch",
    components: {RegistrationList, PatientInfo},
    data() {
      return {
        expenseItemsList: [],
        expenseItemsFields: [
          {key: 'expenseItemsId', label: '标识号', sortable: true},
          {key: 'totalCost', label: '金额', sortable: true},
          {key: 'payStatus', label: '支付状态', sortable: true},
        ],
        api:{
          getExpenseItemsListApi:"/doctor/common/getPatientExpenseItems",
          getExpenseItemsListParams:{}
        },
      }
    },
    computed: {
      ...mapState("doctor", ["patient"]),
      ...mapState("doctor", ["registration"]),
      ...mapState("doctor",["medicalRecordState"])
    },
    watch:{
      patient:{
        handler(){
          if(this.medicalRecordState==="未选择"){
            this.expenseItemsList=[];
          }else{
            this.getExpenseItemsList();
          }
        }
      }
    },
    methods: {
      getExpenseItemsList(){
        this.api.getExpenseItemsListParams.medicalRecordId = this.registration.medicalRecordId;
        this.$get(this.api.getExpenseItemsListApi, this.api.getExpenseItemsListParams).then(res => {
          if(res.status==="OK"){
            // for(let i = 0 ; i<data.length;i++){}
            
            this.expenseItemsList = res.data;
            console.log(res.data);
          }else{
            console.log(res.msg);
          }

        });
      },
    },


  }
</script>

<style scoped>

</style>
