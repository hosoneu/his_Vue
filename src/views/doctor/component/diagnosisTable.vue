<template>
  <div>
    <!-- Main table element -->
    <b-table
      selectable
      select-mode="single"
      show-empty
      hover
      :aria-busy="isBusy"
      :items="diagnosisItems"
      :fields="diagnosisItemsFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection">
      <!-- @filtered当本地筛选导致项目数发生变化时发出。-->
      <template slot="diagnosisMark" slot-scope="row">
        {{row.value==='1'?'初诊':'终诊'}}
      </template>
      <template slot="suspectMark" slot-scope="row">
        {{row.value==='1'?'是':'否'}}
      </template>
      <template slot="mainDiagnosisMark" slot-scope="row">
        {{row.value==='1'?'是':'否'}}
      </template>
      <template slot="onsetDate" slot-scope="row">
       {{transformOnsetDate(row.item)}}
      </template>
    </b-table>
  </div>
</template>

<script>
  import {mapState} from "vuex";
    export default {
      name: "diagnosisTable",
      props:{
        diagnosisItems:{
          type: Array,
          default:()=>{return []}
        },
      },
      // watch:{
      //   patient:{
      //     handler(){
      //       this.diagnosisItems = [];
      //     }
      //   }
      // },
      computed:{
        ...mapState("doctor",["patient"]),
      },
      data() {
        return {
          isBusy: false,
          perPage: 5,
          pageOptions: [5, 10, 15],
          currentPage:1,// currentPage:1 表示当前页码为1
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          diagnosisItemsFields:[
            {key: 'disease.diseaseIcd', label: 'ICD编码', sortable: true},
            {key: 'disease.diseaseName', label: '疾病名称', sortable: true},
            {key: 'mainDiagnosisMark', label: '主诊', sortable: true},
            {key: 'suspectMark', label:'疑似', sortable: true},
            {key: 'onsetDate', label: '发病日期', sortable: true},
            {key: 'diagnosisMark', label: '类型', sortable: true},
          ],
        }
      },
      methods:{
        transformOnsetDate(item){//得到发病日期
          if(item.onsetDate==''){
            return '';
          }else if(item.onsetDate===null){
            return "";
          }else{
            return item.onsetDate.split("T")[0];
          }
        },
      }
    }
</script>

<style scoped>

</style>
