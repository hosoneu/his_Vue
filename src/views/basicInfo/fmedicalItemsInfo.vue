<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
        <VerticalNavs></VerticalNavs>
      </b-col>
      <b-col lg="9">
        <DepartmentTable :caption="'非药品项目列表'" :usedData="usedData" :textFields="fmedicalItems_text_fields" :selectFields="fmedicalItems_select_fields" :multiFields="fmedicalItems_multi_fields" :table-data="items" :perPage="10" :itemType="itemType" @updateList="updateList" @deleteList="deleteList">
        </DepartmentTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import DepartmentTable from "./component/departmentTable";
    import BasicTabs from "./component/basicTabs";
    import VerticalNavs from "./component/verticalNavs"
    export default {
        name: "FmedicalItemsInfo",
        components: {DepartmentTable, BasicTabs, VerticalNavs},
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
              // {
              //   key: 'expenseTypeId',
              //   sortable: true,
              //   label: '费用科目',
              //   api: 'expenseType/getExpenseTypeById',
              //   listApi: 'expenseType/getAllExpenseType',
              //   to: 'expenseTypeName'
              // },
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
              // {
              //   key: 'departmentId',
              //   sortable: true,
              //   label: '执行科室',
              //   api: 'department/getDepartmentById',
              //   listApi: 'department/getAllDepartment',
              //   to: 'departmentName'
              // },
            ],
            items:[],
            itemType: '非药品项目',
            // department: [],
            // expenseType: [],
            usedData:{
              amount: 2,
              to: [{'1': 'departmentName'},{'2': 'expenseTypeName'}],
              department: [],
              expenseType: [],
            },
          }
        },
        mounted: async function(){
          console.log("mounted");
          this.$store.commit('common/set_curr_user_type', 'basicInfo');
          // this.departmentData = this.getDepartmentList();
          // this.expenseTypeData = this.getExpenseTypeList();
          await this.getDepartmentList();
          await this.getExpenseTypeList();
          await this.getFmedicalItemsList();
          console.log("await this.getFmedicalItemsList");

          console.log("Info处输出开始");
          // console.log(this.department);
          // console.log(this.expenseType);
          // console.log(this.items);
          // console.log(this.usedData);
          // console.log(this.usedData.department.get(0));
          // console.log(this.usedData.amount);
          console.log("Info处输出结束");
        },
        methods: {
          getFmedicalItemsList() {
            console.log("请求非药品项目列表");
            this.$get('http://localhost:8080/hoso/fmedicalItems/getAllFmedicalItemsForShow').then((res) => {
              alert(res.status);
              console.log(res.data);
              if (res.status === 'OK') {
                this.items = res.data;
                console.log("请求打印");
                console.log(this.items);
              } else {
                console.log("加载非药品项目列表失败");
              }
            })
          },
          deleteList(index, item) {
            console.log("删除科室");
            console.log(index);
            alert(item.departmentId);
            this.$get('http://localhost:8080/hoso/department/delete', {"departmentId": item.departmentId}).then((res) => {
              if (res.status === 'OK') {
                console.log("删除成功");
                this.items.splice(index, 1);
              } else {
                console.log("加载失败");
              }
            })
          },
          updateList(item) {
            console.log("更新科室");
            console.log(item);
            this.$get('updateDepartment', item).then((res) => {
              if (res.code === true) {
                console.log("更新成功");
              } else {
                console.log("加载失败");
              }
            })
          },
          getDepartmentList() {
            console.log("请求科室列表");
            this.$get('http://localhost:8080/hoso/department/getAllDepartment').then((res) => {
              alert(res.status);
              if (res.status === 'OK') {
                this.usedData.department = res.data;
                // console.log("a="+a);
                // this.usedData.department.concat(a);
                // this.usedData.department = JSON.parse(JSON.stringify(res.data));
                console.log("请求打印");
                console.log(this.usedData.department);
                // return res.data;
              } else {
                console.log("加载科室失败");
              }
            })
          },
          getExpenseTypeList() {
            console.log("请求费用科目列表");
            this.$get('http://localhost:8080/hoso/expenseType/getAllExpenseType').then((res) => {
              alert(res.status);
              if (res.status === 'OK') {
                this.usedData.expenseType = res.data;
                // this.usedData.expenseType.concat(res.data);
                // this.usedData.expenseType = res.data;
                console.log("请求打印");
                console.log(this.usedData.expenseType);
                // return res.data;
              } else {
                console.log("加载费用科目失败");
              }
            })
          },
        },
      watch:{
        'this.usedData':function () {
          alert("你在爷爷这变了 狗子");
        }
      },
    }
</script>

<style scoped>

</style>
