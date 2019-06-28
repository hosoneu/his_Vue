<template>
  <div>

  </div>

</template>

<script>
    export default {
      name: "examinationFmedicalForm",
      props: {
        fmedicalItems: {//传入的非药品条目
          type: Object,
          default: () => {
            return {}
          }
        }
      },
      data() {
        return {
          examinationFmedicalItemsForm:{//检查检验非药品条目
            doctorId:0,
            purposeRequirements:'',
            quantity:1,
            fmedicalItems:{},
            examinationDrugsItemsList:[],
          }
        }
      },
    }
</script>

<style scoped>

</style>
