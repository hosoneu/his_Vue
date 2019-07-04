<template>
  <div>

    <b-form-group
      label="检查\检验所见"
      :label-cols="2"
      :horizontal="true">
      <b-form-textarea
        v-on:input="resultFindingsEmit"
        id="textareaFindings"
        v-model="resultFindings"
        placeholder="在此填入检查\检验所见"
        rows="3"
        max-rows="6"
        :disabled="isWrite"
      ></b-form-textarea>
    </b-form-group>


<!--    <b-form-textarea-->
<!--      v-on:input="resultFindingsEmit"-->
<!--      id="textareaFindings"-->
<!--      v-model="resultFindings"-->
<!--      placeholder="检查\检验所见"-->
<!--      rows="3"-->
<!--      max-rows="6"-->
<!--      :disabled="isWrite"-->
<!--    ></b-form-textarea>-->

    <b-form-group
      label="诊断意见"
      :label-cols="2"
      :horizontal="true">
      <b-form-textarea
        v-on:input="resultEmit"
        id="textarea"
        v-model="amessage"
        placeholder="在此填入诊断意见"
        rows="3"
        max-rows="6"
        :disabled="isWrite"
      ></b-form-textarea>
    </b-form-group>

    <br>
<!--    <b-form-textarea-->
<!--      v-on:input="resultEmit"-->
<!--      id="textarea"-->
<!--      v-model="amessage"-->
<!--      placeholder="诊断意见"-->
<!--      rows="3"-->
<!--      max-rows="6"-->
<!--      :disabled="isWrite"-->
<!--    ></b-form-textarea>-->
  </div>
</template>

<script>
    export default {
      name: "result",
      props:{
        toptodownmessage:'',
        toptodownResultFindings:'',
        getchanged:0,
        isWrite:true,
        result_currentFmedical:{},
        toptodownFindings:'',
      },
      data(){
          return{
            amessage:'',
            resultFindings:'',
            disabledStatus:this.isWrite,
            // isBoolean:true,
          }
      },
      methods:{
        resultEmit:function () {
          console.log(this.amessage);
          console.log("result传的message");
          this.$emit('resultEmit', this.amessage);
        },
        resultFindingsEmit:function () {
          console.log(this.resultFindings);
          console.log("resultFindings");
          this.$emit('resultFindingsEmit', this.resultFindings);
        }
      },
      watch:{
        'toptodownmessage':function () {
          console.log("result 监测到toptodownmessage的变化" + this.toptodownmessage);
          if(this.isWrite == true){
            console.log("toptodownmessage进来了");
          }
          console.log("即将赋值给this.toptodownmessage的" + this.toptodownmessage);
          this.amessage = this.toptodownmessage;
          },
        'toptodownResultFindings':function(){
          console.log("result 监测到监测到resultFindings的变化" + this.toptodownResultFindings);
          if(this.isWrite == true){
            console.log("toptodownResultFindings进来了");
          }
          console.log("即将赋值给this.resultFindings" + this.toptodownResultFindings);
          this.resultFindings = this.toptodownResultFindings;
        },
        'getchanged':function() {
          // document.getElementById('textarea').value = '';
          this.getchanged = 0;
          this.$emit('getchangedEmit')
        },
        'isWrite':function () {
          console.log('result  isWrite' + this.isWrite);
          this.$emit('isWriteEmit')
        },
      }
    }
</script>

<style scoped>

</style>
