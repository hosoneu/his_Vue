<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <patient-info
        ></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3">
        <!--  挂号列表-->
        <registration-list
          @selectPatient="selectPatient"
        >
        </registration-list>
      </b-col>
      <b-col lg="9">
        <b-card header="成药处方">
          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            填写模块
            <div class="card-header-actions">
              <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                <b-button size="sm" @click="examinationReset" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                <b-button size="sm" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 暂存</b-button>
                <b-button size="sm" @click="examinationSubmit" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
              </b-button-group>
            </div>
          </div>
          <b-tabs>
            <!--主模块部分的分菜单栏-->
            <b-tab title = "开立处方">
              <br>
              <b-card>
                <b-row>
                  <b-col md="1"></b-col>
                  <b-col md="10">
                  </b-col>
                </b-row>
              </b-card>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RegistrationList from "./registrationList";
  import PatientInfo from "./patientInfo";
    export default {
        name: "examination",
      components: {RegistrationList,PatientInfo},
      props:{
        type:{
          type:Number,//0 检查 1 检验
          default:()=>{return 0}
        }
      },
      data(){
        return{

        }
      },
      methods:{
        selectPatient(){

        },
        examinationReset(){

        },
        examinationSubmit(){

        },

      }
    }
</script>

<style scoped>

</style>
