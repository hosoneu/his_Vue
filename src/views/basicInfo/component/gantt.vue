<template>
  <div ref="gantt"></div>
</template>

<script>
    import gantt from 'dhtmlx-gantt'  // 引入模块
    import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
    import 'dhtmlx-gantt/codebase/locale/locale_cn'  // 本地化
    export default {
        name: "gantt",
        props: {
          // tasks: {
          //   type: Object,
          //   default () {
          //     return {data: [], links: []}
          //   },
          temp: {
            type: Object,
            default() {
              return {data: [], links: []}
            },
          },
        },
          data() {
            return {
              tasks: [],
            }
          },
          mounted() {
            // this.$store.commit('common/set_curr_user_type', 'basicInfo');
            //设置甘特表为工作时间表 默认周六日不上班，可根据后续setWorkTime调整
            gantt.config.work_time = true;  // removes non-working time from calculations
            //设置小时为duration单位
            gantt.config.duration_unit = "hour";//an hour

            // gantt.config.duration_step = 3;
            //so if task.duration = 2, the task will long 6 hours

            //上班时间为7-20
            gantt.setWorkTime({hours: [7, 20]});
            //周六上下班时间变更
            gantt.setWorkTime({day: 6, hours: [8, 18]});
            //周日上下班时间变更
            gantt.setWorkTime({day: 0, hours: [8, 18]});
            // 在时间线上增加一行年份显示
            gantt.config.subscales = [
              {
                unit: 'year',
                step: 1,
                date: '%Y'
              }
            ];
            // 初始化
            gantt.init(this.$refs.gantt);
            // 数据解析
            // gantt.parse(this.$props.tasks);
            // gantt.parse(this.tasks)
          },
          watch: {
            "temp": function () {
              console.log("变化");
              console.log(this.temp);
              this.tasks = this.temp;
              gantt.parse(this.tasks);
              // gantt.refreshData();
            },
          },
        methods :{
          addTask(newTask){
            alert("调用");
            gantt.addTask(newTask);
            gantt.refreshData();
          },
        },
    }
</script>

<style scoped>

</style>
