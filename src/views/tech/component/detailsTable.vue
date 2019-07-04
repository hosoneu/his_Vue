<template>
  <b-card header="详情">
    <p>药品详情</p>
    <b-table  select-mode="single"
              show-empty
              hover :items="items" :fields="captions">
      <template slot="缴费状态" slot-scope="data">
        <!--            <b-badge :variant="success">{{data.item.amount}}</b-badge>-->
<!--        {{data.item.expenseItems.payStatus==2?"已缴费":"未缴费"}}-->
        {{getStatus(data.item)}}
      </template>
    </b-table>
    <br>

<!--    图片-->
<!--    <b-form>-->
      <b-form-group
        label="图片录入"
        label-for="basicName"
        :label-cols="2"
        :horizontal="true">
        <b-form-file v-model="imgFile" ref="file-input" class="mb-2"></b-form-file>
        <b-img :src="smmsUrl" fluid-grow ></b-img>
      </b-form-group>

<!--    <input type="file" name="theFile" onchange="document.getElementById('theFilePath').value=this.value"/>-->
<!--    <input type="hidden" id="theFilePath" name="theFilePath" value="">-->
<!--    <br>-->

    <result
    @resultEmit="resultEmit" :toptodownmessage="this.toptodownmessage"  :toptodownResultFindings="this.toptodownFindings"  :getchanged="getchangedtemp" @getchangedEmit="getchangedEmit" @isWriteEmit="details_isWriteEmit"  :isWrite="isWrite"
    @resultFindingsEmit="detailsFindingsEmit"></result>
    <br>
    <div class="pull-right">
      <b-button type="button" variant="secondary" @click="largeModal = true" v-on:click="getAllDrugs" class="mr-1">开药</b-button>
      <b-button type="button" variant="secondary" @click="FmedicalSelectedEmit" class="mr-1">登记</b-button>
      <b-button type="button" variant="secondary" @click="submitEmit" class="mr-1">提交</b-button>
    </div>

    <!--    modal-->
    <b-modal title="Modal title" size="lg" v-model="largeModal" @ok="largeModal = false" id="zhanshi">
      <div class="my-1">
        <!-- User Interface controls -->
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
                >
                  清空</b-button>
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
          :selectable="customizeSelectable"
          :select-mode="customizeSelectMode"
          show-empty
          :hover="customizeHover"
          stacked="md"
          :aria-busy="customizeIsBusy"
          :items="drugstableData"
          :fields="drugsfields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          @row-selected="rowSelected"
        >
          <template slot="amount" slot-scope="data">
<!--            <b-badge :variant="success">{{data.item.amount}}</b-badge>-->
            <input type="text" v-model="data.item.amount">
          </template>
        </b-table>
        <!--          @row-clicked="selectItem">-->
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

      <template slot="modal-footer" slot-scope="{cancel, ok}">
        <b-button size="sm" variant="success" @click="cancel();tempCancel();">
          取消
        </b-button>
        <b-button size="sm" variant="danger" @click="ok();tempOk()">
          确定
        </b-button>
      </template>
    </b-modal>
  </b-card>
</template>

<script>

    // import pictureTable from "./pictureTable";
    import result from "./result";
    import axios from 'axios';
    export default {
      name: "details",
      components:{result},
      props:{
        mfields: {
          type: [Array, Object],
          default: () => []
        },
        tableData: {
          type: [Array, Function],
          default: () => []
        },
        toptodownmessage:'',
        toptodownFindings:'',
        getchanged:0,
        isWrite:true,
        //药品items
        drugstableData: {
          type: [Array, Function],
          default: () => []
        },
        //药品fields
        drugsfields: {
          type: [Array, Object],
          default: () => []
        },
        //b-model内table属性
        customizeSelectMode:{//单选/多选 默认为单选
          type:String,
            default:()=>{return 'multi'}
        },
        customizeSelectable:{//是否可选 默认为可选
          type:Boolean,
          default:()=>{return true}
        },
        customizeHover:{//是否有选中动画 默认有选中动画
          type:Boolean,
          default:()=>{return true}
        },
        customizeIsBusy:{
          type:Boolean,
          default:()=>{return false}
        },
      },
      // mounted: function () {
      //   this.total = this.drugstableData.length;
      //   console.log("mounted时total值为" + this.total);
      // },
      data () {
        return {
          largeModal: false,
          //b-model内表格属性
          perPage: 5,//每页的个数
          pageOptions: [5, 10, 15],//每页可选页数
          currentPage:1,
          total:1,
          sortBy: null,
          sortDesc: false,
          sortDirection: 'asc',
          filter: null,

          drugsResultValue:'',
          selectedDrugs:[],//存储已选药品
          imgFile:null,//存储当前文件
          imgUrl:'',//存储当前文件url

          imgimgUrl:'',
          smmsUrl:'',

          test:''
        }
      },
      computed:{
        captions: function() { return this.mfields },
        items: function() {
          const items =  this.tableData;
          return Array.isArray(items) ? items : items();
        },
        getchangedtemp:function () {
          return this.getchanged;
        },
        drugsitems: function() {
          const drugsitems =  this.drugstableData;
          return drugsitems;
        },
        dfields:function () {
          return this.drugsfields;
        },

        // resultsMessage:function () {
        //   return this.resultsMsg;
        // },
      },
      methods:{
        getStatus:function(item){
          if (item.expenseItems) {
            return item.expenseItems.payStatus == 2 ? "已缴费" : "未缴费"
          }
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        selectItem(item){//选中某项
          console.log(item);
          // this.$emit("selectItem",item[0]);
        },

        resultEmit:function (message) {
          this.$emit('resultEmit', message);
        },
        detailsFindingsEmit:function (tempFindings) {
          this.$emit('detailsFindingsEmit', tempFindings);
        },
        getchangedEmit:function () {
          this.getchanged = 0;
          this.$emit('getchangedEmitnew');
        },
        //点击登记按钮
        FmedicalSelectedEmit:function () {
          this.$emit('FmedicalSelectedEmit')
        },
        details_isWriteEmit:function () {
          this.$emit('tech_isWriteEmit')
        },
        submitEmit:function () {
          this.$emit('submitEmit', this.imgFile);
        },
        getAllDrugs:function () {
          console.log("开始获得所有药");
          this.$emit('getAllDrugs');
        },
        rowSelected:function (items) {
          console.log(items);
          console.log("输出items");
          // if (items[items.length-1].amount == undefined){
          //   if (items.length != 0)
          //     alert("请输入数量");
          // }
          // console.log(items);
          this.selectedDrugs = items;
        },
        //点击取消
        tempCancel:function () {
          console.log("点击取消");
          this.selectedDrugs = [];
        },
        //点击确定
        tempOk:function () {
          console.log(this.selectedDrugs);
          console.log("点击确定");
          this.$emit('drugsOkEmit', this.selectedDrugs)
        },
        //sm图片上传
        smImgPost:function () {
          // console.log("我进来了");
          // this.$post("/sm",{
          //   smfile: this.imgFilesmfile
          // },{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          //   console.log("哈哈哈");
          //   console.log(res);
          //   this.imgUrl = res.url;
          //   console.log("获取图片url成功");
          // })
        },
        imgCancel:function () {
          // alert("图片取消方法");
          this.imgFile = null;
          this.smmsUrl = '';
        }
      },
      watch:{
        'isWrite':function () {
          console.log("detailsisWrite:" + this.isWrite);
        },
        'toptodownFindings':function () {
          console.log("details监测到toptodownFindings的变化" + this.toptodownFindings);
        },
        'drugstableData':function () {
          console.log("监测到drugstableData变化");
          this.total = this.drugstableData.length;
        },
        'imgFile':function () {
          console.log(this.imgFile);
          console.log("当前文件");
          //将选择文件转为url
          if (this.imgFile != null){
            console.log("upload");
            console.log(this.imgFile);
            let formData = new FormData();
            formData.append("smfile", this.imgFile);
            axios({
              method:'post',
              baseURL:"/sm",
              url:'/upload',
              data:formData
            }).then(res=> {
              console.log(res.data.url);
              console.log(res.data.data.url);
              console.log('这是sm返回的res');
              this.smmsUrl = res.data.data.url;
            });
            // let url1 = '/tech/insertExaminationResultImage';
            // let data1 = {examinationResultId}
            // this.$get(url)
          }
        }
      }
    }
</script>

<style scoped>

</style>
