<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
    <Gantt class="left-container" ref="gantt" :temp="scheduling"  :newTask="newTasks" style="min-height: 600px"></Gantt>
      </b-col>
    </b-row>
    <b-row></b-row>
    <b-row>
      <b-col>
        <SchedulingInfoForm @convertInfo="convertInfo" @convertRule="convertRule" :doctor-list="doctorList"></SchedulingInfoForm>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import Gantt from './component/gantt';
    import SchedulingInfoForm from './component/schedulingInfoForm'
    export default {
        name: "schedulingInfo",
        components: {Gantt, SchedulingInfoForm},
        data () {
          return {
            tasks: {
              data: [
                //显示起始时间前一天和后一天
                // {id: 1, text: 'Mike', start_date: '30-05-2019', duration: 3},
                // {id: 2, text: 'Alan', start_date: '10-08-2019', duration: 3}
              ],
              // links: [
              //   {id: 1, source: 1, target: 2, type: '0'}
              // ]
            },
            doctorList: {},
            schedulingList:[],
            newTasks: [],
          }
        },
        computed:{
          lastId(){
            return this.tasks.data.length;
          },
          scheduling(){
            let taskData = [];
            let that = this;
            this.schedulingList.forEach(function (schedulingInfo) {
              let startDate= new Date(Date.parse(schedulingInfo.schedulingStarttime));
              let endDate= new Date(Date.parse(schedulingInfo.schedulingEndtime));
              let timeDuration = Math.floor((endDate - startDate) / 1000 / 60 / 60);
              schedulingInfo.schedulingStarttime = schedulingInfo.schedulingStarttime.substring(0, 10);
              schedulingInfo.schedulingEndtime = schedulingInfo.schedulingEndtime.substring(0, 10);
              schedulingInfo.schedulingStarttime = that.$moment(schedulingInfo.schedulingStarttime).format("DD-MM-YYYY");
              // let dd = startDate.getDate();
              // alert(dd);
              // let mm = startDate.getMonth()+1;
              // alert(mm);
              // let yyyy = startDate.getFullYear();
              // alert(yyyy);
              // let date = dd + "-" + mm + "-" + yyyy;
              console.log(schedulingInfo.schedulingStarttime);
              // this.schedulingData.schedulingStarttime = this.$moment(schedulingInfo.schedulingStarttime).format("DD-MM-YYYY");
              taskData.push({id: schedulingInfo.schedulingInfoId, text: schedulingInfo.user.userName, start_date: schedulingInfo.schedulingStarttime, duration: timeDuration});
              // this.gantt.addTask({id: schedulingInfo.schedulingInfoId, text: schedulingInfo.user.userName, start_date: schedulingInfo.schedulingStarttime, duration: timeDuration});
            });
            let tasks = {};
            tasks.data = taskData;
            return tasks;
          },
        },
        mounted: async function(){
          await this.getDoctorList();
          await this.getSchedulingList();
          // this.gantt.refreshData();
        },
        methods:{
          getDoctorList(){
            console.log("请求医生列表");
            this.$get('user/getUserByRole', {roleId: 1}).then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.doctorList = res.data;
              }else{
                console.log("加载医生列表失败");
              }
            })
          },
          getSchedulingList(){
            console.log("请求排班列表");
            this.$get('scheduling/getAllSchedulingInfoWithUserName').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.schedulingList = res.data;
              }else{
                console.log("加载医生列表失败");
              }
            })
          },
          convertInfo(schedulingInfo, userName){
            this.schedulingData = schedulingInfo;
            //计算时间间隔 转换日期类型
            let timeDuration = Math.floor((this.schedulingData.schedulingEndtime - this.schedulingData.schedulingStarttime) / 1000 / 60 / 60); // 小时
            //剪切到日期
            let dd = this.schedulingData.schedulingStarttime.getDay();
            let mm = this.schedulingData.schedulingStarttime.getMonth();
            let yyyy = this.schedulingData.schedulingStarttime.getFullYear();
            let date = dd + "-" + mm + "-" + yyyy;
            // this.schedulingData.schedulingStarttime = this.$moment(schedulingInfo.schedulingStarttime).format("DD-MM-YYYY");
            let newTask = {id: this.lastId+1, text: userName, start_date: date, duration: timeDuration};
            //调用子组件方法
            // this.$refs["gantt"].addTask(newTask);
            // this.newTasks.push(newTask);
          },
          convertRule(schedulingData, userName){
            return null;
          },
        },
    }
</script>

<style scoped>

</style>
