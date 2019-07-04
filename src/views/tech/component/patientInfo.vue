<template>
  <b-card>
    <b-row>
      <b-col lg="1"></b-col>
      <b-col lg="2">
        <span><i class="fa fa-id-card"> 病历号</i> : {{initialUser.medicalRecordId}}</span>
      </b-col>
      <b-col lg="2">
        <span><i class="fa fa-user"> 患者姓名</i> : {{initialUser.patientName}}</span>
      </b-col>
      <b-col lg="2">
        <span><i class="fa fa-genderless"> 性别</i> : {{initialUser.patientGender}}</span>
      </b-col>
      <b-col lg="2">
        <span><i class="fa fa-money"> 年龄</i> : {{initialUser.patientAge}}</span>
      </b-col>
      <b-col lg="2">
        <span><i class="fa fa-hashtag"> 支付方式</i> : {{initialUser.calculationTypeId}}</span>
      </b-col>
      <b-col lg="1"></b-col>
    </b-row>
  </b-card>
</template>

<script>
  export default {
    name: "patientInfo",
    props: {
      initialUser:{}
    }
  }
</script>

<style scoped>

</style>
