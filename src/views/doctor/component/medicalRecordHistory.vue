<template>
  <div>
    <b-card>
      <b-row>
        <b-col md="1"></b-col>
        <b-col md="10">
          <!-- User Interface controls -->
          <b-row>
            <b-col md="4">
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
                    清空
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col md="3">
              <b-form-select
                v-model="perPage"
                :options="pageOptions"
                size="md"
              ></b-form-select>
            </b-col>
            <b-col md="5">
<!--              <b-button-group class="pull-right">-->
<!--                &lt;!&ndash;检索药品&ndash;&gt;-->
<!--                <b-button id="checkMedicalRecordItem" @click="checkMedicalRecordHistory" size="md" variant="outline-dark">-->
<!--                  查看-->
<!--                </b-button>-->
<!--              </b-button-group>-->
            </b-col>
          </b-row>
          <br>
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
            @filtered="onFiltered"
            @row-selected="selectMedicalRecordHistory"
          >
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

        </b-col>
      </b-row>

    </b-card>
    <br>
      <b-row>
        <b-col md="1"></b-col>
       <b-col md="10">
         <!-- Main table element -->
         <diagnosis-table
           :diagnosis-items="selectedMedicalRecordHistory.diagnosisList"
         >
         </diagnosis-table>
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
    data() {
      return {
        //得到历史病历列表
        getMedicalRecordHistoryApi: "/doctor/homepage/listMedicalRecordHistoryByPatientId",
        getMedicalRecordHistoryParams: {},
        diagnosisModalId: 'diagnosis-modal',
        medicalRecordHistoryItems: [],//历史病历
        selectedMedicalRecordHistory:{},
        // diagnosisList: [],
        medicalRecordHistoryFields: [
          {key: 'medicalRecordId', label: '病历号', sortable: true},
          {key: 'medicalRecordHomePage.chiefComplaint', label: '主诉', sortable: true},
          {key: 'medicalRecordHomePage.presentHistory', label: '现病史', sortable: true},
          {key: 'medicalRecordHomePage.presentTreatment', label: '现病治疗情况', sortable: true},
          {key: 'medicalRecordHomePage.pastHistory', label: '既往史', sortable: true},
          {key: 'medicalRecordHomePage.allergicHistory', label: '过敏史', sortable: true},
          {key: 'medicalRecordHomePage.physicalExamination', label: '体格检查', sortable: true},
          {key: 'medicalRecordHomePage.assistantExamination', label: '辅助检查', sortable: true},
        ],
        isBusy: false,
        total: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        currentPage: 1,// currentPage:1 表示当前页码为1
        currentTab: 0,//  currentTab:0表示个人挂号列表
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        selectedMedicalRecordIndex: 0,
      }
    },
    computed: {
      ...mapState("doctor", ['registration']),
      ...mapState("doctor", ['patient']),
    },
    mounted: async function(){//挂载之后才开始填充数据
      console.log("mounted");
      this.getMedicalRecordHistoryList();
      console.log("await this.getMedicalRecordHistoryList");
    },
    watch: {
      patient: {
        handler() {
          this.getMedicalRecordHistoryList();
        },
      }
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.total = filteredItems.length;
        this.currentPage = 1;
      },
      selectMedicalRecordHistory(item) {
        console.log("选择一个检查检验单");
        if(item.length===0){//选中相同的了
          console.log("选中相同的了");
          this.selectedMedicalRecordHistory = [];
        }else{
          this.selectedMedicalRecordHistory = item[0];
        }
      },
      getMedicalRecordHistoryList() {
        this.getMedicalRecordHistoryParams.patientId = this.registration.patientId;
        console.log("请求历史病历列表");
        let para = this.getMedicalRecordHistoryParams;
        console.log(para);
        this.$get(this.getMedicalRecordHistoryApi, para).then(res => {
          console.log(res);
          if (res.status === 'OK') {
            this.medicalRecordHistoryItems = res.data;//填充历史病历列表数据
            this.total = this.medicalRecordHistoryItems.length;
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
