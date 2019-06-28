<template>
  <div class="my-1">
    <b-row>
      <b-col md="1">

      </b-col>
      <b-col md="10">
        <!-- User Interface controls -->
        <b-row>
          <b-col md="4" class="my-1">
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
                  清空</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col md="3" class="my-1">
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
              size="md"
            ></b-form-select>
          </b-col>
        <b-col md="5">
          <b-button-group class="pull-right">
            <!--检索药品-->
            <b-button id="checkButton" @click="checkPrescriptionItem" size="md" variant="outline-dark">查看</b-button>
            <b-button id="cancelButton" @click="cancelPrescriptionItem" size="md" variant="outline-dark">废除</b-button>
          </b-button-group>

        </b-col>

        </b-row>
        <!--  处方单详情  -->
        <b-modal  ref="prescription-info-modal" hide-footer="true" size="lg" centered title="处方单详情" >
          <prescription-info
            :prescription-items-list="this.selectedPrescription.prescriptionItemsList"
          >
          </prescription-info>

        </b-modal>

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
              size="md"
              align="center"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import PrescriptionInfo from "./prescriptionItemsTable";
    export default {
      name: "prescriptionList",
      components:{PrescriptionInfo},
    //  该组件用于实现展示处置单
      props:{
        prescriptionItems:{
          type:Array,
          default:()=>{return []}
        },
        type:{
          type:Number,
          default:()=>{return 0}
        }
      },
      data(){
        return{
          perPage: 5,//每页的个数
          pageOptions: [5, 10, 15],//每页可选页数
          currentPage:1,//当前页码
          total:1,//总数
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          isBusy:false,
          selectedPrescription:{
            prescriptionItemsList:[]
          },
          prescriptionFields:[
            {key: 'prescriptionId', label:'申请单号', sortable: true},
            {key: 'submitTime', label:'提交时间', sortable: true},
            {key: 'validStatus', label:'状态', sortable: true},
            {key: 'sum', label:'总计', sortable: true},
          ],
          api:[
            {
              ifPrescriptionCanCancelApi:"/doctor/prescription/patent/ifPrescriptionCanCancel",// 1可废除 2不可废除 3已废除
              ifPrescriptionCanCancelParams:{},
              cancelPrescriptionApi:"/doctor/prescription/patent/cancelPrescription",
              cancelPrescriptionParams:{}
            },
            {
              ifPrescriptionCanCancelApi:"/doctor/prescription/herbal/ifPrescriptionCanCancel",
              ifPrescriptionCanCancelParams:{},
              cancelPrescriptionApi:"/doctor/prescription/herbal/cancelPrescription",
              cancelPrescriptionParams:{}
            }
          ],
        }
      },
      mounted: function () {
        this.total = this.prescriptionItems.length;
      },
      watch:{
        prescriptionItems:{
          handler(){
            this.total = this.prescriptionItems.length;
            this.selectedPrescription={
              prescriptionItemsList : [],
            };
          }
        },
      },

      methods:{
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        selectPrescription(item){//选中某项
          if(this.selectedPrescription===item[0]){
            this.selectedPrescription = {
              prescriptionItemsList : [],
            };
          }else{
            this.selectedPrescription = item[0];
            this.$emit("selectPrescription",item[0]);
          }
        },
        prescriptionSum(item){//计算处方总价值
          let prescriptionItemList = item.prescriptionItemsList;
          let sum = 0.0;
          for(let i=0;i<prescriptionItemList.length;i++){
            sum+=prescriptionItemList[i].actualQuantity * prescriptionItemList[i].drugs.drugsPrice;
          }
          return sum;
        },
        transformSubmitTime(item){
          console.log("我来打印提交时间");
          console.log(item);
          return item.submitTime.split("T")[0]+' '+item.submitTime.split("T")[1].split(".")[0];
        },
        checkPrescriptionItem(){//查看处方条目
          if(this.selectedPrescription.prescriptionItemsList===[]){
            alert("请选择项目");
          }else{
            this.$refs["prescription-info-modal"].show();
          }
        },
        cancelPrescriptionItem(){//废除处方
          //首先判断是否可以废除
          //然后进行废除操作
          this.api[this.type].ifPrescriptionCanCancelParams.prescriptionId = this.selectedPrescription.prescriptionId;
          this.$get(this.api[this.type].ifPrescriptionCanCancelApi,this.api[this.type].ifPrescriptionCanCancelParams).then(res=>{
            console.log(res);
            if(res.status === "OK"){
              if(res.data===1){//可废除
                this.api[this.type].cancelPrescriptionParams.prescriptionId = this.selectedPrescription.prescriptionId;
                this.$get(this.api[this.type].cancelPrescriptionApi,this.api[this.type].cancelPrescriptionParams).then(cancelRes=>{
                  console.log(cancelRes);
                  if(cancelRes.status === "OK"){//废除成功
                    alert(cancelRes.msg);
                    console.log(cancelRes.msg+cancelRes.data);
                  }else{
                    console.log(cancelRes.msg);
                    alert(cancelRes.msg);
                  }
                });
              }else if(res.data===2){//不可废除
                alert("患者已缴费，您不能废除");
              }else if(res.data===3){//已废除
                alert("您已经废除了");
              }
            }else{
              alert("网络延迟，请稍后操作");
              console.log(res.msg);
            }
          });
        },
      },
    }
</script>

<style scoped>

</style>
