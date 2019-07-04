<template>
  <b-card header="组套" >

    <div slot="header">
      <strong>{{this.type===0?'成药组套':'草药组套'}}</strong>
      <div class="card-header-actions">
        <b-button-group class="pull-right" >
          <b-button @click="deleteGroupPrescription" variant="danger"  size="sm" >删除</b-button>
          <b-button @click="checkGroupPrescription" variant="primary"  size="sm" >查看</b-button>
        </b-button-group>
      </div>
    </div>

    <b-tabs @input="changeTab">
      <!-- changeTab更换tab 个人/科室挂号列表 -->
      <b-tab v-for="(tab, index) in groupPrescriptionTabs" :title="tab.title" :key="index" :active="index === currentTab" >
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
          :items="groupPrescriptionList"
          :fields="groupPrescriptionFields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          @row-selected="selectGroupPrescription"
        >
          <template slot="doctorId" slot-scope="row">
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
      <b-modal  ref="group-Prescription-modal" size="lg" centered title="组套详情" okTitle="引用"
                cancelTitle="取消" @ok="onCite">
        <group-Prescription-info
          :group-prescription-info-item="groupPrescriptionInfoItem">
        </group-Prescription-info>
      </b-modal>
    </b-tabs>
  </b-card>  
</template>

<script>
  import {mapState} from "vuex";
  import GroupPrescriptionInfo from "./groupPrescriptionInfo";
    export default {
      name: "groupPrescription",
      components:{GroupPrescriptionInfo},
      props:{
        type:{
          type:Number,
          default:()=>{return 0}
        }
      },
      data(){
        return {
          isBusy: false,
          groupPrescriptionList:[],
          total:1,
          perPage:5,
          pageOptions: [5, 10, 15],
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          currentPage:1,
          currentTab:0,
          groupPrescriptionInfoItem:{},//病历组套信息
          groupPrescriptionTabs:[{//api
            title:"个人",
            api:[
              {getGroupPrescriptionApi:"/doctor/prescription/patent/listGroupPrescription",//0成药
              getGroupPrescriptionParams:{scope:'1'}},
              {getGroupPrescriptionApi:"/doctor/prescription/herbal/listGroupPrescription",//1草药
                getGroupPrescriptionParams:{scope:'1'}}
            ]
          },
            {//api
              title:"科室",
              api:[
                {getGroupPrescriptionApi:"/doctor/prescription/patent/listGroupPrescription",//0成药
                  getGroupPrescriptionParams:{scope:'2'}},
                {getGroupPrescriptionApi:"/doctor/prescription/herbal/listGroupPrescription",//1草药
                  getGroupPrescriptionParams:{scope:'2'}}
              ]
            },
            {//api
              title:"全院",
              api:[
                {getGroupPrescriptionApi:"/doctor/prescription/patent/listGroupPrescription",//0成药
                  getGroupPrescriptionParams:{scope:'3'}},
                {getGroupPrescriptionApi:"/doctor/prescription/herbal/listGroupPrescription",//1草药
                  getGroupPrescriptionParams:{scope:'3'}}
              ]
            },
          ],
          groupPrescriptionFields: [
            {key: 'groupPrescriptionCode', label: '组套编号', sortable: true},
            {key: 'groupPrescriptionName', label: '组套名称', sortable: true},
            {key: 'doctorId', label: '创建者', sortable: true},
          ],
        }
      },
      mounted: async function(){//挂载之后才开始填充数据
        await this.getGroupPrescriptionList();
        console.log("await this.getGroupPrescriptionList");
      },
      computed:{
        ...mapState("common",['curr_user']),
      },
      methods:{
        transformDoctor(item){
          if(item.doctorId===this.curr_user.userId){
            return "自己";
          }else{
            return "其他";
          }
        },
        selectGroupPrescription(item) {//选中一个组套
          if (item.length === 0) {
            this.groupPrescriptionInfoItem = {};
          } else {
            console.log("开始了");
            this.groupPrescriptionInfoItem = Object.assign({}, item[0]);
            console.log(this.groupPrescriptionInfoItem);
          }
        },
        deleteGroupPrescription(){//删除检查检验组套
          // if(JSON.stringify(this.groupPrescriptionInfoItem)=="{}"){
          //   alert("请先选择组套");
          // }else{
          //     this.api.deleteMedicalRecordHomePageTemplateParams.medicalRecordHomePageTemplateId = this.groupPrescriptionInfoItem.medicalRecordHomePageTemplateId;
          //     this.$get(this.api.deleteMedicalRecordHomePageTemplateApi,this.api.deleteMedicalRecordHomePageTemplateParams).then(res=>{
          //       console.log(res);
          //       if(res.status === "OK"){
          //         console.log(res.data);
          //         this.getGroupPrescriptionList();
          //       }else{
          //         console.log("插入失败");
          //       }
          //     });
          // }
        },
        checkGroupPrescription(){
          if(JSON.stringify(this.groupPrescriptionInfoItem)=="{}"){
            alert("请先选择组套");
          }else{
            this.$refs["group-Prescription-modal"].show();
          }
        },
        async changeTab(index){
          this.currentTab = index;
          this.currentPage = 1;
          await this.getGroupPrescriptionList();
        },
        onCite(){
          this.$emit("onCite",this.groupPrescriptionInfoItem);
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        getGroupPrescriptionList(){
          this.groupPrescriptionTabs[this.currentTab].api[this.type].getGroupPrescriptionParams.userId=this.curr_user.userId;
          this.$get(this.groupPrescriptionTabs[this.currentTab].api[this.type].getGroupPrescriptionApi, this.groupPrescriptionTabs[this.currentTab].api[this.type].getGroupPrescriptionParams).then(res=>{
            console.log(res);
            if(res.status === 'OK'){
              this.groupPrescriptionList = res.data;
              this.total = this.groupPrescriptionList.length;
              this.isBusy = false;
            }else{
              console.log("加载失败");
            }
          });
        },
      },
    }
</script>

<style scoped>

</style>
