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
    <!-- Main table element -->
    <b-table
      selectable
      select-mode="single"
      show-empty
      hover
      stacked="md"
      :aria-busy="isBusy"
      :items="drugsItems"
      :fields="drugsFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      @row-selected="selectDrugs">
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
          size="md"
          align="center"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    export default {
        name: "drugsTable",
      data() {
        return {
          drugsApi:[
            {getDrugsApi:"/doctor/common/listPatentDrugs",//0成药
              },
            {getDrugsApi:"/doctor/common/listHerbalDrugs",//1草药
              },
          ],
          drugsFields: [
            {key: 'drugsCode', label:'编码', sortable: true},
            {key: 'drugsName', label:'名称', sortable: true},
            {key: 'drugsFormat', label:'规格', sortable: true},
            {key: 'drugsUnit', label:'单位', sortable: true},
            {key: 'drugsPrice', label:'价格', sortable: true},
          ],
          isBusy: false,
          drugsItems:[],
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
        type:{//0成药 1草药 2全部
          type: Number,
          default:()=>{return 0}
        }

      },//标识中医还是西医
      mounted: async function(){//挂载之后才开始填充数据
        await this.getDrugsList();
      },
      methods:{
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length
          this.currentPage = 1
        },
        selectDrugs(drugs) {
          console.log(drugs[0]);
          this.$emit('selectDrugs', drugs[0]);
        },
        getDrugsList(){
          console.log("请求药品列表");
          this.$get(this.drugsApi[this.type].getDrugsApi).then(res=>{
            console.log(res);
            if(res.status === 'OK'){
              this.drugsItems = res.data;//填充药品列表数据
              this.total = this.drugsItems.length;
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
