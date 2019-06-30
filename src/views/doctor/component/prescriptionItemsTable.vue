<template>
  <b-table
    show-empty
    stacked="md"
    hover
    selectable
    select-mode="single"
    :items="prescriptionItemsList"
    :fields="prescriptionItemsFields"
    @row-selected="selectPrescriptionItems"
  >
    <template slot="drugsUsage" slot-scope="row">
      {{transformDrugsUsage(row.item)}}
    </template>

    <template slot="days" slot-scope="row">
      {{transformDaysAndTimes(row.item)}}
    </template>

    <template slot="dosage" slot-scope="row">
      {{transformDosage(row.item)}}
    </template>
  </b-table>
</template>

<script>
    export default {
      name: "prescriptionItemsTable",
      props:{
        prescriptionItemsList:{
          type:Array,
          default:()=>{return []}
        },
        prescriptionItemsFields:{
          type:Array,
          default:()=>{return [
            {key: 'drugs.drugsName', label:'名称', sortable: true},
            {key: 'drugs.drugsFormat', label:'规格', sortable: true},
            {key: 'quantity', label:'数量', sortable: true},
            {key: 'drugsUsage', label:'用法', sortable: true},
            {key: 'days', label:'频次', sortable: true},
            {key: 'dosage', label:'用量', sortable: true},
            {key: 'drugs.drugsPrice', label:'单价', sortable: true},
            {key: 'drugsAdvice', label:'医嘱'},]
          }
        }
      },
      methods:{
        transformDrugsUsage(item){
          if(item.drugsUsage==='1'){
            return '发生大';
          }else if(item.drugsUsage==='4'){
            return '口服';
          }else{
            return 'dsa';
          }
        },
        transformDaysAndTimes(item){
          return item.days+'天'+item.times+'次';
        },
        transformDosage(item){
          if(item.dosage==0){
            return "参照说明";
          }else{
            return item.dosage;
          }
        },
      }
    }
</script>

<style scoped>

</style>
