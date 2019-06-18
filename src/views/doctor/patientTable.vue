<template>
        <b-card header="患者列表">
          <b-table id='user-table' :items="items" :fields="tableFields" :busy="isBusy" :per-page="perPage"
                   :current-page="currentPage">
            <template slot="status" slot-scope="data">
              <b-badge :variant="data.item.status">{{data.item.status}}</b-badge>
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
        </b-card>
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
        getPatientApi: String,
        getPatientParams:{
          type: Object,
          default:()=>{return {}}
        },
        countPatientApi: String,
        countPatientParams:{
          type:Object,
          default:()=>{return {}}
        }
      },
      data() {
        return {
          isBusy: false,
          innerFields: ['选择'],
          items:[],
          total:10,
          currentPage:1,
        }
      },
      mounted: async function(){
        console.log("mounted");
        await this.countPatient();
        await this.getPatientList(1);
      },
      computed: {
          tableFields :function(){
            return this.initialFields.concat(this.innerFields);
          }
      },
      methods:{
        selectUser (user) {
          console.log(user);
          this.$emit('select_user', user);
        },
        getPatientList(page){
          console.log("请求患者列表");
          let data = this.getPatientParams;
          data['page'] = page;
          console.log(data);
          this.$get(this.getPatientApi, data).then(res=>{
            console.log(res);
            if(res.code === true){
              this.items = this.items.concat(res.data);
              this.isBusy = false;
            }else{
              console.log("加载失败");
            }
          });
        },
        countPatient(){
          console.log("请求患者总数");
          this.$get(this.countPatientApi, this.countPatientParams).then(res=>{
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
