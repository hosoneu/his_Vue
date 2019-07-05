<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
      </b-col>
      <b-col lg="9">
        <BasicTable :caption="'费用科目列表'" :textFields="expenseType_text_fields" :selectFields="expenseType_select_fields" :multiFields="expenseType_multi_fields" :table-data="items" :perPage="10" :itemType="itemType" @insertList ="insertList" @updateList="updateList" @deleteList="deleteList">
        </BasicTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import BasicTable from "./component/basicTable";
    import BasicTabs from "./component/basicTabs";
    export default {
        name: "expenseTypeInfo",
        components: {BasicTable, BasicTabs},
        data(){
          return{
            expenseType_text_fields:[
              {
                key: 'expenseTypeCode',
                sortable: true,
                label: '费用科目编码'
              },
              {
                key: 'expenseTypeName',
                sortable: true,
                label: '费用科目名称'
              },
            ],
            expenseType_select_fields: [],
            expenseType_multi_fields: [],
            items:[],
            itemType: '费用科目',
          }
        },
        mounted: async function(){
          console.log("mounted");
          // this.$store.commit('common/set_curr_user_type', 'basicInfo');
          await this.getExpenseTypeList();
        },
        methods: {
          getExpenseTypeList() {
            console.log("请求费用科目列表");
            this.$get('expenseType/getAllExpenseType').then((res) => {
              console.log(res.data);
              if (res.status === 'OK') {
                this.items = res.data;
              } else {
                console.log("加载费用科目列表失败");
              }
            })
          },
          deleteList(item) {
            this.$get('expenseType/delete', {"id": item.expenseTypeId}).then((res) => {
              if (res.status === 'OK') {
                console.log("删除成功");
                this.getExpenseTypeList();
              } else {
                console.log("加载失败");
              }
            })
          },
          updateList(item) {
            this.$post('expenseType/update', JSON.stringify(item)).then((res) => {
              if (res.code === true) {
                console.log("更新成功");
                //改变数据后重新请求
                this.getExpenseTypeList();
              } else {
                console.log("加载失败");
              }
            })
          },
          insertList(item) {
            // alert(JSON.stringify(item));
            this.$post('expenseType/insert', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("插入成功");
                //改变数据后重新请求
                this.getExpenseTypeList();
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
