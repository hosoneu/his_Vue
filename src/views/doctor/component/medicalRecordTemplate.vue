<template>
  <b-card header="病历模板" >

    <div slot="header">
      <strong>病历模板</strong>
      <div class="card-header-actions">
        <b-button-group class="pull-right" >
          <b-button @click="deleteMedicalRecordTemplate" variant="danger"  size="sm" >删除</b-button>
          <b-button @click="checkMedicalRecordTemplate" variant="primary"  size="sm" >查看</b-button>
        </b-button-group>
      </div>
    </div>

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
        <br>
        <!-- Main table element -->
        <b-table
          show-empty
          selectable
          select-mode="single"
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
          @filtered="onFiltered"
          @row-selected="selectMedicalRecordTemplate"
        >
          <template slot="doctorId" slot-scope="row" >
            {{transformDoctor(row.item)}}
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
      <b-modal  ref="medical-record-template-modal" size="lg" centered title="模板详情" okTitle="引用"
      cancelTitle="取消" @ok="onCite">
        <medical-record-template-info
          :medical-record-template-info-item="medicalRecordTemplateInfoItem"
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
            getMedicalRecordTemplateParams:{scope:'1'},
          },{
            title:"科室",
            getMedicalRecordTemplateApi:"/doctor/homepage/listMedicalRecordHomePageTemplate",
            getMedicalRecordTemplateParams:{scope:'2'},
          },{
            title:"全院",
            getMedicalRecordTemplateApi:"/doctor/homepage/listMedicalRecordHomePageTemplate",
            getMedicalRecordTemplateParams:{scope:'3'},
          }
          ],
          medicalRecordTemplateFields: [
            {key: 'medicalRecordHomePageTemplateId', label: '模板编号', sortable: true},
            {key: 'name', label: '模板名称', sortable: true},
            {key: 'doctorId', label: '创建者', sortable: true},
          ],
          api:{
            deleteMedicalRecordHomePageTemplateApi:"/doctor/homepage/deleteMedicalRecordHomePageTemplate",
            deleteMedicalRecordHomePageTemplateParams:{}
          }
        }
      },
      mounted: async function(){//挂载之后才开始填充数据
        await this.getMedicalRecordTemplateList();
        console.log("await this.getMedicalRecordTemplateList");
      },
      computed:{
        ...mapState("common",['curr_user']),
      },
      methods:{
        selectMedicalRecordTemplate(item) {//选中一个模板
          if (item.length === 0) {
            this.medicalRecordTemplateInfoItem = {};
          } else {
            this.medicalRecordTemplateInfoItem = Object.assign({}, item[0]);
          }
        },
        transformDoctor(item){
          if(item.doctorId===this.curr_user.userId){
            return "自己";
          }else{
            return "其他";
          }
        },
        deleteMedicalRecordTemplate(){//删除病历首页模板
          if(JSON.stringify(this.medicalRecordTemplateInfoItem)=="{}"){
            alert("请先选择模板");
          }else{
            if(this.medicalRecordTemplateInfoItem.doctorId===this.curr_user.userId){
              this.api.deleteMedicalRecordHomePageTemplateParams.medicalRecordHomePageTemplateId = this.medicalRecordTemplateInfoItem.medicalRecordHomePageTemplateId;
              this.$get(this.api.deleteMedicalRecordHomePageTemplateApi,this.api.deleteMedicalRecordHomePageTemplateParams).then(res=>{
                console.log(res);
                if(res.status === "OK"){
                  console.log(res.data);
                  this.getMedicalRecordTemplateList();
                }else{
                  console.log("插入失败");
                }
              });
            }else{
              alert("您不能删除其他人创建的模板");
            }
          }
        },
        checkMedicalRecordTemplate(){
          if(JSON.stringify(this.medicalRecordTemplateInfoItem)=="{}"){
            alert("请先选择模板");
          }else{
            this.$refs["medical-record-template-modal"].show();
          }
        },
        async changeTab(index){
          this.currentTab = index;
          this.currentPage = 1;
          await this.getMedicalRecordTemplateList();
        },
        onCite(){
          this.$emit("onCite",this.medicalRecordTemplateInfoItem);
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        getMedicalRecordTemplateList(){
          this.medicalRecordTemplateTabs[this.currentTab].getMedicalRecordTemplateParams.userId=this.curr_user.userId;
          this.$get(this.medicalRecordTemplateTabs[this.currentTab].getMedicalRecordTemplateApi, this.medicalRecordTemplateTabs[this.currentTab].getMedicalRecordTemplateParams).then(res=>{
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
