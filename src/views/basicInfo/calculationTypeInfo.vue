<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
      </b-col>
      <b-col lg="9">
        <BasicTable :caption="'结算类别列表'" :textFields="calculationType_text_fields" :selectFields="calculationType_select_fields" :multiFields="calculationType_multi_fields" :table-data="items" :perPage="10" :itemType="itemType" @insertList ="insertList" @updateList="updateList" @deleteList="deleteList">
        </BasicTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import BasicTable from "./component/basicTable";
    import BasicTabs from "./component/basicTabs";
    export default {
        name: "calculationTypeInfo",
        components: {BasicTable, BasicTabs},
        data(){
          return{
            calculationType_text_fields:[
              {
                key: 'calculationTypeName',
                sortable: true,
                label: '结算类别名称'
              },
            ],
            calculationType_select_fields: [],
            calculationType_multi_fields: [],
            items:[],
            itemType: '结算类别',
          }
        },
        mounted: async function(){
          console.log("mounted");
          // this.$store.commit('common/set_curr_user_type', 'basicInfo');
          await this.getCalculationTypeList();
        },
        methods: {
          getCalculationTypeList() {
            console.log("请求结算类别列表");
            this.$get('calculationType/getAllCalculationType').then((res) => {
              console.log(res.data);
              if (res.status === 'OK') {
                this.items = res.data;
              } else {
                console.log("加载结算类别列表失败");
              }
            })
          },
          deleteList(item) {
            this.$get('calculationType/delete', {"id": item.calculationTypeId}).then((res) => {
              if (res.status === 'OK') {
                console.log("删除成功");
                this.getCalculationTypeList();
              } else {
                console.log("加载失败");
              }
            })
          },
          updateList(item) {
            this.$post('calculationType/update', JSON.stringify(item)).then((res) => {
              if (res.code === true) {
                console.log("更新成功");
                //改变数据后重新请求
                this.getCalculationTypeList();
              } else {
                console.log("加载失败");
              }
            })
          },
          insertList(item) {
            // alert(JSON.stringify(item));
            this.$post('calculationType/insert', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("插入成功");
                //改变数据后重新请求
                this.getCalculationTypeList();
              } else {
                console.log("插入失败");
              }
            })
          },
        }
    }
</script>

<style scoped>

</style>
