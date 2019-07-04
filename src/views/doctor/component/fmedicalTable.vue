<template>
  <div class="my-1">
    <!-- User Interface controls -->
    <b-row>
      <b-col sm="5" class="my-1">
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
      <b-col sm="2" class="my-1">
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
      :items="fmedicalItems"
      :fields="fmedicalFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      @row-selected="selectFmedical">
      <!-- @filtered当本地筛选导致项目数发生变化时发出。-->
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
  </div>
</template>

<script>
    export default {
        name: "fmedicalTable",
      data(){
        return{
          fmedicalApi:[
            {getFmedicalApi:"/doctor/common/listExamination1",//0检查
            },
            {getFmedicalApi:"/doctor/common/listExamination2",//1检验
            },
            {getFmedicalApi:"/doctor/common/listTreatment",//2处置
            },
          ],
          fmedicalFields: [
            {key: 'fmedicalItemsCode', label:'编码', sortable: true},
            {key: 'fmedicalItemsName', label:'名称', sortable: true},
            {key: 'fmedicalItemsFormat', label:'规格', sortable: true},
            {key: 'fmedicalItemsPrice', label:'价格', sortable: true},
          ],
          isBusy: true,
          fmedicalItems:[],
          total:1,
          perPage: 5,
          pageOptions: [5, 10, 15],
          currentPage:1,// currentPage:1 表示当前页码为1
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
        }
      },
      props:{
        type:{//0检查 1检验 2 处置
          type: Number,
          default:()=>{return 0}
        }

      },
      mounted: async function(){//挂载之后才开始填充数据
        await this.getFmedicalList();
      },
      methods:{
        selectFmedical(fmedical){
          console.log(fmedical[0]);
          this.$emit('selectFmedical', fmedical[0]);
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length
          this.currentPage = 1
        },
        getFmedicalList(){
          console.log("请求非药品列表");
          this.$get(this.fmedicalApi[this.type].getFmedicalApi).then(res=>{
            console.log(res);
            if(res.status === 'OK'){
              this.fmedicalItems = res.data;//填充药品列表数据
              this.total = this.fmedicalItems.length;
              this.isBusy = false;
            }else{
              console.log("加载失败");
            }
          });
        },
      },
    }
</script>

<style scoped>

</style>
