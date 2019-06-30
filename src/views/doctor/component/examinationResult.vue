<template>
  <div>
    <b-form-group
    label="检查所见"
    label-for="findings"
    :label-cols="3">
    <label id="findings">{{examinationResult.findings}}</label>
  </b-form-group>
    <b-form-group
    label="诊断建议"
    label-for="diagnosticSuggestion"
    :label-cols="3">
    <label id="diagnosticSuggestion">{{examinationResult.diagnosticSuggestion}}</label>
  </b-form-group>
    <b-form-group
      label="提交时间"
      label-for="submitTime"
      :label-cols="3">
      <label id="submitTime">{{examinationResult.submitTime.split("T")[0]+examinationResult.submitTime.split("T")[1].split(".")[0]}}</label>
    </b-form-group>
      <b-card
        v-for="(img,index) in examinationResult.examinationResultImageList"
        :key="index"
        :title="img.imageName"
        img-src="https://placekitten.com/1000/300"
        :img-alt="img.imageName"
        img-top
      >
        <b-card-text>{{img.imageUrl}}</b-card-text>
      </b-card>

  </div>
</template>

<script>
    export default {
      name: "examinationResult",
      props:{
        examinationResult:{//检查检验结果
          type:Object,
          default:()=>{return {}}
        },
      },
      data(){

      },
    }
</script>

<style scoped>

</style>
