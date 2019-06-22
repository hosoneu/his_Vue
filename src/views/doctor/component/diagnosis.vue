<template>
  <b-tabs content-class="mt-3" fill>
    <b-tab title="中医诊断" active>
      <b-card>
        <template slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
          <div class="card-header-actions">
            <b-button-group class="pull-right"><!-- 此处为清空暂存提交按钮 -->
              <b-button size="sm" variant="danger">删除</b-button>
              <b-button size="sm" class="d-sm-down-none" variant="primary"> 更新</b-button>
              <b-button size="sm" class="d-sm-down-none" v-b-modal.modal-center variant="success">新增</b-button>
              <b-modal id="modal-center" centered title="新增诊断">
                <!--    主诊标志 diagnosisICD-->
                <b-form-group
                  label="ICD编码"
                  label-for="diagnosisICD"
                  :label-cols="2">
                  <b-form-input id="diagnosisICD" type="text" placeholder="请输入疾病ICD编码"></b-form-input>
                </b-form-group>

                <!--    疾病名称 diagnosisICD-->
                <b-form-group
                  label="疾病名称"
                  label-for="diagnosisName"
                  :label-cols="2">
                  <b-form-input id="diagnosisName" type="text" placeholder="请输入疾病名称"></b-form-input>
                </b-form-group>

                <!--    主诊标志 mainDiagnosisMark-->
                <b-form-group
                  label="主诊标志"
                  label-for="mainDiagnosisMark"
                  :label-cols="2">
                  <b-form-radio-group
                    id="mainDiagnosisMark"
                    v-model="mainDiagnosisSelected"
                    :options="mainDiagnosisOptions"
                  ></b-form-radio-group>
                </b-form-group>
                <!--    疑似标志 suspectMark-->
                <b-form-group
                  label="疑似标志"
                  label-for="suspectMark"
                  :label-cols="2">
                  <b-form-radio-group
                    id="suspectMark"
                    v-model="suspectMarkSelected"
                    :options="suspectMarkOptions"
                  ></b-form-radio-group>
                </b-form-group>

                <!--    发病日期 onsetDate-->
                <b-form-group
                  label="发病日期"
                  label-for="onsetDate"
                  :label-cols="2">
                  <b-form-input type="date" id="onsetDate"></b-form-input>
                </b-form-group>
              </b-modal>
            </b-button-group>
          </div>
        </template>
        <b-table
          :items="items"
          :fields="tableFields"
          :busy="isBusy">
          <template slot="onset_date" slot-scope="data">
            <b-button variant="outline-primary" size="sm" class="mr-2">删除
            </b-button>
            <b-button variant="outline-primary" size="sm" class="mr-2">编辑
            </b-button>
          </template>
        </b-table>
      </b-card>
    </b-tab>
    <b-tab title="西医诊断"></b-tab>
  </b-tabs>
</template>

<script>
    export default {
      name: "diagnosis",
      data:()=>{
        return {
          mainDiagnosisSelected: '1',
          mainDiagnosisOptions: [
            { text: '非主诊', value: '1' },
            { text: '主诊', value: '2' },
          ],
          suspectMarkSelected:'1',
          suspectMarkOptions:[
            { text: '非疑似', value: '1' },
            { text: '疑似', value: '2' },
          ],
          initialDiagnosisFields: [
            {key: 'disease_id', label: 'ICD编码', sortable: true},
            {key: 'disease_name', label: '疾病名称', sortable: true},
            {key: 'main_diagnosis_mark', label:'主诊', sortable: true},
            {key: 'suspect_mark', label:'疑似', sortable: true},
            {key: 'onset_date', label:'发病日期', sortable: true},
          ],
          innerFields:['修改','删除']
        }
      },
      computed:{
        tableFields :function(){
          return this.initialDiagnosisFields.concat((this.innerFields));
        }
      },
    }
</script>

<style scoped>

</style>
