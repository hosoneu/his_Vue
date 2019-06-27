<template>
  <div>
  <b-row md="6">
    <b-col md="6"></b-col>
    <b-col md="4" class="my-1">
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
    <b-col md="2" class="my-1">
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
    :aria-busy="isBusy"
    :items="medicalRecordHistoryItems"
    :fields="medicalRecordHistoryFields"
    :current-page="currentPage"
    :per-page="perPage"
    :filter="filter"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :sort-direction="sortDirection"
    @filtered="onFiltered">
    <!-- @filtered当本地筛选导致项目数发生变化时发出。-->
    <template slot="operate" slot-scope="row">
      <b-button @click="selectMedicalRecordHistory(row.item, row.index)" variant="success"  size="sm" class="mr-2" >查看诊断</b-button>
    </template>

  </b-table>
    <b-modal  ref="diagnosis-modal" size="lg" centered title="诊断列表">
      <diagnosis-table
        :diagnosis-items=diagnosisList
      >
      </diagnosis-table>

    </b-modal>
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
  import {mapState} from 'vuex';
  import DiagnosisTable from "./diagnosisTable";
    export default {
      name: "medicalRecordHistory",
      components: {DiagnosisTable},
      data(){
        return{
          //得到历史病历列表
          getMedicalRecordHistoryApi:"/doctor/homepage/listMedicalRecordHistoryByPatientId",
          getMedicalRecordHistoryParams:{},
          diagnosisModalId:'diagnosis-modal',
          medicalRecordHistoryItems:[],
          diagnosisList:[],
          medicalRecordHistoryFields:[
            {key: 'medicalRecordId', label: '病历号', sortable: true},
            {key: 'medicalRecordHomePage.chiefComplaint', label: '主诉', sortable: true},
            {key: 'medicalRecordHomePage.presentHistory', label:'现病史', sortable: true},
            {key: 'medicalRecordHomePage.presentTreatment', label: '现病治疗情况', sortable: true},
            {key: 'medicalRecordHomePage.pastHistory', label: '既往史', sortable: true},
            {key: 'medicalRecordHomePage.allergicHistory', label:'过敏史', sortable: true},
            {key: 'medicalRecordHomePage.physicalExamination', label: '体格检查', sortable: true},
            {key: 'medicalRecordHomePage.assistantExamination', label:'辅助检查', sortable: true},
            {key: 'operate', label:'操作'},
          ],
          isBusy: false,
          total:5,
          perPage: 5,
          pageOptions: [5, 10, 15],
          currentPage:1,// currentPage:1 表示当前页码为1
          currentTab:0,//  currentTab:0表示个人挂号列表
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          selectedMedicalRecordIndex:0,
        }
      },
      computed:{
        ...mapState("doctor",['registration']),
      },
      watch:{
        registration:{
          handler() {
            this.getMedicalRecordHistoryList();
          },
          immediate: false
        }
      },
      methods: {
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        selectMedicalRecordHistory(row,index) {
          this.selectedMedicalRecordIndex = index;
          this.diagnosisList = Object.assign([],this.medicalRecordHistoryItems[this.selectedMedicalRecordIndex].diagnosisList);//赋值以分
          this.$refs["diagnosis-modal"].show();//弹框
        },
        getMedicalRecordHistoryList() {
          this.getMedicalRecordHistoryParams.patientId=this.registration.patientId;
          console.log("请求历史病历列表");
          let para = this.getMedicalRecordHistoryParams;
          console.log(para);
          this.$get(this.getMedicalRecordHistoryApi, para).then(res => {
            console.log(res);
            if (res.status === 'OK') {
              this.medicalRecordHistoryItems = res.data;//填充历史病历列表数据
              this.isBusy = false;
            } else {
              console.log("加载失败");
            }
          });
        },
      }
    }
</script>

<style scoped>

</style>
