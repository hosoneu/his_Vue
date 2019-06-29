<template>
  <examination
    :type="this.type">
  </examination>

</template>

<script>
  import Examination from "./component/examination";
    export default {
      name: "firstExamination",
      components:{Examination},
      data(){
          return{
            type:0
          }
      }
    }
</script>

<style scoped>

</style>
