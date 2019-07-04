<template>
  <b-card header="组套" >

    <div slot="header">
      <strong>处置组套</strong>
      <div class="card-header-actions">
        <b-button-group class="pull-right" >
          <b-button @click="deleteGroupTreatment" variant="danger"  size="sm" >删除</b-button>
          <b-button @click="checkGroupTreatment" variant="primary"  size="sm" >查看</b-button>
        </b-button-group>
      </div>
    </div>

    <b-tabs @input="changeTab">
      <!-- changeTab更换tab 个人/科室挂号列表 -->
      <b-tab v-for="(tab, index) in groupTreatmentTabs" :title="tab.title" :key="index" :active="index === currentTab" >
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
          :items="groupTreatmentList"
          :fields="groupTreatmentFields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          @row-selected="selectGroupTreatment"
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
      <b-modal  ref="group-Treatment-modal" size="lg" centered title="组套详情" okTitle="引用"
                cancelTitle="取消" @ok="onCite">
        <group-Treatment-info
          :group-treatment-info-item="groupTreatmentInfoItem">
        </group-Treatment-info>
      </b-modal>
    </b-tabs>
  </b-card>
</template>

<script>
  import GroupTreatmentInfo from "./groupTreatmentInfo";
  import {mapState} from 'vuex';
    export default {
      name: "groupTreatment",
      components:{GroupTreatmentInfo},
      data(){
        return {
          isBusy: false,
          groupTreatmentList:[],
          total:1,
          perPage:5,
          pageOptions: [5, 10, 15],
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,
          currentPage:1,
          currentTab:0,
          groupTreatmentInfoItem:{},//病历组套信息
          groupTreatmentTabs:[{//api
            title:"个人",
            getGroupTreatmentApi:"/doctor/treatment/listGroupTreatment",
            getGroupTreatmentParams:{scope:'1'},
            deleteGroupTreatmentByIdApi:"/doctor/treatment/deleteGroupTreatmentById",
            deleteGroupTreatmentByIdParams:{}
          },{
            title:"科室",
            getGroupTreatmentApi:"/doctor/treatment/listGroupTreatment",
            getGroupTreatmentParams:{scope:'2'},
            deleteGroupTreatmentByIdApi:"/doctor/treatment/deleteGroupTreatmentById",
            deleteGroupTreatmentByIdParams:{}
          },{
            title:"全院",
            getGroupTreatmentApi:"/doctor/treatment/listGroupTreatment",
            getGroupTreatmentParams:{scope:'3'},
            deleteGroupTreatmentByIdApi:"/doctor/treatment/deleteGroupTreatmentById",
            deleteGroupTreatmentByIdParams:{}
          }
          ],
          groupTreatmentFields: [
            {key: 'groupTreatmentCode', label: '组套编号', sortable: true},
            {key: 'groupTreatmentName', label: '组套名称', sortable: true},
            {key: 'doctorId', label: '创建者', sortable: true},
          ],
        }
      },
      mounted: async function(){//挂载之后才开始填充数据
        await this.getGroupTreatmentList();
        console.log("await this.getGroupTreatmentList");
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
        selectGroupTreatment(item) {//选中一个组套
          if (item.length === 0) {
            this.groupTreatmentInfoItem = {};
          } else {
            this.groupTreatmentInfoItem = Object.assign({}, item[0]);
          }
        },
        deleteGroupTreatment(){//删除检查检验组套
          if(JSON.stringify(this.groupTreatmentInfoItem)=="{}"){
            alert("请先选择组套");
          }else{
            if(this.groupTreatmentInfoItem.doctorId===this.curr_user.userId){
              this.groupTreatmentTabs[this.currentTab].deleteGroupTreatmentByIdParams.groupTreatmentId = this.groupTreatmentInfoItem.groupTreatmentId;
              this.$get(this.groupTreatmentTabs[this.currentTab].deleteGroupTreatmentByIdApi,this.groupTreatmentTabs[this.currentTab].deleteGroupTreatmentByIdParams).then(res=>{
                if(res.status === "OK"){
                  alert(res.msg);
                  this.getGroupTreatmentList();
                }else{
                  alert(res.msg);
                }
              });
            }else{

            }
          }
        },
        checkGroupTreatment(){
          if(JSON.stringify(this.groupTreatmentInfoItem)=="{}"){
            alert("请先选择组套");
          }else{
            this.$refs["group-Treatment-modal"].show();
          }
        },
        async changeTab(index){
          this.currentTab = index;
          this.currentPage = 1;
          await this.getGroupTreatmentList();
        },
        onCite(){
          this.$emit("onCite",this.groupTreatmentInfoItem);
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        getGroupTreatmentList(){
          this.groupTreatmentTabs[this.currentTab].getGroupTreatmentParams.userId=this.curr_user.userId;
          this.$get(this.groupTreatmentTabs[this.currentTab].getGroupTreatmentApi, this.groupTreatmentTabs[this.currentTab].getGroupTreatmentParams).then(res=>{
            console.log(res);
            if(res.status === 'OK'){
              this.groupTreatmentList = res.data;
              this.total = this.groupTreatmentList.length;
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
