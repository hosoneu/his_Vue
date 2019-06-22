<template>
  <b-card header="病历模板" >
    <b-tabs @input="changeTab">
      <b-row>
        <b-col sm="12" class="my-2">
        </b-col>
        <b-col sm="1"></b-col>
        <b-col sm="7">
          <b-form-input size="sm" class="mr-sm-2" placeholder="请输入查询"></b-form-input>
        </b-col>
        <b-col sm="3">
          <b-button size="sm" class="d-sm-down-none" href="#" variant="primary">查询</b-button>
        </b-col>
      </b-row>
      <b-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :active="index === currentTab">
        <b-table
          selectable
          select-mode="single"
          :items="items"
          :fields="tableFields"
          :busy="isBusy"
          @row-selected="rowSelected">
        </b-table>
      </b-tab>
      <b-pagination
        @change="getMedicalRecordTemplateList"
        v-model="currentPage"
        :total-rows="total"
        :per-page="perPage"
        aria-controls="user-table"
        size="sm"
        align="center"
      ></b-pagination>
    </b-tabs>
  </b-card>
</template>

<script>
    export default {
      props:{
        fields:{//初始化病历模板列表
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
              title:"病历",
              getMedicalRecordTemplateApi: "getMedicalRecordTemplateList",
              getMedicalRecordTemplateParams:{},
              countMedicalRecordTemplateApi: "countMedicalRecordTemplateList",
              countMedicalRecordTemplateParams:{}
            },
          ]}
        },
      },
      data(){
        return {
          isBusy: false,
          items:[],
          total:5,
          currentPage:1,
          currentTab:0,
          selected: []
        }
      },
      computed: {
        tableFields :function(){
          return this.fields;
        }
      },
      methods:{
        rowSelected(items) {
          this.selected = items
        },
        async changeTab(index){
          this.currentTab = index;
          this.currentPage = 1;
          await this.countMedicalRecordTemplate();
          await this.getMedicalRecordTemplateList();
        },
        getMedicalRecordTemplateList(page){
          console.log("请求病历模板列表");
          let data = this.tabs[this.currentTab].getMedicalRecordTemplateParams;
          data['page'] = page;
          console.log(data);
          this.$get(this.tabs[this.currentTab].getMedicalRecordTemplateApi, data).then(res=>{
            console.log(res);
            if(res.code === true){
              this.items = res.data;
              this.isBusy = false;
            }else{
              console.log("加载失败");
            }
          });
        },
        countMedicalRecordTemplate(){
          console.log("请求模板总数");
          this.$get(this.tabs[this.currentTab].countMedicalRecordTemplateApi, this.tabs[this.currentTab].countMedicalRecordTemplateParams).then(res=>{
            console.log(res);
            if(res.code === true){
              this.total = res.total;
            }else{
              console.log("请求模板总数失败");
            }
          });
        }
      }
    }

</script>

<style scoped>

</style>
