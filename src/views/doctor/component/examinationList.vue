<template>
  <div class="my-1">
    <b-row>
      <b-col md="1">

      </b-col>
      <b-col md="10">
        <b-row>
          <b-col md="5">
          </b-col>
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
          :items="historyExaminationList"
          :fields="examinationFields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          @row-selected="selectExamination">
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
          <br>
        </b-row>
        <br>
        <examination-fmedical-items-table
          :examination-fmedical-items-list="selectedExamination.examinationFmedicalItemsList"
        >
        </examination-fmedical-items-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import ExaminationFmedicalItemsTable from "./examinationFmedicalItemsTable";
    export default {
      name: "examinationList",
      components:{ExaminationFmedicalItemsTable},
      props:{
        historyExaminationList:{
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
          selectedExamination:{//被选中的检查检验单
            medicalRecordId:-1,
            doctorId:-1,
            doctorAdvice:'',//提交时添加医嘱
            examinationFmedicalItemsList:[],
            examinationMark:''//1检查2检验
          },
          examinationFields:[
            {key: 'examinationId', label:'申请单号', sortable: true},
            {key: 'submitTime', label:'提交时间', sortable: true},
            {key: 'sum', label:'总计', sortable: true},
          ],
        }
      },
      methods:{
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        selectExamination(item){//选择一个检查检验单
          console.log("选择一个检查检验单");
          if(item.length===0){//选中相同的了
            console.log("选中相同的了");
            //被选中的检查检验单
          }else{
            this.selectedExamination = item[0];
          }
        },
        selectExaminationFmedicalItems(){

        },
        transformSubmitTime(item){
          return item.submitTime.split("T")[0]+' '+item.submitTime.split("T")[1].split(".")[0];
        },
        treatmentSum(){
          return 0;
        }
        // checkExamination(){//查看检查检验单
        //
        // }
      }

    }
</script>

<style scoped>

</style>
