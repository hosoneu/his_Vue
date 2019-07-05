<template>
  <div class="animated fadeIn">
      <b-col sm="12">
        <b-card header="费用明细">
          <b-row>
            <b-col sm="1">
            </b-col>
            <b-col sm="10">
              <b-row>
                <b-col sm="5" class="my-1">
                  <b-input-group>
                    <b-form-input
                    v-model="filter"
                    placeholder="请输入..."
                    size="sm"
                  ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        :disabled="!filter"
                        @click="filter = ''"
                        size="sm"
                      >
                        清空</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-col sm="2" class="my-1">
                  <b-form-select
                    v-model="perPage"
                    :options="pageOptions"
                    size="sm"
                  ></b-form-select>
                </b-col>
              </b-row>
              <br>
              <b-table
                stacked="sm"
                show-empty
                hover
                :items="expenseItemsList"
                :fields="expenseItemsFields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
              >
                <template slot="payStatus" slot-scope="row">
                  {{transformPayStatus(row.item)}}
                </template>
              </b-table>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col sm="12" class="my-1">
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
        </b-card>
      </b-col>
  </div>
</template>
<script>
  export default {
    name: "expenseItems",
    props:{
      medicalRecordId:{
        type:Number,
        default:()=>{return 0}
      }
    },
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
        perPage: 5,//每页的个数
        pageOptions: [5, 10, 15],//每页可选页数
        currentPage:1,
        total:1,
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
      }
    },
    mounted:function(){
      this.getExpenseItemsList()
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
        this.api.getExpenseItemsListParams.medicalRecordId = this.medicalRecordId;
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
            this.total = this.expenseItemsList.length;
            console.log(res.data);
          }else{
            console.log(res.msg);
          }
        });
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.total = filteredItems.length;
        this.currentPage = 1;
      },
    },
    watch:{
      medicalRecordId:{
        handler(){
          this.getExpenseItemsList()
        }
      }
    },
  }
</script>

<style scoped>

</style>
