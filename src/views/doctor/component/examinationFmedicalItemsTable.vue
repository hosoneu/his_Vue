<template>
  <div>
    <b-row>
      <b-col align="right">
        <b-button-group class="pull-right">
<!--          <b-button id="checkButton" @click="checkExaminationItem" size="md" variant="outline-dark">查看</b-button>-->
          <b-button id="resultButton" @click="resultExaminationItem" size="md" variant="outline-dark">结果</b-button>
          <b-button id="cancelButton" @click="cancelExaminationItem" size="md" variant="outline-dark">废除</b-button>
        </b-button-group>

      </b-col>
    </b-row>

    <br>
    <!--    检查检验非药品条目的列表 点击之后可以查看药品      -->
    <b-table
      show-empty
      stacked="md"
      hover
      selectable
      select-mode="single"
      :items="examinationFmedicalItemsList"
      :fields="examinationFmedicalItemsFields"
      @row-selected="selectExaminationFmedicalItems"
    >
      <template slot="purposeRequirements" slot-scope="row">
        {{row.value===''?'无':row.value}}
      </template>
    <template slot="validStatus" slot-scope="row">
      {{row.value==='1'?'有效':'无效'}}
    </template>
      <template slot="examinationResultId" slot-scope="row">
        {{row.value==0?'未出':'已出'}}
      </template>
    </b-table>

    <br>
    <examination-drugs-info
      :examination-drugs-items-list="selectedExaminationFmedicalItems.examinationDrugsItemsList"
    >
    </examination-drugs-info>
    <b-modal ref="result" size="lg" hide-footer centered title="检查结果" >
      <b-row>
        <b-col md="1">

        </b-col>
        <b-col md="10">
          <examination-results
            :examination-result="selectedExaminationFmedicalItemsResult"
          >
          </examination-results>
        </b-col>
      </b-row>
      <br>
      <!--            :examination-result="selectedExaminationFmedicalItemsResult"-->
    </b-modal>

  </div>

</template>

<script>
  import ExaminationDrugsInfo from "./examinationDrugsInfo";
  import ExaminationResults from "./examinationResult";
  export default {
    name: "examinationFmedicalItemsTable",
    components: {ExaminationDrugsInfo,ExaminationResults},
    props: {
      examinationFmedicalItemsList: {//选择的检查检验非药品项目
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        examinationFmedicalItemsFields: [//展示检查检验条目的数据域
          {key: 'fmedicalItems.fmedicalItemsCode', label: '编码', sortable: true},
          {key: 'fmedicalItems.fmedicalItemsName', label: '名称', sortable: true},
          {key: 'fmedicalItems.fmedicalItemsFormat', label: '规格', sortable: true},
          {key: 'fmedicalItems.fmedicalItemsPrice', label: '价格', sortable: true},
          {key: 'quantity', label: '数量', sortable: true},
          {key: 'actualQuantity', label: '实际数量', sortable: true},
          {key: 'department.departmentName', label: '执行科室', sortable: true},
          {key: 'purposeRequirements', label: '目的或要求', sortable: true},
          {key: 'validStatus', label: '状态', sortable: true},
          {key: 'examinationResultId', label: '结果', sortable: true},
        ],
        api:
          {
            ifExaminationItemsCanCancelApi:"/doctor/examination/ifExaminationItemsCanCancel",
            ifExaminationItemsCanCancelParams:{},
            cancelExaminationItemsApi:"/doctor/examination/cancelExaminationItems",
            cancelExaminationItemsParams:{},
            selectExaminationResultByIdApi:"/doctor/examination/selectExaminationResultById",
            selectExaminationResultByIdParams:{},
          },
        selectedExaminationFmedicalItems: {},//选中的检查检验非药品条目
        selectedExaminationFmedicalItemsResult:{},//选中的检查检验非药品条目的结果
      }
    },
    methods: {
      selectExaminationFmedicalItems(item) {//选中检查检验非药品条目
        if (item.length === 0) {
          this.selectedExaminationFmedicalItems = {};
        } else {
          this.selectedExaminationFmedicalItems = item[0];
        }
      },
      // checkExaminationItem() {
      //   this.$refs["examination-drugs-info"].show();
      // },
      resultExaminationItem(){
        if(JSON.stringify(this.selectedExaminationFmedicalItems) =='{}'){
          alert("请选中项目");
        }else{
          if(this.examinationResultId==0){//如果结果未出
            alert("还未出结果，请您耐心等待");
          }else{
            this.api.selectExaminationResultByIdParams.examinationResultId = this.selectedExaminationFmedicalItems.examinationResultId;
            this.$get(this.api.selectExaminationResultByIdApi, this.api.selectExaminationResultByIdParams).then(res => {
              if (res.status === "OK") {
                console.log(res);
                this.selectedExaminationFmedicalItemsResult = res.data;
                console.log("结果为selectedExaminationFmedicalItemsResult");
                console.log(this.selectedExaminationFmedicalItemsResult)
                //todo传值
                this.$refs["result"].show();
                console.log(res.msg + res.data);
              } else {
                console.log(res.msg);
                alert(res.msg);
              }
            });
          }
        }
      },
      cancelExaminationItem() {
        if (JSON.stringify(this.selectedExaminationFmedicalItems) =='{}' ) {
          alert("请先选中项目");
        } else {
          this.api.ifExaminationItemsCanCancelParams.examinationFmedicalItemsId= this.selectedExaminationFmedicalItems.examinationFmedicalItemsId;
          this.$get(this.api.ifExaminationItemsCanCancelApi, this.api.ifExaminationItemsCanCancelParams).then(res => {
            if (res.status === "OK") {
              if(res.data===1){//可废除
                this.api.cancelExaminationItemsParams.examinationItemsId = this.selectedExaminationFmedicalItems.examinationFmedicalItemsId;
                this.$get(this.api.cancelExaminationItemsApi, this.api.cancelExaminationItemsParams).then(res => {
                  console.log(res);
                  if (res.status === "OK") {
                    alert(res.msg);
                    console.log(res.msg + res.data);
                  } else {
                    console.log(res.msg);
                    alert(res.msg);
                  }
                });
              }else if(res.data===2){//不可废除
                alert("项目已登记，您不能废除");
              }else if(res.data===3){//已废除
                alert("您已经废除了");
              }else{
                alert("网络延迟，请稍后操作");
              }
            } else {
              console.log(res.msg);
            }
          });
        }
      },
      transformDrugsUsage(item){
        if(item.drugsUsage==='1'){
          return '静脉滴注';
        }else if(item.drugsUsage==='2'){
          return '静脉可注';
        }else if(item.drugsUsage==='3'){
          return '肌肉注射';
        }else if(item.drugsUsage==='4'){
          return '口服';
        }else if(item.drugsUsage==='5'){
          return '皮试';
        }else if(item.drugsUsage==='6'){
          return '皮下注射';
        }else{
          return '自定义';
        }
      },
      transformDaysAndTimes(item) {
        return item.days + '天' + item.times + '次';
      },
      transformDosage(item) {
        if (item.dosage == 0) {
          return "参照说明";
        } else {
          return item.dosage;
        }
      },

    }
  }
</script>

<style scoped>

</style>
