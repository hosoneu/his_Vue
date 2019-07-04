<template>
  <div>
    <b-card>
      <!--  主诉chiefComplaint -->
      <b-form-group
        label="组套名称"
        label-for="name"
        :label-cols="3">
        <label id="groupExaminationName">{{groupExaminationInfoItem.groupExaminationName}}</label>
      </b-form-group>
      <b-form-group
        label="组套编码"
        label-for="name"
        :label-cols="3">
        <label id="groupExaminationCode">{{groupExaminationInfoItem.groupExaminationCode}}</label>
      </b-form-group>

      <b-table
        show-empty
        stacked="md"
        hover
        selectable
        select-mode="single"
        :items="groupExaminationInfoItem.groupExaminationFmedicalItemsList"
        :fields="groupExaminationFmedicalItemsFields"
        @row-selected="selectExaminationFmedicalItems"
      >
      </b-table>

    </b-card>

    <b-card>
      <b-table
        show-empty
        stacked="md"
        hover
        :items="selectedGroupExaminationFmedicalItems.groupExaminationDrugsItemsList"
        :fields="groupExaminationDrugsFields"
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
    </b-card>

  </div>

</template>

<script>
    export default {
      name: "groupExaminationInfo",
      props:{
        groupExaminationInfoItem:{
          type:Object,
          default:()=>{return {}}
        }
      },
      data(){
        return{
          selectedGroupExaminationFmedicalItems:{},
          groupExaminationFmedicalItemsFields:[
            {key: 'fmedicalItems.fmedicalItemsCode', label: '编码', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsName', label: '名称', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsFormat', label: '规格', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsPrice', label: '价格', sortable: true},
            {key: 'quantity', label: '数量', sortable: true},
            {key: 'purposeRequirements', label: '目的或要求', sortable: true},
          ],
          groupExaminationDrugsFields:[
            {key: 'drugs.drugsName', label:'名称', sortable: true},
            {key: 'drugs.drugsFormat', label:'规格', sortable: true},
            {key: 'quantity', label:'数量', sortable: true},
            {key: 'drugsUsage', label:'用法', sortable: true},
            {key: 'days', label:'频次', sortable: true},
            {key: 'dosage', label:'用量', sortable: true},
            {key: 'drugs.drugsPrice', label:'单价', sortable: true},
          ]
        }

      },
      methods:{
        transformDrugsUsage(item){
          // 1 静脉滴注 2 静脉可注 3 肌肉注射 4 口服 5 皮试 6 皮下注射
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
        selectExaminationFmedicalItems(item){
          if (item.length === 0) {
            this.selectedGroupExaminationFmedicalItems = {};
          } else {
            this.selectedGroupExaminationFmedicalItems = item[0];
            console.log("现在选中的 是");
            console.log(this.selectedGroupExaminationFmedicalItems);
          }
        }
      }
    }
</script>

<style scoped>

</style>
