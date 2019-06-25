<template>
  <b-card>
    <div slot="header">
      HOSO医院
    </div>
    <b-tabs v-model="tabIndex[0]">
      <b-tab active>
        <template slot="title">
          <i class="cui-home icons font-2xl d-block mt-4"></i> {{tabs[0]}}
        </template>
        <br> <strong>东软云医院</strong>是集医疗、教学、科研于一体的现代化综合三级甲等医院，是国家卫生健康委指定的全国疑难重症诊治指导中心，最早承担高干保健和外宾医疗任务的医院之一，也是高等医学教育和住院医师规范化培训国家级示范基地，临床医学研究和技术创新的国家级核心基地。以学科齐全、技术力量雄厚、特色专科突出、多学科综合优势强大享誉海内外。在复旦大学医院管理研究所公布的“中国医院排行榜”中连续九年名列榜首。
      </b-tab>
      <b-tab>
        <template slot="title">
          <i class="cui-people icons font-2xl d-block mt-4"></i> {{tabs[1]}}
        </template>
        <br>
        <b-table show-empty :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" :busy="isBusy" responsive="sm" :items="items" :fields="captions" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
        </b-table>
      </b-tab>
      <b-tab>
        <template slot="title">
          <i class="cui-dollar icons font-2xl d-block mt-4"></i> {{tabs[2]}}
        </template>
        <br>
        <Bar></Bar>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
    import Bar from "../../home/charts/BarExample";
    export default {
        name: "basicTabs",
        components: {Bar},
        data(){
          return{
            tabIndex: [0, 0],
            tabs: [
              '医院概况',
              '在线职员',
              '资金周转',
            ],
            items: [
              {name: 'Mike', title: '主任医师'},
              {name: 'Alan', title: '门诊医师'},
            ],
            initialFields: [
              {
                key: 'name',
                label: 'name'
              },
              {
                key: 'title',
                label: 'title'
              }
            ]
          }
        },
      computed: {
        captions: function() { return this.initialFields },
      }
    }
</script>

<style scoped>

</style>
