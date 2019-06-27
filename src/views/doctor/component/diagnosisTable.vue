<template>
  <div>
    <b-row md="5">
      <b-col md="8" class="my-1">
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
      <b-col md="4" class="my-1">
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
      :aria-busy="isBusy"
      :items="diagnosisItems"
      :fields="diagnosisItemsFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered">
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
       {{row.value.split('T')[0]}}
      </template>
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
        name: "diagnosisTable",
      props:{
        diagnosisItems:{
          type: Array,
          default:()=>{return []}
        },
      },
      data() {
        return {
          isBusy: false,
          total:1,
          perPage: 5,
          pageOptions: [5, 10, 15],
          currentPage:1,// currentPage:1 表示当前页码为1
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          diagnosisItemsFields:[
            {key: 'disease.diseaseName', label: '疾病名称', sortable: true},
            {key: 'disease.diseaseIcd', label: '疾病ICD', sortable: true},
            {key: 'mainDiagnosisMark', label: '主诊', sortable: true},
            {key: 'suspectMark', label:'疑似', sortable: true},
            {key: 'diagnosisMark', label: '类型', sortable: true},
            {key: 'onsetDate', label: '患病日期', sortable: true},
          ],
        }
      },
      methods: {
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
      }
    }
</script>

<style scoped>

</style>
