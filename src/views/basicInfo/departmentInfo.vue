<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <DepartmentTable :hover="true" :caption="'科室列表'" :fields="fields" :table-data="items">
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
            fields:[
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
              }
            ]
          }
        },
      methods: {
          getDepartmentList(){
            console.log("请求科室列表");
            this.$get('getDepartmentList').then((res)=> {
              console.log(res.data());
              if(res.code === true){
                this.items = res.data;
                this.isBusy = false;
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
