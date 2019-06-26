<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
        <VerticalNavs></VerticalNavs>
      </b-col>
      <b-col lg="9">
        <DepartmentTable :caption="'非药品项目列表'" :initial-fields="fmedicalItems_fields" :table-data="items" :perPage="10" :itemType="itemType" @updateList="updateList" @deleteList="deleteList">
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
            fmedicalItems_fields:[
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
    }
</script>

<style scoped>

</style>
