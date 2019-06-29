<template>
  <first-examination
    :type="this.type">
  </first-examination>

</template>

<script>
  import FirstExamination from "./component/examination";
    export default {
      name: "examination1",
      components:{FirstExamination},
      data(){
          return{
            type:0
          }
      }
    }
</script>

<style scoped>

</style>
