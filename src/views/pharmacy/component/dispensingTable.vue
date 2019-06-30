<template>
  <div>
    <b-table
      :items="items"
      :fields="tableFields"
      :busy="isBusy">
      <template slot="status" slot-scope="data">
        <b-badge
          :variant="data.item.status">{{data.item.status}}
        </b-badge>
      </template>
      <template slot="选择" slot-scope="data">
        <b-button variant="outline-primary" size="sm" @click="selectUser(data.item)" class="mr-2">
          选择
        </b-button>
      </template>
    </b-table>
    <b-pagination
      @change="getPatientList"
      v-model="currentPage"
      :total-rows="total"
      :per-page="perPage"
      aria-controls="user-table"
    ></b-pagination>
  </div>
</template>
<script>
  export default {
    props:{
      initialFields:{
        type: Array,
        default:()=>{return []}
      },
      perPage:{
        type: Number,
        default: 5
      },
      tabs:{
        type:Array,
        default:()=>{return [
          {
            title:"患者",
            getPatientApi: "getPatientList",
            getPatientParams:{},
            countPatientApi: "countPatientList",
            countPatientParams:{}
          }
        ]}
      },
    },
    data() {
      return {
        isBusy: false,
        innerFields: ['选择'],
        items:[],
        total:10,
        currentPage:1,
        currentTab:0
      }
    },
    mounted: async function(){
      console.log("mounted");
      await this.countPatient();
      console.log("await this.countPatient");
      await this.getPatientList(1);
      console.log("await this.getPatientList");
    },
    computed: {
      tableFields :function(){
        return this.initialFields.concat(this.innerFields);
      }
    },
    methods:{
      selectUser(user){
        console.log(user);
        this.$emit('select_user', user);
      },
      async changeTab(index){
        this.currentTab = index;
        this.currentPage = 1;
        await this.countPatient();
        await this.getPatientList();
      },
      getPatientList(page){
        console.log("请求患者列表");
        let data = this.tabs[this.currentTab].getPatientParams;
        data['page'] = page;
        console.log(data);
        this.$get(this.tabs[this.currentTab].getPatientApi, data).then(res=>{
          console.log(res);
          if(res.code === true){
            this.items = res.data;
            this.isBusy = false;
          }else{
            console.log("加载失败");
          }
        });
      },
      countPatient(){
        console.log("请求患者总数");
        this.$get(this.tabs[this.currentTab].countPatientApi, this.tabs[this.currentTab].countPatientParams).then(res=>{
          console.log(res);
          if(res.code === true){
            this.total = res.total;
          }else{
            console.log("请求患者总数失败");
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
