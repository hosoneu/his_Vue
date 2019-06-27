<template>
  <b-card header="病历模板" >
    <b-tabs @input="changeTab">
      <!-- changeTab更换tab 个人/科室挂号列表 -->
      <b-tab v-for="(tab, index) in medicalRecordTemplateTabs" :title="tab.title" :key="index" :active="index === currentTab" >
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
                >清空</b-button>
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
          show-empty
          hover
          :aria-busy="isBusy"
          :items="medicalRecordHistoryItems"
          :fields="medicalRecordTemplateFields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered">
          <!-- @filtered当本地筛选导致项目数发生变化时发出。-->

          <template slot="operate" slot-scope="row">
            <b-button @click="selectMedicalRecordTemplate(row.item, row.index)" variant="primary"  size="sm" >查看</b-button>
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

      </b-tab>
      <!-- 弹框-->
      <b-modal  ref="medical-record-template-modal" size="lg" centered title="模板详情">
        <medical-record-template-info
          :medical-record-template-info-item=medicalRecordTemplateInfoItem
        >
        </medical-record-template-info>

      </b-modal>
    </b-tabs>
  </b-card>
</template>
<script>
  import {mapState} from 'vuex';
  import MedicalRecordTemplateInfo from './medicalRecordTemplateInfo'
    export default {
      components: {MedicalRecordTemplateInfo},
      data(){
        return {
          isBusy: false,
          medicalRecordHistoryItems:[],
          total:1,
          perPage:5,
          pageOptions: [5, 10, 15],
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          currentPage:1,
          currentTab:0,
          medicalRecordTemplateInfoItem:{},//病历模板信息
          medicalRecordTemplateTabs:[{
            title:"个人",
            getMedicalRecordTemplateApi:"/doctor/homepage/listMedicalRecordHomePageTemplate",
            getMedicalRecordTemplateParams:{userId:1,scope:'1'},
          },{
            title:"科室",
            getMedicalRecordTemplateApi:"/doctor/homepage/listMedicalRecordHomePageTemplate",
            getMedicalRecordTemplateParams:{userId:1,scope:'2'},
          },{
            title:"全院",
            getMedicalRecordTemplateApi:"/doctor/homepage/listMedicalRecordHomePageTemplate",
            getMedicalRecordTemplateParams:{userId:1,scope:'3'},
          }
          ],
          medicalRecordTemplateFields: [
            {key: 'medicalRecordHomePageTemplateId', label: '模板编号', sortable: true},
            {key: 'name', label: '模板名称', sortable: true},
            {key: 'operate', label: '操作'},
          ],
        }
      },
      mounted: async function(){//挂载之后才开始填充数据
        await this.getMedicalRecordTemplateList();
        console.log("await this.getMedicalRecordTemplateList");
      },
      computed:{
        ...mapState("doctor",['doctor']),
      },
      methods:{
        selectMedicalRecordTemplate(item,index){
          console.log("进来饿了");
          this.medicalRecordTemplateInfoItem=Object.assign({},this.medicalRecordHistoryItems[index]);
          console.log(this.medicalRecordTemplateInfoItem);
          console.log("正在完");
          this.$refs["medical-record-template-modal"].show();
          console.log("出去了");
        },
        async changeTab(index){
          this.currentTab = index;
          this.currentPage = 1;
          await this.getMedicalRecordTemplateList();
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        getMedicalRecordTemplateList(){
          let data = this.medicalRecordTemplateTabs[this.currentTab].getMedicalRecordTemplateParams;
          console.log(data);
          this.$get(this.medicalRecordTemplateTabs[this.currentTab].getMedicalRecordTemplateApi, data).then(res=>{
            console.log(res);
            if(res.status === 'OK'){
              this.medicalRecordHistoryItems = res.data;
              this.total = this.medicalRecordHistoryItems.length;
              this.isBusy = false;
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
