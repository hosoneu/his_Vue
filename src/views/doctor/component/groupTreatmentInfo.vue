<template>
  <div>
    <b-card>
      <!--  主诉chiefComplaint -->
      <b-form-group
        label="组套名称"
        label-for="name"
        :label-cols="3">
        <label id="groupTreatmentName">{{groupTreatmentInfoItem.groupTreatmentName}}</label>
      </b-form-group>
      <b-form-group
        label="组套编码"
        label-for="name"
        :label-cols="3">
        <label id="groupTreatmentCode">{{groupTreatmentInfoItem.groupTreatmentCode}}</label>
      </b-form-group>

      <b-table
        show-empty
        stacked="md"
        hover
        selectable
        select-mode="single"
        :items="groupTreatmentInfoItem.groupTreatmentItemsList"
        :fields="groupTreatmentItemsFields"
      >
      </b-table>

    </b-card>
  </div>
</template>

<script>
    export default {
        name: "groupTreatmentInfo",
      props:{
        groupTreatmentInfoItem:{
          type:Object,
          default:()=>{return {}}
        }
      },
      data(){
        return{
          groupTreatmentItemsFields:[
            {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
            {key: 'quantity', label:'数量', sortable: true},
          ],
        }
      }
    }
</script>

<style scoped>

</style>
