<template>
  <div class="my-1">
    <!--  本组件用来实现常用项目列表的获取 -->
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
      <b-col sm="5" class="my-1" align="right">
        <b-button variant="danger" size="md" @click="deleteCommonlyUsedItems()">删除
        </b-button>
      </b-col>
    </b-row>
    <!-- Main table element -->
    <br>
    <b-table
      selectable
      select-mode="single"
      show-empty
      hover
      stacked="md"
      :aria-busy="isBusy"
      :items="items"
      :fields="commonlyUsedFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      @row-selected="selectCommonlyUsedItem">
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
  import {mapState} from 'vuex';
  //  本组件用来实现常用项目列表的获取
    export default {
        name: "commonlyUsedItems",
      props:{
        type:{//常用项类型0疾病 1药品 2非药品
          type:Number,
          default:()=>{return 0}
        },
        commonlyUsedType:{//疾病：0中医疾病 1西医疾病 药品：0成药 1草药 非药品：0检查 1检验 2处置
          type: Number,
          default:()=>{return 0}
        },
        commonlyUsedFields:{
          type:Array,
          default:()=>{return []}
        },
        commonlyUsedApi:{
          type:Array,
          default:()=>{return []}
        },
      },
      data() {
          return {
            isBusy: false,
            items:[],//数据
            total:1,//数组总长度
            perPage: 5,//每页元素数量
            pageOptions: [5, 10, 15],//每页数量可选项
            currentPage:1,// currentPage:1 表示当前页码为1
            sortBy: null,
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            selectedCommonlyUsedItems:{},//被选中的常用项目
          }
      },
      mounted: async function(){//挂载之后才开始填充数据
        console.log("mounted");
        await this.getCommonlyUsedList();
        console.log("await this.getCommonlyUsedList");
      },
      computed:{
        ...mapState("common",["curr_user"])
      },
      methods:{
        selectCommonlyUsedItem(item) {//选中常用项目
          console.log(item[0]);
          if(item.length==0){//未选中或者取消
            this.selectedCommonlyUsedItems = {};
          }else{
            this.selectedCommonlyUsedItems = item[0];
            this.$emit('selectCommonlyUsedItem', item[0]);
          }
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        getCommonlyUsedList(){
          this.commonlyUsedApi[this.commonlyUsedType].getCommonlyUsedParams.userId = this.curr_user.userId
          let data = this.commonlyUsedApi[this.commonlyUsedType].getCommonlyUsedParams;
          console.log(data);
          this.$get(this.commonlyUsedApi[this.commonlyUsedType].getCommonlyUsedListApi, data).then(res=>{
            console.log(res);
            if(res.status === 'OK'){
              this.items = res.data;
              this.total = this.items.length;
              this.isBusy = false;
            }else{
              console.log("加载失败");
            }
          });
        },
        deleteCommonlyUsedItems(){//删除常用项目
          if(JSON.stringify(this.selectedCommonlyUsedItems)=="{}"){//如果未选中项目
            alert("您未选中常用项目");
          }else{//选择常用项目
            let deleteCommonlyUsedApi=[{
              deleteApi:"/doctor/common/deleteCommonlyUsedDiagnosis",
              deleteParams:{}
            },{
              deleteApi:"/doctor/common/deleteCommonlyUsedDrugs",
              deleteParams:{}
            },{
              deleteApi:"/doctor/common/deleteCommonlyUsedFmedical",
              deleteParams:{}
            }];
            if(this.type===0){//疾病
              deleteCommonlyUsedApi[this.type].deleteParams.commonlyUsedDiagnosisId = this.selectedCommonlyUsedItems.commonlyUsedDiagnosisId;
            }else if(this.type===1){//药品
              deleteCommonlyUsedApi[this.type].deleteParams.commonlyUsedDrugsId = this.selectedCommonlyUsedItems.commonlyUsedDrugs;
            }else{//非药品
              deleteCommonlyUsedApi[this.type].deleteParams.commonlyUsedFmedicalId = this.selectedCommonlyUsedItems.commonlyUsedFmedicalId;
            }
            this.$get(deleteCommonlyUsedApi[this.type].deleteApi,deleteCommonlyUsedApi[this.type].deleteParams).then(res=>{
              if(res.status === 'OK'){
                alert(res.msg);
                this.getCommonlyUsedList();
              }else{
                alert(res.msg);
              }
            });

          }

        }

      }
    }
</script>

<style scoped>

</style>
