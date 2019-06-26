<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
        <VerticalNavs></VerticalNavs>
      </b-col>
      <b-col lg="9">
        <DepartmentTable :caption="'科室列表'" :initial-fields="department_fields" :table-data="items" :perPage="10" :itemType="itemType" @updateList="updateList" @deleteList="deleteList">
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
        name: "departmentInfo",
        components: {DepartmentTable, BasicTabs, VerticalNavs},
        data(){
          return{
            department_fields:[
              {
                key: 'departmentCode',
                sortable: true,
                label: '科室编码'
              },
              {
                key: 'departmentName',
                sortable: true,
                label: '科室名称'
              },
              {
                key: 'departmentType',
                sortable: true,
                label: '科室分类'
              },
              {
                key: 'constantItems.constantItemsName',
                sortable: true,
                label: '科室类别'
              },
              {
                key: '删除',
                sortable: false,
                label: '删除'
              },
              {
                key: '编辑',
                sortable: false,
                label: '编辑'
              }
            ],
            items:[],
            itemType: '科室'
          }
        },
        mounted: async function(){
          this.$store.commit('common/set_curr_user_type', 'basicInfo');
          console.log("mounted");
          await this.getDepartmentList();
          console.log("await this.getDepartmentList");
        },
        methods: {
          getDepartmentList(){
            console.log("请求科室列表");
            this.$get('http://localhost:8080/hoso/department/getAllDepartmentWithCategory').then((res)=> {
              alert(res.status);
              console.log(res.data);
              if(res.status === 'OK'){
                this.items = res.data;
                console.log(this.items);
              }else{
                console.log("加载科室列表失败");
              }
            })
          },
          deleteList(index, item){
            console.log("删除科室");
            console.log(index);
            alert(item.departmentId);
            this.$get('http://localhost:8080/hoso/department/delete', {"departmentId": item.departmentId}).then((res)=> {
              if(res.status === 'OK'){
                console.log("删除成功");
                this.items.splice(index, 1);
              }else{
                console.log("加载失败");
              }
            })
          },
          updateList(item){
            console.log("更新科室");
            console.log(item);
            this.$get('updateDepartment', item).then((res)=> {
              if(res.code === true){
                console.log("更新成功");
              }else{
                console.log("加载失败");
              }
            })
          },
        }
    }

</script>

<style scoped>

</style>
