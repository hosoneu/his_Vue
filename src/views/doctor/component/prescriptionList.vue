<template>
  <div class="my-1">
    <b-card>
      <b-row>
        <b-col md="1">

        </b-col>
        <b-col md="10">
          <!-- User Interface controls -->
          <b-row>
            <b-col md="4">
              <b-input-group>
                <b-form-input
                  v-model="filter"
                  placeholder="请输入..."
                  size="md"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    :disabled="!filter"
                    @click="filter = ''"
                    size="md"
                  >
                    清空
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col md="3">
              <b-form-select
                v-model="perPage"
                :options="pageOptions"
                size="md"
              ></b-form-select>
            </b-col>
            <b-col md="5">
              <b-button-group class="pull-right">
                <!--检索药品-->
                <b-button :disabled="ifReadonly" id="cancelButton" @click="cancelPrescriptionItem" size="md" variant="outline-dark">废除
                </b-button>
              </b-button-group>

            </b-col>
          </b-row>
          <br>
          <!-- Main table element -->
          <b-table
            selectable
            select-mode="single"
            show-empty
            hover
            stacked="md"
            :aria-busy="isBusy"
            :items="prescriptionItems"
            :fields="prescriptionFields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            @row-selected="selectPrescription">
            <template slot="sum" slot-scope="row">
              {{prescriptionSum(row.item)+'元'}}
            </template>

            <template slot="validStatus" slot-scope="row">
              {{row.value==='1'?'有效':'无效'}}
            </template>

            <template slot="submitTime" slot-scope="row">
              {{transformSubmitTime(row.item)}}
            </template>

          </b-table>
          <!--页码-->
          <b-row>
            <b-col md="12" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="total"
                :per-page="perPage"
                class="my-0"
                size="sm"
                align="center"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

    </b-card>
    <br>
    <b-row>
      <b-col md="1"></b-col>
      <b-col md="10">
        <prescription-info
          :prescription-items-list="this.selectedPrescription.prescriptionItemsList"
        >
        </prescription-info>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import PrescriptionInfo from "./prescriptionItemsTable";
  import {mapState} from "vuex";
  export default {
    name: "prescriptionList",
    components: {PrescriptionInfo},
    //  该组件用于实现展示处置单
    props: {
      type: {
        type: Number,
        default: () => {
          return 0
        },
        ifReadonly:{
          type:Boolean,
          default:()=>{return true}
        }
      },
    },
    computed:{
      ...mapState("doctor",["patient"]),
      ...mapState("doctor",["registration"]),
      ...mapState("doctor",["medicalRecordState"]),
    },
    mounted: function(){//挂载之后才开始填充数据
      console.log("mounted");
      this.getHistoryPrescription();
      console.log("await this.getHistoryPrescription");
    },
    watch:{
      patient:{
        handler(){
          this.getHistoryPrescription();
        }
      },
    },
    data() {
      return {
        perPage: 5,//每页的个数
        pageOptions: [5, 10, 15],//每页可选页数
        currentPage: 1,//当前页码
        total:1,
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        isBusy: false,
        prescriptionItems:[],
        selectedPrescription: {
          prescriptionItemsList: []
        },
        prescriptionFields: [
          {key: 'prescriptionId', label: '申请单号', sortable: true},
          {key: 'submitTime', label: '提交时间', sortable: true},
          {key: 'validStatus', label: '状态', sortable: true},
          {key: 'sum', label: '总计', sortable: true},
        ],
        api: [
          {
            listPrescriptionByMedicalRecordId:"/doctor/prescription/patent/listPrescriptionByMedicalRecordId",
            listPrescriptionByMedicalRecordIdParams:{},
            ifPrescriptionCanCancelApi: "/doctor/prescription/patent/ifPrescriptionCanCancel",// 1可废除 2不可废除 3已废除
            ifPrescriptionCanCancelParams: {},
            cancelPrescriptionApi: "/doctor/prescription/patent/cancelPrescription",
            cancelPrescriptionParams: {}
          },
          {
            listPrescriptionByMedicalRecordId:"/doctor/prescription/herbal/listPrescriptionByMedicalRecordId",
            listPrescriptionByMedicalRecordIdParams:{},
            ifPrescriptionCanCancelApi: "/doctor/prescription/herbal/ifPrescriptionCanCancel",
            ifPrescriptionCanCancelParams: {},
            cancelPrescriptionApi: "/doctor/prescription/herbal/cancelPrescription",
            cancelPrescriptionParams: {}
          }
        ],
      }
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.total = filteredItems.length;
        this.currentPage = 1;
      },
      selectPrescription(item) {//选中某项
        if (item.length === 0) {
          this.selectedPrescription = {};
        } else {
          this.selectedPrescription = item[0];
        }
      },
      prescriptionSum(item) {//计算处方总价值
        let prescriptionItemList = item.prescriptionItemsList;
        let sum = 0.0;
        for (let i = 0; i < prescriptionItemList.length; i++) {
          sum += prescriptionItemList[i].actualQuantity * prescriptionItemList[i].drugs.drugsPrice;
        }
        return sum;
      },
      transformSubmitTime(item) {
        console.log("我来打印提交时间");
        console.log(item);
        return item.submitTime.split("T")[0] + ' ' + item.submitTime.split("T")[1].split(".")[0];
      },
      getHistoryPrescription(){
        if(!(this.medicalRecordState==='未初诊')){
          this.api[this.type].listPrescriptionByMedicalRecordIdParams.medicalRecordId = this.registration.medicalRecordId;
          this.$get(this.api[this.type].listPrescriptionByMedicalRecordId,this.api[this.type].listPrescriptionByMedicalRecordIdParams).then(res=>{
            console.log(res);
            if(res.status === "OK"){
              this.prescriptionItems = res.data;
              this.total = this.prescriptionItems.length;
              // alert(res.msg);
            }else{
              console.log(res.msg);
              alert(res.message);
            }
          });
        }else{
          console.log("未初诊");
        }
      },
      cancelPrescriptionItem() {//废除处方
        //首先判断是否可以废除
        //然后进行废除操作

        if (!(JSON.stringify(this.selectedPrescription) == "{}")) {
          this.api[this.type].ifPrescriptionCanCancelParams.prescriptionId = this.selectedPrescription.prescriptionId;
          this.$get(this.api[this.type].ifPrescriptionCanCancelApi, this.api[this.type].ifPrescriptionCanCancelParams).then(res => {
            console.log(res);
            if (res.status === "OK") {
              if (res.data === 1) {//可废除
                this.api[this.type].cancelPrescriptionParams.prescriptionId = this.selectedPrescription.prescriptionId;
                this.$get(this.api[this.type].cancelPrescriptionApi, this.api[this.type].cancelPrescriptionParams).then(cancelRes => {
                  console.log(cancelRes);
                  if (cancelRes.status === "OK") {//废除成功
                    alert(cancelRes.msg);
                    console.log(cancelRes.msg + cancelRes.data);
                    this.getHistoryPrescription();
                  } else {
                    console.log(cancelRes.msg);
                    alert(cancelRes.msg);
                  }
                });
              } else if (res.data === 2) {//不可废除
                alert("患者已缴费，您不能废除");
              } else if (res.data === 3) {//已废除
                alert("您已经废除了");
              }
            } else {
              alert("网络延迟，请稍后操作");
              console.log(res.msg);
            }
          });
        } else {
          alert("请先选择需要废除的项目");
        }
      },
    },
  }
</script>

<style scoped>

</style>
