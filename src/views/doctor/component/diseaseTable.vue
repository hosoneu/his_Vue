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
      :items="items"
      :fields="diseaseFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      @row-selected="selectDisease">
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
        name: "diseaseTable",
      data() {
        return {
          diseaseApi:[
            {getDiseaseApi:"/doctor/common/listChineseDisease",
              getDiseaseParams:{},},
            {getDiseaseApi:"/doctor/common/listWesternDisease",
              getDiseaseParams:{},},
          ],
          diseaseFields: [
            {key: 'diseaseCode', label:'疾病代码', sortable: true},
            {key: 'diseaseIcd', label: '疾病ICD', sortable: true},
            {key: 'diseaseName', label: '疾病名', sortable: true},
          ],
          isBusy: false,
          items:[],
          total:1,
          perPage: 5,
          pageOptions: [5, 10, 15],
          currentPage:1,// currentPage:1 表示当前页码为1
          currentTab:0,//  currentTab:0表示个人挂号列表
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
        }
      },
      props:{
          type:{//0中医疾病 1西医疾病
            type: Number,
            default:()=>{return 0}
          }
      },//标识中医还是西医
      mounted: async function(){//挂载之后才开始填充数据
        await this.getDiseaseList();
      },
      methods:{
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length
          this.currentPage = 1
        },
        selectDisease(disease) {
          console.log(disease[0]);
          this.$emit('selectDisease', disease[0]);
        },
        getDiseaseList(){
          console.log("请求疾病列表");
          let data = this.diseaseApi[this.type].getDiseaseParams;
          this.$get(this.diseaseApi[this.type].getDiseaseApi, data).then(res=>{
            console.log(res);
            if(res.status === 'OK'){
              this.items = res.data;//填充疾病列表数据
              this.total = this.items.length;
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
