<template>
    <b-card>
      <b-row>
        <b-col lg="1"></b-col>
        <b-col lg="2">
          <span><i class="fa fa-id-card"> 病历号</i> : {{initialPatient.medical_record_id}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-user"> 患者姓名</i> : {{initialPatient.patient_name}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-genderless"> 性别</i> : {{initialPatient.patient_sex}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-money"> 缴费方式</i> : {{initialPatient.pay_way}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-hashtag"> 状态</i> : <b-badge variant="primary">{{initialPatient.diagnosis_status}}</b-badge></span>
        </b-col>
        <b-col lg="1"></b-col>
      </b-row>
    </b-card>
</template>

<script>
    export default {
      name: "patientInfo",
      props:['initialPatient'],
    }
</script>

<style scoped>

</style>
