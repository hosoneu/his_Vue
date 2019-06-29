<template>
  <examination
    :type="this.type"
  >

  </examination>
</template>

<script>
  import Examination from "./component/examination";
    export default {
      name: "secondExamination",
      components:{Examination},
      data(){
        return{
          type:1
        }
      }

    }
</script>

<style scoped>

</style>
