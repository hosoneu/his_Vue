<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <DepartmentTable :hover="true" :caption="'科室列表'" :initial-fields="department_fields" :table-data="items" :perPage="10" :itemType="itemType" @updateList="updateList" @deleteList="deleteList">
        </DepartmentTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import DepartmentTable from "./component/departmentTable";

    export default {
        name: "departmentInfo",
        components: {DepartmentTable},
        data(){
          return{
            department_fields:[
              {
                key: 'department_Code',
                sortable: true,
                label: '科室编码'
              },
              {
                key: 'department_Name',
                sortable: true,
                label: '科室名称'
              },
              {
                key: 'department_Type',
                sortable: true,
                label: '科室分类'
              },
              {
                key: 'department_Category',
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
            total: 10,
            itemType: '科室'
          }
        },
      mounted: async function(){
        console.log("mounted");
        await this.getDepartmentCount();
        console.log("await this.getDepartmentCount");
        await this.getDepartmentList();
        console.log("await this.getDepartmentList");
      },
      methods: {
          getDepartmentList(){
            console.log("请求科室列表");
            console.log();
            this.$get('getDepartmentList').then((res)=> {
              console.log(res.data);
              if(res.code === true){
                this.items = res.data;
                console.log(this.items);
              }else{
                console.log("加载失败");
              }
            })
          },
        getDepartmentCount(){
          console.log("请求科室总数");
          this.$get('getDepartmentCount').then((res)=> {
            console.log(res.data);
            if(res.code === true){
              this.total = res.total;
            }else{
              console.log("加载失败");
            }
          })
        },
        deleteList(index){
          console.log("删除科室");
          console.log(index);
          this.items.splice(index, 1);
          this.$get('deleteDepartment', index).then((res)=> {
            if(res.code === true){
              console.log("删除成功");
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
        }
      }
    }

</script>

<style scoped>

</style>
