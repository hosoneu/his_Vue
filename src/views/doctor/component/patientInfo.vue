<template>
    <b-card>
      <b-row>
        <b-col lg="1"></b-col>
        <b-col lg="2">
          <span><i class="fa fa-id-card"> id</i> : {{initialUser.id}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-user"> 患者姓名</i> : {{initialUser.user_name}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-genderless"> 性别</i> : {{initialUser.sex}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-money"> 缴费方式</i> : {{initialUser.pay_way}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-hashtag"> 状态</i> : <b-badge variant="primary">{{initialUser.status}}</b-badge></span>
        </b-col>
        <b-col lg="1"></b-col>
      </b-row>
    </b-card>
</template>

<script>
    export default {
      name: "patientInfo",
      props:['initialUser'],
    }
</script>

<style scoped>

</style>
