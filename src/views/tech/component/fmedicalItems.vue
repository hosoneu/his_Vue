<template>
  <b-card :header="caption">

    <b-table selectable
             select-mode="single"
             show-empty
             hover
             :items="items" :fields="captions"
             @row-selected="selectFmedicalEmit">
      <template slot="项目状态" slot-scope="row">
        <p>{{row.item.currentStatus}}</p>
      </template>
    </b-table>

  </b-card>
</template>
<script>


export default {
  name: 'c-table',
  inheritAttrs: false,
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    ffields: {
      type: [Array, Object],
      default: () => []
    },
    // perPage: {
    //   type: Number,
    //   default: 5
    // },
    dark: {
      type: Boolean,
      default: false
    },
    tablemessage:'请选择患者',
  },
  data: () => {
    return {
      // currentPage: 1,
      medicalModal: false,
    }
  },
  computed: {
    items: function() {
        const items =  this.tableData;
        return items;
      },
    totalRows: function () { return this.getRowCount() },
    captions: function() { return this.ffields },
  },
  methods: {
    // status: function(currentFmedical) {
    //   console.log(currentFmedical);
    //   console.log("计算属性");
    //   if (currentFmedical.validStatus!=1){
    //     return '失效';
    //   }
    //   if (currentFmedical.examinationResultId != null ){
    //     return "已提交";
    //   }
    //   else{
    //     return "未提交"
    //   }
    // },
    getRowCount: function () {
      return this.items.length
    },
    selectFmedicalEmit:function (fmedical) {
      console.log(fmedical[0]);
      console.log('fmedical')
      this.$emit('selectFmedical',fmedical[0]);
    }
  }
}
</script>
