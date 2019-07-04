<template>
  <prescription-patent
    :type="prescriptionType"
  >
  </prescription-patent>

</template>

<script>
  import PrescriptionPatent from './component/prescription';
    export default {
      name: "patentPrescription",
      components:{PrescriptionPatent},
      data(){
        return{
          prescriptionType:0,
        }
      }
    }
</script>

<style scoped>

</style>
