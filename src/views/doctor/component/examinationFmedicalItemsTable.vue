<template>
  <!--    检查检验非药品条目的列表 点击之后可以查看药品      -->
  <b-table
    show-empty
    stacked="md"
    hover
    selectable
    select-mode="single"
    :items="examinationFmedicalItemsList"
    :fields="examinationFmedicalItemsFields"
    @row-selected="selectExaminationFmedicalItems"
  >
  </b-table>
</template>

<script>
    export default {
      name: "examinationFmedicalItemsTable",
      props:{
        examinationFmedicalItemsList:{//选择的检查检验非药品项目
          type:Array,
          default:()=>{return []}
        }
      },
      data(){
          return{
            examinationFmedicalItemsFields:[//展示检查检验条目的数据域
              {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
              {key: 'quantity', label:'数量', sortable: true},
              {key: 'department.departmentName', label:'执行科室', sortable: true},
              {key: 'purposeRequirements', label:'目的或要求', sortable: true},
            ],
          }
      },
      methods:{
        selectExaminationFmedicalItems(){

        }
      }
    }
</script>

<style scoped>

</style>
