<template>
  <prescription-herbal
    :type="prescriptionType"
  >
  </prescription-herbal>

</template>

<script>
  import PrescriptionHerbal from './component/prescription';
    export default {
      name: "herbalPrescription",
      components:{PrescriptionHerbal},
      data(){
        return{
          prescriptionType:1,
        }
      }
    }
</script>

<style scoped>

</style>
