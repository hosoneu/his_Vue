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
        <b-card header="成药处方" >
          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            填写模块
            <div class="card-header-actions">

              <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                <b-button size="sm" @click="prescriptionReset" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                <b-button size="sm" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 暂存</b-button>
                <b-button size="sm" @click="prescriptionSubmit" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
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
                    <b-form>
                      <!--提交按钮-->
                      <b-row>
                        <b-col
                          align="right"
                        >
                          <b-button-group class="pull-right">
                            <!--检索药品-->
                            <b-button id="searchButton" v-b-modal="computedModalId" size="md" variant="outline-dark">检索</b-button>
                            <!--常用诊断-->
                            <b-button id="commonlyUsedButton" v-b-modal="computedCommonlyUsedModalId" size="md" variant="outline-dark">常用</b-button>
                            <!--检索药品-->
                            <b-button id="resetButton" @click="resetPrescriptionItem" size="md" variant="outline-dark">重置</b-button>
                            <!--常用诊断-->
                            <b-button id="addButton" @click="addPrescriptionItem" size="md" variant="outline-dark">新增</b-button>
                          </b-button-group>
                        </b-col>
                      </b-row>

                      <b-modal :id="computedModalId" size="lg" centered title="检索药品">
                        {{computedModalId}}
                        <drugs-table
                          @selectDrugs="selectDrugs"
                          :type=this.type>
                        </drugs-table>
                      </b-modal>

                      <b-modal :id="computedCommonlyUsedModalId" size="lg" centered title="常用药品">
                        {{computedCommonlyUsedModalId}}
                        <commonly-used-drugs
                          @selectCommonlyUsedItem="selectCommonlyUsedItem"
                          :commonly-used-type=this.type
                          :commonly-used-api=this.commonlyUsedApi
                          :commonly-used-fields=this.commonlyUsedFields
                        ></commonly-used-drugs>
                      </b-modal>
                      <br>
                      <b-row>

                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="药品编码"
                            label-for="drugsCode"
                            :label-cols="3">
                            <b-form-input id="drugsCode" required disabled v-model="prescriptionItemForm.drugs.drugsCode" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="药品名称"
                            label-for="drugsName"
                            :label-cols="3">
                            <b-form-input id="drugsName" required disabled v-model="prescriptionItemForm.drugs.drugsName" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="药品规格"
                            label-for="drugsFormat"
                            :label-cols="3">
                            <b-form-input id="drugsFormat" disabled v-model="prescriptionItemForm.drugs.drugsFormat" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="药品价格"
                            label-for="drugsPrice"
                            :label-cols="3">
                            <b-form-input id="drugsPrice" disabled v-model="prescriptionItemForm.drugs.drugsPrice" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="药品用法"
                            label-for="drugsUsage"
                            :label-cols="3">
                            <b-form-select v-model="prescriptionItemForm.drugsUsage" :options="drugsUsageOptions" ></b-form-select>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="用药频次"
                            label-for="times"
                            :label-cols="3">
                            <b-row>
                              <b-col md="4">
                                <b-form-input id="days" required v-model="prescriptionItemForm.days" type="number"  ></b-form-input>
                              </b-col>

                              <b-col md="2">
                                <p>天</p>
                              </b-col>
                              <b-col md="4">
                                <b-form-input id="times" required v-model="prescriptionItemForm.times" type="number"  ></b-form-input>
                              </b-col>
                              <b-col md="2">
                                <p>次</p>
                              </b-col>
                            </b-row>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="开立数量"
                            label-for="quantity"
                            :label-cols="3">
                            <b-form-input id="quantity" required v-model="prescriptionItemForm.quantity" type="text" placeholder="请输入..."  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="每次用量"
                            label-for="dosage"
                            :label-cols="3">
                            <b-form-input id="dosage" required v-model="prescriptionItemForm.dosage" type="text" placeholder="请输入..."  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <!--用药嘱托drugsAdvice-->
                          <b-form-group
                            label="用药嘱托"
                            label-for="drugsAdvice"
                            :label-cols="3"
                            :horizontal="true">
                            <b-form-textarea v-model="prescriptionItemForm.drugsAdvice" id="drugsAdvice" placeholder="请输入..." rows="3" ></b-form-textarea>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-form>
                  </b-col>
                  <b-col md="1">
                  </b-col>
                </b-row>
              </b-card>
              <b-card>
                <b-row>
                  <b-col md="1"></b-col>
                  <b-col md="10">

                <b-row>
                  <b-col
                    align="right"
                  >
                    <b-button-group class="pull-right">
                      <b-button size="md" variant="outline-dark"  @click="exitPrescriptionItems" >编辑
                      </b-button>
                      <b-button size="md" variant="outline-dark" @click="deletePrescriptionItems">删除
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
<!--    ******************   编辑界面   *****************          -->
                    <b-modal ref="operate-prescription-item-modal" size="lg" centered title="修改诊断" @ok="exitOk">
                      <b-row>

                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="药品编码"
                            label-for="operateDrugsCode"
                            :label-cols="3">
                            <b-form-input id="operateDrugsCode" required disabled v-model="operatePrescriptionItemForm.drugs.drugsCode" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="药品名称"
                            label-for="operateDrugsName"
                            :label-cols="3">
                            <b-form-input id="operateDrugsName" required disabled v-model="operatePrescriptionItemForm.drugs.drugsName" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="药品规格"
                            label-for="operateDrugsFormat"
                            :label-cols="3">
                            <b-form-input id="operateDrugsFormat" disabled v-model="operatePrescriptionItemForm.drugs.drugsFormat" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="药品价格"
                            label-for="operateDrugsPrice"
                            :label-cols="3">
                            <b-form-input id="operateDrugsPrice" disabled v-model="operatePrescriptionItemForm.drugs.drugsPrice" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="药品用法"
                            label-for="operateDrugsUsage"
                            :label-cols="3">
                            <b-form-select id="operateDrugsUsage" v-model="operatePrescriptionItemForm.drugsUsage" :options="drugsUsageOptions" ></b-form-select>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="用药频次"
                            label-for="operateTimes"
                            :label-cols="3">
                            <b-row>
                              <b-col md="4">
                                <b-form-input id="operateDays" required v-model="operatePrescriptionItemForm.days" type="number"  ></b-form-input>
                              </b-col>

                              <b-col md="2">
                                <p>天</p>
                              </b-col>
                              <b-col md="4">
                                <b-form-input id="operateTimes" required v-model="operatePrescriptionItemForm.times" type="number"  ></b-form-input>
                              </b-col>
                              <b-col md="2">
                                <p>次</p>
                              </b-col>
                            </b-row>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="开立数量"
                            label-for="operateQuantity"
                            :label-cols="3">
                            <b-form-input id="operateQuantity" required v-model="operatePrescriptionItemForm.quantity" type="text" placeholder="请输入..."  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="每次用量"
                            label-for="operateDosage"
                            :label-cols="3">
                            <b-form-input id="operateDosage" required v-model="operatePrescriptionItemForm.dosage" type="text" placeholder="请输入..."  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <!--用药嘱托drugsAdvice-->
                          <b-form-group
                            label="用药嘱托"
                            label-for="operateDrugsAdvice"
                            :label-cols="3"
                            :horizontal="true">
                            <b-form-textarea v-model="operatePrescriptionItemForm.drugsAdvice" id="operateDrugsAdvice" placeholder="请输入..." rows="3" ></b-form-textarea>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-modal>
                <br>
                    <prescription-items-table
                      :prescription-items-list="prescriptionForm.prescriptionItemsList"
                      @selectPrescriptionItems="selectPrescriptionItems"
                    >
                    </prescription-items-table>
                  </b-col>
                </b-row>
              </b-card>

            </b-tab>
            <b-tab title="已开处方">
              <history-prescription-table
                ref="history-prescription-table"
                :type="this.type"
              >
              </history-prescription-table>

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
  import DrugsTable from "./drugsTable";
  import CommonlyUsedDrugs from "./commonlyUsedItems";
  import HistoryPrescriptionTable from "./prescriptionList";//已开立的处方
  import PrescriptionItemsTable from "./prescriptionItemsTable";//展示处方详细信息
  import {mapState} from 'vuex';
    export default {
      name: "prescription",
      components: {
        PrescriptionItemsTable,
        RegistrationList,PatientInfo,DrugsTable,CommonlyUsedDrugs,HistoryPrescriptionTable},
      props:{
        type:{//类型 成药还是草药 0 成药 1 草药
          type:Number,
          default:()=>{return 0}
        },
      },
      data(){
        return {
          commonlyUsedModalId:'commonly-prescription-modal',
          modalId:'prescription-modal',
          selectedIndex:-1,
          operatePrescriptionItemForm:{//编辑处方条目
            drugs:{},//药品
            dragsId:-1,//药品ID
            expenseItemsId:-1,//收费ID
            drugsUsage:"4",//药品用法：1 静脉滴注 2 静脉可注 3 肌肉注射 4 口服 5 皮试 6 皮下注射
            dosage:0.0,//药品用量
            times:3,//次数
            days:1,//天数 *次*天 如1天3次
            quantity:1,//开立数量
            drugsAdvice:'',//药品医嘱
            drugsDispensingStatus:'',//发药状态
            actualQuantity:'',//实际数量
          },
          prescriptionItemForm:{//新增处方条目
            drugs:{},//药品
            dragsId:-1,//药品ID
            expenseItemsId:-1,//收费ID
            drugsUsage:"4",//药品用法：1 静脉滴注 2 静脉可注 3 肌肉注射 4 口服 5 皮试 6 皮下注射
            dosage:0.0,//药品用量
            times:3,//次数
            days:1,//天数 *次*天 如1天3次
            quantity:1,//开立数量
            drugsAdvice:'',//药品医嘱
            drugsDispensingStatus:'',//发药状态
            actualQuantity:'',//实际数量
          },
          prescriptionForm:{
            medicalRecordId:0,
            doctorId:0,
            prescriptionType:'',
            prescriptionItemsList:[],//处方药品数组
          },
          commonlyUsedFields: [//常用药品条目
            {key: 'drugs.drugsCode', label:'编码', sortable: true},
            {key: 'drugs.drugsName', label:'名称', sortable: true},
            {key: 'drugs.drugsFormat', label:'规格', sortable: true},
            {key: 'drugs.drugsUnit', label:'单位', sortable: true},
            {key: 'drugs.drugsPrice', label:'价格', sortable: true},
          ],
          commonlyUsedApi:[//获取常用药品
            {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedPatentDrugsByUserId",
              getCommonlyUsedParams:{},
            },
            {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedHerbalDrugsByUserId",
              getCommonlyUsedParams:{},
            },
          ],
          drugsUsageOptions:[
            { value: '1', text: '静脉滴注' },
            { value: '2', text: '静脉可注' },
            { value: '3', text: '肌肉注射' },
            { value: '4', text: '口服' },
            { value: '5', text: '皮试'},
            { value: '6', text: '皮下注射' },
          ],
          api:[
            {
              insertPrescription:"/doctor/prescription/patent/insertPrescription",
            },{
              insertPrescription:"/doctor/prescription/herbal/insertPrescription",
            }
          ],
        }
      },
      computed:{
        ...mapState("doctor",["patient"]),
        ...mapState("doctor",["doctor"]),
        ...mapState("doctor",["registration"]),
        ...mapState("doctor",["medicalRecordState"]),
        computedCommonlyUsedModalId(){
          return this.commonlyUsedModalId+this.type;
        },
        computedModalId(){
          return this.modalId+this.type;
        },
      },
      watch:{
        patient:{
          handler(){
            this.prescriptionReset();
          }
        },
      },
      methods:{
        transformType(){
          if(this.type===0){
            return '1';
          }else{
            return '2';
          }
        },
        selectPrescriptionItems(item){
          let prescriptionItemsList = this.prescriptionForm.prescriptionItemsList;
          console.log(prescriptionItemsList[0]);
          for(let i = 0 ; i< prescriptionItemsList.length;i++){
            if(prescriptionItemsList[i]===item){
              this.selectedIndex=i;
              break;
            }
          }
        },
        selectPatient(){//选择患者
          //do nothing
        },
        prescriptionSubmit(){//提交处方
          this.prescriptionForm.medicalRecordId=this.registration.medicalRecordId;
          this.prescriptionForm.doctorId=this.doctor.userId;
          this.prescriptionForm.prescriptionType=this.transformType;
          this.$post(this.api[this.type].insertPrescription,JSON.parse(JSON.stringify(this.prescriptionForm))).then(res=>{
            console.log(res);
            if(res.status === "OK"){
              console.log(res.data);
              console.log(res.message+res.data);
              alert(res.message);
              this.$refs["history-prescription-table"].getHistoryPrescription();
            }else{
              console.log(res.message);
              alert(res.message);
            }
          });
          this.prescriptionReset();
        },
        prescriptionReset(){//重置处方
          this.prescriptionForm={
            medicalRecordId:this.registration.medicalRecordId,
            doctorId:this.doctor.userId,
            prescriptionType:this.transformType,
            prescriptionItemsList:[],//处方药品数组
          };
        },
        exitPrescriptionItems(){//编辑一个处方条目
          if(this.selectedIndex>=0){
            this.operatePrescriptionItemForm = Object.assign({},this.prescriptionForm.prescriptionItemsList[this.selectedIndex]);
            console.log("目前要编辑的项目");
            this.$refs["operate-prescription-item-modal"].show();//弹框
          }else{
            alert("请选中处方条目");
          }
        },
        exitOk(){
          this.$set(this.prescriptionForm.prescriptionItemsList,this.selectedIndex,Object.assign({},this.operatePrescriptionItemForm));
        },
        deletePrescriptionItems(){//删除一个处方条目
          this.prescriptionForm.prescriptionItemsList.splice(this.selectedIndex,1);
        },
        resetPrescriptionItem(){
          this.prescriptionItemForm.drugs={};
          this.prescriptionItemForm.drugsUsage="4";//药品用法：1 静脉滴注 2 静脉可注 3 肌肉注射 4 口服 5 皮试 6 皮下注射
          this.prescriptionItemForm.dosage=0.0;//药品用量
          this.prescriptionItemForm.times=3;//次数
          this.prescriptionItemForm.days=1;//天数 *次*天 如1天3次
          this.prescriptionItemForm.quantity=1;//开立数量
          this.prescriptionItemForm.drugsAdvice='';//药品医嘱
        },
        addPrescriptionItem(){
            this.prescriptionItemForm.dragsId=this.prescriptionItemForm.drugs.drugsId;//药品ID
            this.prescriptionForm.prescriptionItemsList.push(Object.assign({},this.prescriptionItemForm));
            this.prescriptionItemForm.drugs={};
            this.prescriptionItemForm.drugsUsage="4";//药品用法：1 静脉滴注 2 静脉可注 3 肌肉注射 4 口服 5 皮试 6 皮下注射
            this.prescriptionItemForm.dosage=0.0;//药品用量
            this.prescriptionItemForm.times=3;//次数
            this.prescriptionItemForm.days=1;//天数 *次*天 如1天3次
            this.prescriptionItemForm.quantity=1;//开立数量
            this.prescriptionItemForm.drugsAdvice='';//药品医嘱
        },
        selectCommonlyUsedItem(item){//选择常用药品
          console.log("选择常用药品");
          console.log(item);
          this.prescriptionItemForm.drugs = item.drugs;
        },
        selectDrugs(item){//选择检索药品
          console.log("选择检索药品");
          console.log(item);
          this.prescriptionItemForm.drugs = item;
        },

      }
    }
</script>

<style scoped>

</style>
