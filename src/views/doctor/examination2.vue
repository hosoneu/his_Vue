<template>

  <second-examination
    :type="this.type"
  >

  </second-examination>
</template>

<script>
  import SecondExamination from "./component/examination";
    export default {
      name: "examination2",
      components:{SecondExamination},
      data(){
        return{
          type:1
        }
      }

    }
</script>

<style scoped>

</style>
