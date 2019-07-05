<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
      </b-col>
      <b-col lg="9">
        <DrugsTable :caption="'药品项目列表'" :usedData="usedData" :textFields="drugs_text_fields" :selectFields="drugs_select_fields" :multiFields="drugs_multi_fields" :table-data="items" :perPage="10" :itemType="itemType" @insertList ="insertList" @updateList="updateList" @deleteList="deleteList">
        </DrugsTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import DrugsTable from "./component/drugsTable";
    import BasicTabs from "./component/basicTabs";
    export default {
        name: "drugsInfo",
      components: {BasicTabs, DrugsTable},
      data(){
          return{
            drugs_text_fields:[
              {
                key: 'drugsCode',
                sortable: true,
                label: '药品编码'
              },
              {
                key: 'drugsName',
                sortable: true,
                label: '药品名称'
              },
              {
                key: 'drugsFormat',
                sortable: true,
                label: '规格'
              },
              {
                key: 'drugsPrice',
                sortable: true,
                label: '单价'
              },
              {
                key: 'drugsManufacturer',
                sortable: true,
                label: '生产厂家'
              },
            ],
            drugs_select_fields: [],
            drugs_multi_fields: [
              {
                key: 'drugsDosage.constantItemsName',
                sortable: true,
                label: '药品类型',
                from: 'drugsDosageId',
                to: 'constantItemsName',
                table: 'drugsDosage',
              },
              {
                key: 'drugsType.constantItemsName',
                sortable: true,
                label: '药品剂型',
                from: 'drugsTypeId',
                to: 'constantItemsName',
                table: 'drugsType',
              },
            ],
            items:[],
            itemType: '药品',
            usedData:{
              drugsDosage: [],
              drugsType: [],
            },
          }
        },
        mounted: async function(){
          console.log("mounted");
          // this.$store.commit('common/set_curr_user_type', 'basicInfo');
          await this.getDrugsList();
          await this.getDrugsDosageList();
          await this.getDrugsTypeList();

        },
        methods: {
          getDrugsList() {
            console.log("请求药品列表");
            this.$get('drug/getAllDrugsWithTypeAndDosage').then((res) => {
              console.log(res.data);
              if (res.status === 'OK') {
                this.items = res.data;
                console.log(this.items);
              } else {
                console.log("加载药品列表失败");
              }
            })
          },
          deleteList(item) {
            this.$get('drug/delete', {"id": item.drugsId}).then((res) => {
              if (res.status === 'OK') {
                console.log("删除成功");
                this.getDrugsList();
              } else {
                console.log("加载失败");
              }
            })
          },
          updateList(item) {
            this.$post('drug/update', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("更新成功");
                //改变数据后重新请求
                this.getDrugsList();
              } else {
                console.log("加载失败");
              }
            })
          },
          insertList(item){
            // alert(JSON.stringify(item));
            this.$post('drug/insert', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("插入成功");
                //改变数据后重新请求
                this.getDrugsList();
              } else {
                console.log("插入失败");
              }
            })
          },
          getDrugsDosageList() {
            console.log("请求药品剂型列表");
            this.$get('drug/getDrugsDosage').then((res) => {
              if (res.status === 'OK') {
                this.usedData.drugsDosage = res.data;
                console.log(this.usedData.drugsDosage);
              } else {
                console.log("加载药品剂型失败");
              }
            })
          },
          getDrugsTypeList() {
            console.log("请求药品类型列表");
            this.$get('drug/getDrugsType').then((res) => {
              if (res.status === 'OK') {
                this.usedData.drugsType = res.data;
                console.log(this.usedData.drugsType);
              } else {
                console.log("加载药品类型失败");
              }
            })
          },
        },
    }
</script>

<style scoped>

</style>
