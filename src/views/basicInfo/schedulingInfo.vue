<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
    <Gantt class="left-container" :tasks="tasks" style="min-height: 600px"></Gantt>
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
                {id: 1, text: 'Mike', start_date: '30-05-2019', duration: 3},
                {id: 2, text: 'Alan', start_date: '10-08-2019', duration: 3}
              ],
              // links: [
              //   {id: 1, source: 1, target: 2, type: '0'}
              // ]
            },
            doctorList: {},
            schedulingData:{},
          }
        },
        computed:{
          lastId(){
            return this.tasks.data.length;
          },
        },
        mounted: async function(){
          await this.getDoctorList();
        },
        methods:{
          getDoctorList(){
            console.log("请求医生列表");
            this.$get('http://localhost:8080/hoso/user/getUserByRole', {roleId: 1}).then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.doctorList = res.data;
              }else{
                console.log("加载医生列表失败");
              }
            })
          },
          convertInfo(schedulingData, userName){
            this.schedulingData = schedulingData;
            //计算时间间隔 转换日期类型
            // this.$moment
            let newTask = {id: this.lastId+1, text: userName, start_date: schedulingData.schedulingStarttime, duration: schedulingData.schedulingEndtime - schedulingData.schedulingttartTime};
            this.tasks.data.push(newTask);
          },
          convertRule(schedulingData, userName){
            return null;
          },
        },
    }
</script>

<style scoped>

</style>
