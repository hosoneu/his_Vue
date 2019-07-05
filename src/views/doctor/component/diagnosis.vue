<template>
      <div>
        <b-card :hidden="!ifSeen">
          <b-row>
            <b-col md="1">

            </b-col>
            <b-col md="10">
              <b-row>
                <b-col align="right">
                  <b-button-group class="pull-right" >
                    <!--检索疾病-->
                    <b-button id="searchButton" v-b-modal="computedModalId" size="md" variant="outline-dark">检索</b-button>
                    <!--常用诊断-->
                    <b-button id="commonlyUsedButton" v-b-modal="computedCommonlyUsedModalId" size="md" variant="outline-dark">常用</b-button>
                    <b-button type="button" @click="onReset" size="md" variant="outline-dark">清空</b-button>
                    <b-button type="submit" @click="onSubmit" size="md" variant="outline-dark">新增</b-button>
                  </b-button-group>
                </b-col>
              </b-row>
              <br>
              <b-modal :id="computedModalId" okTitle="确认" cancelTitle="取消" @ok="selectDiseaseOk" @cancel="selectDiseaseCancel" size="lg" centered title="检索疾病">
                <disease-modal
                  @selectDisease="selectDisease"
                  :type=this.type
                ></disease-modal>
              </b-modal>

              <b-modal :id="computedCommonlyUsedModalId" @ok="selectCommonlyUsedItemOk" @cancel="selectCommonlyUsedItemCancel" okTitle="确认" cancelTitle="取消" size="lg" centered title="常用诊断">
                <commonly-used-diagnosis
                  @selectCommonlyUsedItem="selectCommonlyUsedItem"
                  :type=0
                  :commonly-used-type=this.type
                  :commonly-used-api=this.commonlyUsedApi
                  :commonly-used-fields=this.commonlyUsedFields
                ></commonly-used-diagnosis>
              </b-modal>

              <b-form >
                <b-row>
                  <b-col md="6">
                    <!--    疾病ICD diseaseIcd-->
                    <b-form-group
                      label="疾病ICD"
                      label-for="diseaseIcd"
                      :label-cols="3">
                      <b-form-input id="diseaseIcd" required disabled v-model="diagnosisForm.disease.diseaseIcd" type="text" placeholder="请检索疾病"  ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <!--    疾病名称 diseaseIcd-->
                    <b-form-group
                      label="疾病名称"
                      label-for="diseaseName"
                      :label-cols="3">
                      <b-form-input id="diseaseName" required disabled v-model="diagnosisForm.disease.diseaseName" type="text" placeholder="请检索疾病"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="6">
                    <!--    主诊标志 mainDiagnosisMark-->
                    <b-form-group
                      label="主诊标志"
                      :label-for="'mainDiagnosisMark'+this.type"
                      :label-cols="3">
                      <b-form-radio-group
                        :id="'mainDiagnosisMark'+this.type"
                        v-model="diagnosisForm.mainDiagnosisMark"
                        :options="mainDiagnosisOptions"
                      ></b-form-radio-group>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <!--    疑似标志 suspectMark-->
                    <b-form-group
                      label="疑似标志"
                      :label-for="'suspectMark'+this.type"
                      :label-cols="3">
                      <b-form-radio-group
                        :id="'suspectMark'+this.type"
                        v-model="diagnosisForm.suspectMark"
                        :options="suspectMarkOptions"
                      ></b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <!--    发病日期 onsetDate-->
                    <b-form-group
                      label="发病日期"
                      label-for="onsetDate"
                      :label-cols="3">
                      <b-form-input required v-model="diagnosisForm.onsetDate" type="date" id="onsetDate"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form>
            </b-col>
          </b-row>
        </b-card>

          <b-row>
            <b-col md="1"></b-col>
            <b-col md="10">
<!--              :hidden="!ifSeen"-->
              <b-row >
                <b-col
                  align="right"
                >
                  <b-button-group class="pull-right">
                    <b-button variant="outline-dark" size="md" @click="exitDiagnosis()">编辑
                    </b-button>
                    <b-button variant="outline-dark" size="md" @click="deleteDiagnosis()">删除
                    </b-button>
                    <b-button variant="outline-dark" size="md" @click="saveDiagnosis()">存档
                    </b-button>
                  </b-button-group>
                </b-col>
              </b-row>

              <b-modal ref="operate-diagnosis-modal" okTitle="确认" cancelTitle="取消" size="lg" centered title="修改诊断" @ok="exitOk">
                <b-row>
                  <b-col md="6">
                    <!--    疾病ICD diseaseIcd-->
                    <b-form-group
                      label="疾病ICD"
                      label-for="operateDiseaseIcd"
                      :label-cols="3">
                      <b-form-input id="operateDiseaseIcd" v-model="operateDiagnosisForm.disease.diseaseIcd" required disabled type="text" placeholder="请检索疾病"  >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <!--    疾病名称 diseaseIcd-->
                    <b-form-group
                      label="疾病名称"
                      label-for="operateDiseaseName"
                      :label-cols="3">
                      <b-form-input id="operateDiseaseName" v-model="operateDiagnosisForm.disease.diseaseName" required disabled type="text" placeholder="请检索疾病">
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="6">
                    <!--    主诊标志 mainDiagnosisMark-->
                    <b-form-group
                      label="主诊标志"
                      :label-for="'operateMainDiagnosisMark'+this.type"
                      :label-cols="3">
                      <b-form-radio-group
                        :id="'operateMainDiagnosisMark'+this.type"
                        v-model="operateDiagnosisForm.mainDiagnosisMark"
                        :options="mainDiagnosisOptions"
                      ></b-form-radio-group>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <!--    疑似标志 suspectMark-->
                    <b-form-group
                      label="疑似标志"
                      :label-for="'operateSuspectMark'+this.type"
                      :label-cols="3">
                      <b-form-radio-group
                        :id="'operateSuspectMark'+this.type"
                        v-model="operateDiagnosisForm.suspectMark"
                        :options="suspectMarkOptions"
                      ></b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <!--    发病日期 onsetDate-->
                    <b-form-group
                      label="发病日期"
                      label-for="operateOnsetDate"
                      :label-cols="3">
                      <b-form-input required v-model="operateDiagnosisForm.onsetDate" type="date" id="operateOnsetDate"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-modal>

              <br>
              <b-table
                show-empty
                selectable
                select-mode="single"
                hover
                :items="diagnosisItems"
                :fields="diagnosisFields"
                :busy="isBusy"
                @row-selected="selectDiagnosisItems">
                <!-- @row-clicked用于单选 可以得到该行的索引  -->

                <template slot="mainDiagnosisMark" slot-scope="row">
                  {{transformMainDiagnosisMark(row.item)}}
                </template>

                <template slot="suspectMark" slot-scope="row">
                  {{transformSuspectMark(row.item)}}
                </template>

                <template slot="onsetDate" slot-scope="row">
                  {{transformOnsetDate(row.item)}}
                </template>

              </b-table>
            </b-col>
          </b-row>
      </div>
</template>

<script>
  import DiseaseModal from "./diseaseTable";
  import CommonlyUsedDiagnosis from "./commonlyUsedItems";
  import {mapState} from "vuex";
    export default {
      name: "diagnosis",
      components: {CommonlyUsedDiagnosis, DiseaseModal},
      props:{
        type:{
          type: Number,//0中医 1西医
          default:()=>{return 0}
        },
        defineDiagnosisMark:{
          type:String,
          default:()=>{return ''},
        },
        diagnosisItems:{
          type:Array,
          default:()=>{return []},
        },
        ifSeen:{//是否可见
          type:Boolean,
          default:()=>{return true},
        }
      },
      data:()=>{
        return {
          modalId:'modal-center',
          commonlyUsedModalId:'commonly-used-modal-center',
          isBusy:false,
          selectedIndex:-1,
          operateDiagnosisForm:{
            diseaseId: 0,
            medicalRecordId:1,
            mainDiagnosisMark: '1',
            suspectMark:'1',
            disease:{},
            onsetDate:'',
            diagnosisMark:'',//诊断标志：初诊1 终诊2
          },//用来编辑的诊断
          diagnosisForm: {
            diseaseId: 0,
            medicalRecordId:1,
            mainDiagnosisMark: '1',
            suspectMark:'1',
            disease:{},
            onsetDate:'',
            diagnosisMark:'',//诊断标志：初诊1 终诊2
          },
          mainDiagnosisOptions: [
            { text: '非主诊', value: '1' },
            { text: '主诊', value: '2' },
          ],
          suspectMarkOptions:[
            { text: '非疑似', value: '1' },
            { text: '疑似', value: '2'},
          ],
          commonlyUsedFields: [//常用诊断条目
            {key: 'disease.diseaseIcd', label: '疾病ICD', sortable: true},
            {key: 'disease.diseaseName', label: '疾病名称', sortable: true},
            {key: 'disease.diseaseCode', label:'疾病代码', sortable: true},
          ],
          diagnosisFields: [
            {key: 'disease.diseaseIcd', label: 'ICD编码', sortable: true},
            {key: 'disease.diseaseName', label: '疾病名称', sortable: true},
            {key: 'mainDiagnosisMark', label:'主诊', sortable: true},
            {key: 'suspectMark', label:'疑似', sortable: true},
            {key: 'onsetDate', label:'发病日期', sortable: true},
          ],
          commonlyUsedApi:[//当前为获取常用诊断
            {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedChineseDiagnosisByUserId",
              getCommonlyUsedParams:{},},
            {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedWesternDiagnosisByUserId",
              getCommonlyUsedParams:{},},
          ],
          api:{
            insertCommonlyUsedDiagnosisApi:"/doctor/common/insertCommonlyUsedDiagnosis",
          },
          selectedDisease:{},//当前选中的疾病
          selectedCommonlyUsedDisease:{},//当前选中的疾病
      }
      },
      computed:{
        ...mapState("doctor",["medicalRecord"]),
        ...mapState("common",["curr_user"]),
        computedModalId:function () {
          return this.modalId+this.type;
        },
        computedCommonlyUsedModalId:function () {
          return this.commonlyUsedModalId+this.type;
        }
      },
      methods:{
        selectDiagnosisItems(item){
          if(item.length!=0){
            for(let i = 0;i<this.diagnosisItems.length;i++){
              if(this.diagnosisItems[i]===item[0]){
                this.selectedIndex=i;
                break;
              }
            }
          }

        },
        transformOnsetDate(item){//得到发病日期
          if(item.onsetDate==''||item.onsetDate===null){
            return "";
          }else{
            return item.onsetDate.split("T")[0];
          }
        },
        transformMainDiagnosisMark(item){//得到主诊标志
          if(item.mainDiagnosisMark==='1'){
            return '否';
          }else{
            return '是';
          }
        },
        transformSuspectMark(item){//得到疑似标志
          if(item.suspectMark==='1'){
            return '否';
          }else{
            return '是';
          }
        },
        onSubmit(evt) {//新增按钮
          evt.preventDefault();
          if(JSON.stringify(this.diagnosisForm.disease)=="{}"){
            alert("请选择疾病");
          }else{
            this.diagnosisForm.diseaseId = this.diagnosisForm.disease.diseaseId;
            this.diagnosisForm.medicalRecordId = this.medicalRecord.medicalRecordId;
            this.diagnosisForm.diagnosisMark = this.defineDiagnosisMark;//设置诊断标志 1 初诊 2 终诊
            let copyDiagnosisForm = Object.assign({},this.diagnosisForm);
            this.diagnosisItems.push(copyDiagnosisForm);
            this.diagnosisForm.disease={};
            this.diagnosisForm.mainDiagnosisMark= '1';
            this.diagnosisForm.suspectMark= '1';
            this.diagnosisForm.onsetDate= '';
          }
        },
        onReset(evt) {//清空按钮
          evt.preventDefault();
          // Reset our form values
          this.diagnosisForm.disease={},
            this.diagnosisForm.mainDiagnosisMark= '1',
            this.diagnosisForm.suspectMark= '1',
            this.diagnosisForm.onsetDate= '';
          // Trick to reset/clear native browser form validation state
        },
        selectDisease(disease){//在弹框中选择疾病
          this.selectedDisease = JSON.parse(JSON.stringify(disease));
        },
        selectDiseaseOk(){//确认添加疾病
          console.log("确认");
          this.diagnosisForm.disease = JSON.parse(JSON.stringify(this.selectedDisease));
          this.selectDiseaseCancel();
          // console.log(this.selectedDisease())
        },
        selectDiseaseCancel(){
          this.selectedDisease={};
        },
        selectCommonlyUsedItem(item){//选择常用诊断
           this.selectedCommonlyUsedDisease = JSON.parse(JSON.stringify(item.disease));
        },
        selectCommonlyUsedItemOk(){
          this.diagnosisForm.disease = JSON.parse(JSON.stringify(this.selectedCommonlyUsedDisease));
          this.selectCommonlyUsedItemCancel();
        },
        selectCommonlyUsedItemCancel(){
          this.selectedCommonlyUsedDisease={};
        },

        exitDiagnosis(){//更改诊断
          if(this.selectedIndex>=0){
            this.operateDiagnosisForm = Object.assign({},this.diagnosisItems[this.selectedIndex]);
            this.operateDiagnosisForm.onsetDate = this.transformOnsetDate(this.operateDiagnosisForm);
            // this.operateDiagnosisForm.onsetDate = this.operateDiagnosisForm.onsetDate.split("T")[0];//处理从数据库传输过来的日期
            console.log("我来了");
            console.log(this.operateDiagnosisForm);
            console.log("我走了");
            this.$refs["operate-diagnosis-modal"].show();//弹框
          }else{
            alert("请选中诊断条目");
          }
        },
        exitOk(){
          this.$set(this.diagnosisItems,this.selectedIndex,Object.assign({},this.operateDiagnosisForm));
        },
        deleteDiagnosis(){//删除诊断
          if(this.selectedIndex>=0){
            this.diagnosisItems.splice(this.selectedIndex,1);
          }else{
            alert("请选中诊断条目");
          }
        },
        saveDiagnosis(){//存为常用诊断
          if(this.selectedIndex>=0){
            let commonlyUsedDiagnosis = {};
            commonlyUsedDiagnosis.doctorId = this.curr_user.userId;
            commonlyUsedDiagnosis.diseaseId = this.diagnosisItems[this.selectedIndex].diseaseId;
            this.$post(this.api.insertCommonlyUsedDiagnosisApi,JSON.parse(JSON.stringify(commonlyUsedDiagnosis))).then(res=>{
              if(res.status === "OK"){
                console.log(res.data);
                alert(res.msg);
              }else{
                console.log("插入失败");
                alert(res.msg);
              }
            });
          }else{
            alert("请选中诊断条目");
          }

        }
      }
    }
</script>

<style scoped>

</style>
