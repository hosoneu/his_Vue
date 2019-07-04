<template>
  <div>
    <b-table
      show-empty
      stacked="md"
      hover
      :items="groupPrescriptionInfoItem.groupPrescriptionItemsList"
      :fields="groupPrescriptionFields"
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
  </div>
</template>

<script>
    export default {
      name: "groupPrescriptionInfo",
      props:{
        groupPrescriptionInfoItem:{
          type:Object,
          default:()=>{return {}}
        }
      },
      data(){
        return{
          groupPrescriptionFields:[
            {key: 'drugs.drugsName', label:'名称', sortable: true},
            {key: 'drugs.drugsFormat', label:'规格', sortable: true},
            {key: 'quantity', label:'数量', sortable: true},
            {key: 'drugsUsage', label:'用法', sortable: true},
            {key: 'days', label:'频次', sortable: true},
            {key: 'dosage', label:'用量', sortable: true},
            {key: 'drugs.drugsPrice', label:'单价', sortable: true},
            {key: 'drugsAdvice', label:'医嘱'}
          ]
        }
      },
      methods:{
        transformDrugsUsage(item){
          if(item.drugsUsage==='1'){
            return '静脉滴注';
          }else if(item.drugsUsage==='2'){
            return '静脉可注';
          }else if(item.drugsUsage==='3'){
            return '肌肉注射';
          }else if(item.drugsUsage==='4'){
            return '口服';
          }else if(item.drugsUsage==='5'){
            return '皮试';
          }else if(item.drugsUsage==='6'){
            return '皮下注射';
          }else{
            return '自定义';
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
