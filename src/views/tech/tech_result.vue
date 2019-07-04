<template>
  <b-row>
    <b-col lg="12">
      <patient-info v-bind:initial-user="selected_items" ></patient-info>
      <p>ddds</p>
      <b-button size="sm" class="mr-1 btn-brand" variant="facebook" v-on:click="getData">aa</b-button>
      <p>rrr{{this.getData}}</p>
    </b-col>
  </b-row>
</template>
<script>
  alert("test_result");
  // 引用医生patientInfo
  import patientInfo from "../doctor/component/patientInfo"
  export default {
    name: "tech_result",
    components: {patientInfo},
    data: () =>{
      return {
        selected_items:{ status: "secondary", sex: "未选择a", id: '未选择', user_name: '未选择', pay_way:'未选择'},
      }
    },
    methods:{
      getData:function () {
        const routerParams = this.$route.query.fff;
        alert(routerParams);
        return routerParams;
      }
    }
  }

</script>

<style scoped>

</style>
