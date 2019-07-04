<template>
  <div>
    <b-row>
      <b-col md="1">

      </b-col>
      <b-col md="10">
        <b-row>
          <b-col align="right">
            <b-button :disabled="this.ifReadonly" id="cancelButton" @click="cancelTreatmentItem" size="md" variant="outline-dark">废除</b-button>
          </b-col>
        </b-row>
        <br>

        <b-table
          show-empty
          stacked="md"
          hover
          selectable
          select-mode="single"
          :items="treatmentItemsList"
          :fields="treatmentItemsFields"
          @row-selected="selectTreatmentItem"
        >
          <template slot="validStatus" slot-scope="row">
            {{row.value==='1'?'有效':'无效'}}
          </template>
        </b-table>
      </b-col>
      <b-col>

      </b-col>
    </b-row>

  </div>

</template>

<script>
    export default {
      name: "treatmentItemsTable",
      data(){
          return{
            selectedTreatmentItem:{},
            treatmentItemsFields:[
              {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
              {key: 'quantity', label:'数量', sortable: true},
              {key: 'validStatus', label:'状态', sortable: true},
              {key: 'department.departmentName', label:'执行科室', sortable: true},
              ],
            api:{
              ifTreatmentItemsCanCancelApi:"/doctor/treatment/ifTreatmentItemsCanCancel",
              ifTreatmentItemsCanCancelParams:{},
              cancelTreatmentItemsByIdApi:"/doctor/treatment/cancelTreatmentItemsById",
              cancelTreatmentItemsByIdParams:{},
            },

          }
      },
      props:{
        treatmentItemsList:{
          type:Array,
          default:()=>{return []}
        },
        ifReadonly:{
          type:Boolean,
          default:()=>{return true}
        }
      },
      methods:{
        selectTreatmentItem(item){//选中一个条目可以废除
          if(item[0]===this.selectedTreatmentItem){
            this.selectedTreatmentItem = {};
          }else{
            this.selectedTreatmentItem = item[0];
          }
        },
        cancelTreatmentItem() {//废除项目
          if (JSON.stringify(this.selectedTreatmentItem) == "{}") {
            alert("请先选中项目");
          } else {
            this.api.ifTreatmentItemsCanCancelParams.treatmentItemsId = this.selectedTreatmentItem.treatmentItemsId;
            this.$get(this.api.ifTreatmentItemsCanCancelApi, this.api.ifTreatmentItemsCanCancelParams).then(res => {
              if (res.status === "OK") {
                if(res.data===1){//可废除
                  this.api.cancelTreatmentItemsByIdParams.treatmentItemsId = this.selectedTreatmentItem.treatmentItemsId;
                  this.$get(this.api.cancelTreatmentItemsByIdApi, this.api.cancelTreatmentItemsByIdParams).then(res => {
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
                  alert("患者已缴费，您不能废除");
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
      }
    }
</script>

<style scoped>

</style>
