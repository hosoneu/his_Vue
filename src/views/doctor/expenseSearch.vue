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
                <template slot="payStatus" slot-scope="row">
                  {{transformPayStatus(row.item)}}
                </template>
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
          {key: 'name', label: '标识号', sortable: true},
          {key: 'quantity', label: '开立数量', sortable: true},
          {key: 'actualQuantity', label: '实际数量', sortable: true},
          {key: 'price', label: '单价', sortable: true},
          {key: 'totalCost', label: '总计', sortable: true},
          {key: 'payStatus', label: '支付状态', sortable: true},
          {key: 'expenseTypeName', label: '费用类型', sortable: true},
          {key: 'type', label: '来源', sortable: true},
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
      transformPayStatus(item){
        if(item.payStatus=="1"){
          return "未缴费";
          // 1 未缴费 2 已缴费 3 退费 4 无效 5 已付费但无效
        }else if(item.payStatus=="2"){
          return "已缴费";
        }else if(item.payStatus=="3"){
          return "已退费";
        }else if(item.payStatus=="5"){
          return "已付费但已废除";
        }else{
          return "无效";
        }

      },
      getExpenseItemsList(){
        this.api.getExpenseItemsListParams.medicalRecordId = this.registration.medicalRecordId;
        this.expenseItemsList = [];
        this.$get(this.api.getExpenseItemsListApi, this.api.getExpenseItemsListParams).then(res => {
          if(res.status==="OK"){
            console.log("开始打印收费列表");
            console.log(res.data);
            for(let i = 0 ; i<res.data.length;i++){
              let expenseItems = {};
              expenseItems.totalCost =  res.data[i].totalCost;
              expenseItems.payStatus =  res.data[i].payStatus;
              expenseItems.expenseTypeName = res.data[i].expenseType.expenseTypeName;
              console.log(res.data[i].drugs===null);
              if(!(res.data[i].drugs===null)){//药品
                expenseItems.name=res.data[i].drugs.drugsName;
                expenseItems.actualQuantity = res.data[i].prescriptionItems.actualQuantity;
                expenseItems.quantity = res.data[i].prescriptionItems.quantity;
                expenseItems.type = "处方药品";
              }else if(!(res.data[i].exDrugs==null)){//检查检验药品
                expenseItems.name=res.data[i].exDrugs.drugsName;
                expenseItems.actualQuantity = res.data[i].examinationDrugsItems.actualQuantity;
                expenseItems.quantity = res.data[i].examinationDrugsItems.quantity;
                expenseItems.type = "检查检验药品";
              }else if(!(res.data[i].fmedicalItems===null)){//非药品
                expenseItems.name=res.data[i].fmedicalItems.fmedicalItemsName;
                expenseItems.actualQuantity = res.data[i].treatmentItems.actualQuantity;
                expenseItems.quantity = res.data[i].treatmentItems.quantity;
                expenseItems.type = "处置项目";
              }else{//检查检验药品
                expenseItems.name=res.data[i].exFmedicalItems.fmedicalItemsName;
                expenseItems.actualQuantity = res.data[i].examinationFmedicalItems.actualQuantity;
                expenseItems.quantity = res.data[i].examinationFmedicalItems.quantity;
                expenseItems.type = "检查检验项目";
              }
              expenseItems.price = expenseItems.totalCost/expenseItems.actualQuantity;
              this.expenseItemsList.push(JSON.parse(JSON.stringify(expenseItems)));
            }
            // this.expenseItemsList = res.data;
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
