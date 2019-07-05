<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <DiseaseTypeTable :caption="'疾病分类'"
                          :initial-fields="diseaseTypeFields"
                          :per-page="10"
                          :table-data="usedData.diseaseType"
                          @showDisease="showDisease"
        ></DiseaseTypeTable>
      </b-col>
      <b-col lg="9">
        <BasicTable :caption="'疾病列表'" :usedData="usedData" :textFields="disease_text_fields" :selectFields="disease_select_fields" :multiFields="disease_multi_fields" :table-data="diseaseListForType" :perPage="10" :itemType="itemType" @insertList ="insertList" @updateList="updateList" @deleteList="deleteList">
        </BasicTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import BasicTable from "./component/basicTable";
    import BasicTabs from "./component/basicTabs";
    import DiseaseTypeTable from "./component/diseaseTypeTable";
    export default {
        name: "diseaseInfo",
        components: {DiseaseTypeTable, BasicTable, BasicTabs},
        data(){
          return{
            diseaseTypeFields:[
              {
                key: 'diseaseTypeCode',
                sortable: true,
                label: '疾病分类编码'
              },
              {
                key: 'diseaseTypeName',
                sortable: true,
                label: '疾病分类名称'
              },
              {
                key: 'diseaseTypeType',
                sortable: true,
                label: '疾病类别'
              },
            ],
            disease_text_fields:[
              {
                key: 'diseaseCode',
                sortable: true,
                label: '疾病编码'
              },
              {
                key: 'diseaseName',
                sortable: true,
                label: '疾病名称'
              },
              {
                key: 'diseaseIcd',
                sortable: true,
                label: '疾病ICD编码'
              },
            ],
            disease_select_fields: [],
            disease_multi_fields: [
              {
                key: 'diseaseType.diseaseTypeName',
                sortable: true,
                label: '疾病分类',
                from: 'diseaseTypeId',
                to: 'diseaseTypeName',
                table: 'diseaseType',
              },
            ],
            items:[],
            itemType: '疾病',
            usedData:{
              diseaseType: [],
            },
            diseaseListForType: [],
            //标记当前选择类别，维护操作后可直接在父组件刷新表格
            diseaseTypeId: {},
          }
        },
        mounted: async function(){
          console.log("mounted");
          // this.$store.commit('common/set_curr_user_type', 'basicInfo');
          await this.getDiseaseList();
          await this.getDiseaseTypeList();

        },
        methods: {
          getDiseaseList() {
            console.log("请求疾病列表");
            this.$get('disease/getAllDiseaseWithType').then((res) => {
              console.log(res.data);
              if (res.status === 'OK') {
                this.items = res.data;
              } else {
                console.log("加载疾病列表失败");
              }
            })
          },
          deleteList(item) {
            this.$get('disease/delete', {"id": item.diseaseId}).then((res) => {
              if (res.status === 'OK') {
                console.log("删除成功");
                this.getDiseaseList();
                this.showDisease(this.diseaseTypeId);
              } else {
                console.log("加载失败");
              }
            })
          },
          updateList(item) {
            this.$post('disease/update', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("更新成功");
                //改变数据后重新请求
                this.getDiseaseList();
                this.showDisease(this.diseaseTypeId);
              } else {
                console.log("加载失败");
              }
            })
          },
          insertList(item){
            // alert(JSON.stringify(item));
            this.$post('disease/insert', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("插入成功");
                //改变数据后重新请求
                this.getDiseaseList();
                this.showDisease(this.diseaseTypeId);
              } else {
                console.log("插入失败");
              }
            })
          },
          getDiseaseTypeList() {
            console.log("请求疾病分类列表");
            this.$get('diseaseType/getAllDiseaseType').then((res) => {
              if (res.status === 'OK') {
                this.usedData.diseaseType = res.data;
                console.log(this.usedData.diseaseType);
              } else {
                console.log("加载疾病分类失败");
              }
            })
          },
          showDisease(diseaseTypeId){
            this.diseaseTypeId = diseaseTypeId;
            //每次改变选择时，清空疾病列表，重新赋值
            this.diseaseListForType = [];
            if (diseaseTypeId != null){
              let that = this;
              //此处items即为diseaseList
              this.items.forEach(function (disease) {
                if (disease.diseaseTypeId === diseaseTypeId){
                  //此处是否使用深拷贝？
                  that.diseaseListForType.push(disease);
                }
              })
            }
          },
        },
    }
</script>

<style scoped>

</style>
