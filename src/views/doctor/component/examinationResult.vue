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
      <label id="submitTime">{{examinationResult.submitTime.split("T")[0]+" "+examinationResult.submitTime.split("T")[1].split(".")[0]}}</label>
    </b-form-group>
    <b-row>
      <b-col md="1"></b-col>
      <b-col md="10">
        <b-img :src="(!examinationResult.examinationResultImageList[0])?'#':examinationResult.examinationResultImageList[0].imageUrl" fluid ></b-img>
      </b-col>
    </b-row>

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
      // data(){
      //   return{
      //     examinationResult:{
      //       findings:"无",
      //       diagnosticSuggestion:"无",
      //       submitTime:'2019-07-04T18:20:00.241',
      //       examinationResultImageList:[
      //         {imageUrl:"http://pic37.nipic.com/20140113/8800276_184927469000_2.png"}
      //       ]
      //     }
      //   }
      // },
    }
</script>

<style scoped>

</style>
