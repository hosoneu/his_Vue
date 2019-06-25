<template>
  <b-card
    header-tag="header"
    footer-tag="footer">
    <div slot="header">
      <i class="fa fa-align-justify"></i><strong> 基础信息维护 </strong>
    </div>
    <div>
      <b-nav vertical class="w-25">
        <b-nav-item active>科室</b-nav-item>
        <b-nav-item>用户</b-nav-item>
        <b-nav-item>挂号级别</b-nav-item>
        <b-nav-item>结算类别</b-nav-item>
        <b-nav-item>诊断目录</b-nav-item>
        <b-nav-item>非药品收费项目</b-nav-item>
        <b-nav-item>排班</b-nav-item>
      </b-nav>
    </div>
  </b-card>
</template>

<script>
    export default {
        name: "verticalNavs"
    }
</script>

<style scoped>

</style>
