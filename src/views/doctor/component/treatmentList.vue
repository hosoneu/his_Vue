<template>
  <div class="my-1">
    <b-row>
      <b-col md="1">

      </b-col>
      <b-col md="10">
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
              <b-button id="checkButton" @click="checkTreatmentItem" size="md" variant="outline-dark">查看</b-button>

            </b-button-group>
          </b-col>
        </b-row>
        <!--  处置单详情  -->
        <b-modal  ref="treatment-info-modal" size="lg" centered title="处置单详情" >
          <treatment-info
            :treatment-items-list="this.selectedTreatment.treatmentItemsList"
          >
          </treatment-info>

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
          :items="treatmentItems"
          :fields="treatmentFields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          @row-selected="selectTreatment">
          <template slot="sum" slot-scope="row">
            {{treatmentSum(row.item)+'元'}}
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
  import TreatmentInfo from "./treatmentItemsTable";
    export default {
      name: "treatmentList",
      components:{TreatmentInfo},
      props:{
        treatmentItems:{
          type:Array,
          default:()=>{return []}
        },
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
          selectedTreatment:{},
          treatmentFields:[
            {key: 'treatmentId', label:'申请单号', sortable: true},
            {key: 'submitTime', label:'提交时间', sortable: true},
            {key: 'sum', label:'总计', sortable: true},
          ],
        }
      },
      mounted: function () {
        this.total = this.treatmentItems.length;
      },
      watch:{
        treatmentItems:{
          handler(){
            this.total = this.treatmentItems.length;
            this.selectedTreatment={
              treatmentItemsList : [],
            };
          }
        }
      },
      methods:{
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        selectTreatment(item){//选中某项
          this.selectedTreatment = item[0];
          this.$emit("selectTreatment",item[0]);
        },
        transformSubmitTime(item){
          console.log("我来打印提交时间");
          console.log(item);
          return item.submitTime.split("T")[0]+' '+item.submitTime.split("T")[1].split(".")[0];
        },
        treatmentSum(item){//计算处方总价值
          let treatmentItemsList = item.treatmentItemsList;
          let sum = 0.0;
          for(let i=0;i<treatmentItemsList.length;i++){
            sum+=treatmentItemsList[i].actualQuantity * treatmentItemsList[i].fmedicalItems.fmedicalItemsPrice;
          }
          return sum;
        },
        checkTreatmentItem(){//查看处置条目
          this.$refs["treatment-info-modal"].show();
        },

      },
    }
</script>

<style scoped>

</style>
