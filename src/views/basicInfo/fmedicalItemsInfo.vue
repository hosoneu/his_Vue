<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
      </b-col>
      <b-col lg="9">
        <BasicTable :caption="'非药品项目列表'" :usedData="usedData" :textFields="fmedicalItems_text_fields" :selectFields="fmedicalItems_select_fields" :multiFields="fmedicalItems_multi_fields" :table-data="items" :perPage="10" :itemType="itemType" @insertList ="insertList" @updateList="updateList" @deleteList="deleteList">
        </BasicTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import BasicTable from "./component/basicTable";
    import BasicTabs from "./component/basicTabs";
    export default {
        name: "fmedicalItemsInfo",
        components: {BasicTable, BasicTabs},
        data(){
          return{
            fmedicalItems_text_fields:[
              {
                key: 'fmedicalItemsCode',
                sortable: true,
                label: '非药品项目编码'
              },
              {
                key: 'fmedicalItemsName',
                sortable: true,
                label: '非药品项目名称'
              },
              {
                key: 'fmedicalItemsFormat',
                sortable: true,
                label: '规格'
              },
              {
                key: 'fmedicalItemsPrice',
                sortable: true,
                label: '单价'
              },
              {
                key: 'fmedicalItemsMnemoniccode',
                sortable: true,
                label: '助记码'
              },
              {
                key: 'createTime',
                sortable: true,
                label: '创建时间'
              }
            ],
            fmedicalItems_select_fields: [
              {
                key: 'fmedicalItemsType',
                sortable: true,
                label: '项目类别',
                options: [
                  {text: '检查', value: '1'},
                  {text: '检验', value: '2'},
                  {text: '处置', value: '3'},
                ]
              },
            ],
            fmedicalItems_multi_fields: [
              {
                key: 'expenseType.expenseTypeName',
                sortable: true,
                label: '费用科目',
                from: 'expenseTypeId',
                to: 'expenseTypeName',
                table: 'expenseType',
              },
              {
                key: 'department.departmentName',
                sortable: true,
                label: '执行科室',
                from: 'departmentId',
                to: 'departmentName',
                table: 'department',
              },
            ],
            items:[],
            itemType: '非药品项目',
            usedData:{
              department: [],
              expenseType: [],
            },
          }
        },
        mounted: async function(){
          console.log("mounted");
          // this.$store.commit('common/set_curr_user_type', 'basicInfo');
          await this.getDepartmentList();
          await this.getExpenseTypeList();
          await this.getFmedicalItemsList();

        },
        methods: {
          getFmedicalItemsList() {
            console.log("请求非药品项目列表");
            this.$get('fmedicalItems/getAllFmedicalItemsForShow').then((res) => {
              console.log(res.data);
              if (res.status === 'OK') {
                this.items = res.data;
                console.log(this.items);
              } else {
                console.log("加载非药品项目列表失败");
              }
            })
          },
          deleteList(item) {
            this.$get('fmedicalItems/delete', {"id": item.fmedicalItemsId}).then((res) => {
              if (res.status === 'OK') {
                console.log("删除成功");
                this.getFmedicalItemsList();
              } else {
                console.log("加载失败");
              }
            })
          },
          updateList(item) {
            this.$post('fmedicalItems/update', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("更新成功");
                //改变数据后重新请求
                this.getFmedicalItemsList();
              } else {
                console.log("加载失败");
              }
            })
          },
          insertList(item){
            // alert(JSON.stringify(item));
            this.$post('fmedicalItems/insert', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("插入成功");
                //改变数据后重新请求
                this.getFmedicalItemsList();
              } else {
                console.log("插入失败");
              }
            })
          },
          getDepartmentList() {
            console.log("请求科室列表");
            this.$get('department/getAllDepartment').then((res) => {
              if (res.status === 'OK') {
                this.usedData.department = res.data;
                console.log(this.usedData.department);
              } else {
                console.log("加载科室失败");
              }
            })
          },
          getExpenseTypeList() {
            console.log("请求费用科目列表");
            this.$get('expenseType/getAllExpenseType').then((res) => {
              if (res.status === 'OK') {
                this.usedData.expenseType = res.data;
                console.log(this.usedData.expenseType);
              } else {
                console.log("加载费用科目失败");
              }
            })
          },
        },
    }
</script>

<style scoped>

</style>
