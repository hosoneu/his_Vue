<template>
  <b-card header="患者列表" >
<!--    <b-tabs @input="changeTab">-->
      <!-- changeTab更换tab 个人/科室挂号列表 -->
<!--      <b-tab v-for="(tab, index) in registrationTabs" :title="tab.title" :key="index" :active="index === currentTab" >-->
        <!-- 分别存放tab的内容-->
        <b-row>
          <b-col sm="8" class="my-1">
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
          <b-col sm="4" class="my-1">
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-col>
        </b-row>
        <!-- Main table element -->
      <b-table
        selectable
        select-mode="single"
        show-empty
        hover
        :aria-busy="isBusy"
        :items="items"
        :fields="registrationFields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @row-selected="selectPatient"
        >
        <!-- @filtered当本地筛选导致项目数发生变化时发出。-->
        <!-- 自定义诊断的展示格式 -->
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
  </b-card>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
      name: "registrationList",
    props:{
      registrationFields:{
        type: Array,
        default:()=>{return []}
      },
      // patientTabs:''
    },
    data() {
      return {
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
        // departmentId:this.curr_dept.departmentId,
        // patientTabs:{
        //   title:"个人",
        //   getPatientApi:"/tech/getAllPatientByDepartmentId",
        //   getPatientParams:{departmentId:this.departmentId},
        // },
      }
    },
    computed:{
      ...mapState("common",['curr_dept'])
    },
    mounted: async function(){//挂载之后才开始填充数据
      console.log("mounted");
      await this.getPatientList();
    },
    methods:{
      onFiltered(filteredItems) {
        // 触发分页以更新由于过滤而导致的按钮/页数
        this.total = filteredItems.length;
        this.currentPage = 1;
      },
      selectPatient(patient) {
        console.log(patient[0]);
        console.log(patient);
        console.log('aaa');
        this.$emit('selectPatient', patient[0]);
      },
      // async changeTab(index){
      //   this.currentPatinetTab = index;
      //   await this.getPatientList();//串行：等待前面一个await执行后接着执行下一个await
      // },
      getPatientList(){
        console.log("请求患者列表");
        let url = '/tech/getAllPatientByDepartmentId';
        // this.departmentId = this.curr_dept.departmentId;
        // console.log("这是即将获得病人的科室号id" + this.departmentId);
        let data = {departmentId:this.curr_dept.departmentId};
        console.log(data);
        this.$get(url, data).then(res=>{
          console.log("已获得")
          console.log(res);
          if(res.status === "OK"){
            this.items = res.data;//填充患者列表数据
            // this.total = this.items.length;//得到s当前的总数
            // this.isBusy = false;
          }else{
            console.log("加载失败");
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
