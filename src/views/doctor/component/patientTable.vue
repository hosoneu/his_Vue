<template>
        <b-card header="患者列表" >
          <b-tabs @input="changeTab">
            <b-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :active="index === currentPatientTab" >
              <b-table
                selectable
                select-mode="single"
                :items="items"
                :fields="tableFields"
                :busy="isBusy"
                @row-selected="selectPatient"
              >

                <template slot="diagnosis_status" slot-scope="data" >
                  <b-badge variant="primary" @click="selectPatient(data.item)">{{data.item.diagnosis_status}}</b-badge>
                </template>
<!--                <template slot="选择" slot-scope="data">-->
<!--                  <b-button variant="outline-primary" size="sm" @click="selectPatient(data.item)" class="mr-2">-->
<!--                    选择-->
<!--                  </b-button>-->
<!--                </template>-->
              </b-table>
              <b-pagination
                @change="getPatientList"
                v-model="currentPatientPage"
                :total-rows="total"
                :per-page="perPage"
                aria-controls="user-table"
                size="sm"
                align="center"
              ></b-pagination>
            </b-tab>
          </b-tabs>
        </b-card>

</template>
<script>
    export default {
      props:{
        initialPatientFields:{
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
          // innerFields: ['选择'],
          items:[],
          total:5,
          currentPatientPage:1,
          currentPatientTab:0,
        }
      },
      mounted: async function(){//挂载之后才开始填充数据
        console.log("mounted");
        await this.countPatient();
        console.log("await this.countPatient");
        await this.getPatientList(1);
        console.log("await this.getPatientList");
      },
      computed: {
          tableFields :function(){
            return this.initialPatientFields;
            // return this.initialPatientFields.concat(this.innerFields);
          }
      },
      methods:{
        selectPatient(patient) {
          console.log(patient);
          this.$emit('select_patient', patient);
        },
        // selectPatient(patient){
        //   console.log(patient);
        //   this.$emit('select_patient', patient);
        // },
        async changeTab(index){
          this.currentPatinetTab = index;
          this.currentPatientPage = 1;
          await this.countPatient();
          await this.getPatientList();
        },
        getPatientList(page){
          console.log("请求患者列表");
          let data = this.tabs[this.currentPatinetTab].getPatientParams;
          data['page'] = page;
          console.log(data);
          this.$get(this.tabs[this.currentPatinetTab].getPatientApi, data).then(res=>{
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
          this.$get(this.tabs[this.currentPatinetTab].countPatientApi, this.tabs[this.currentPatinetTab].countPatientParams).then(res=>{
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
