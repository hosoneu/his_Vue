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
        <b-card header="处置">
          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            填写模块
            <div class="card-header-actions">
              <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                <b-button size="sm" @click="treatmentReset" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                <b-button size="sm" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 暂存</b-button>
                <b-button size="sm" @click="treatmentSubmit" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
              </b-button-group>
            </div>
          </div>
          <b-tabs>
            <!--主模块部分的分菜单栏-->
            <b-tab title = "开立处置">
              <br>
              <b-card>
                <b-row>
                  <b-col md="1"></b-col>
                  <b-col md="10">

                    <!--   ***********************************  按钮和弹框   **************************************     -->
                    <b-row>
                      <b-col
                        align="right"
                      >
                        <b-button-group class="pull-right">
                          <!--检索处置非药品-->
                          <b-button id="searchButton" v-b-modal="computedModalId" size="md" variant="outline-dark">检索</b-button>
                          <!--常用处置非药品-->
                          <b-button id="commonlyUsedButton" v-b-modal="computedCommonlyUsedModalId" size="md" variant="outline-dark">常用</b-button>
                          <!--重置当前处置条目-->
                          <b-button id="resetButton" @click="resetTreatmentItem" size="md" variant="outline-dark">重置</b-button>
                          <!--新增当前处置条目-->
                          <b-button id="addButton" @click="addTreatmentItem" size="md" variant="outline-dark">新增</b-button>
                        </b-button-group>
                      </b-col>
                    </b-row>


                    <b-modal :id="computedModalId" size="lg" centered title="检索处置">
                      {{computedModalId}}
                      <fmedical-table
                        @selectFmedical="selectFmedical"
                        :type=this.type>
                      </fmedical-table>
                    </b-modal>

                    <b-modal :id="computedCommonlyUsedModalId" size="lg" centered title="常用处置">
                      {{computedCommonlyUsedModalId}}
                      <commonly-used-treatment
                        @selectCommonlyUsedItem="selectCommonlyUsedItem"
                        :commonly-used-type=this.type
                        :commonly-used-api=this.commonlyUsedApi
                        :commonly-used-fields=this.commonlyUsedFields
                      ></commonly-used-treatment>
                    </b-modal>
                    <br>

                    <!--   ******************************* 新增处置非药品条目文字内容 **********************************       -->
                    <b-row>

                      <b-col md="6">
                        <!--    药品编码 drugsCode-->
                        <b-form-group
                          label="非药品编码"
                          label-for="fmedicalItemsCode"
                          :label-cols="3">
                          <b-form-input id="fmedicalItemsCode" required disabled v-model="treatmentItemForm.fmedicalItems.fmedicalItemsCode" type="text" placeholder="请检索药品"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <!--    药品名称 drugsName-->
                        <b-form-group
                          label="非药品名称"
                          label-for="fmedicalItemsName"
                          :label-cols="3">
                          <b-form-input id="fmedicalItemsName" required disabled v-model="treatmentItemForm.fmedicalItems.fmedicalItemsName" type="text" placeholder="请检索药品"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col md="6">
                        <!--    药品编码 drugsCode-->
                        <b-form-group
                          label="非药品规格"
                          label-for="fmedicalItemsFormat"
                          :label-cols="3">
                          <b-form-input id="fmedicalItemsFormat" required disabled v-model="treatmentItemForm.fmedicalItems.fmedicalItemsFormat" type="text" placeholder="请检索药品"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <!--    药品名称 drugsName-->
                        <b-form-group
                          label="非药品价格"
                          label-for="fmedicalItemsPrice"
                          :label-cols="3">
                          <b-form-input id="fmedicalItemsPrice" required disabled v-model="treatmentItemForm.fmedicalItems.fmedicalItemsPrice" type="text" placeholder="请检索药品"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <!--    药品编码 drugsCode-->
                        <b-form-group
                          label="开立数量"
                          label-for="quantity"
                          :label-cols="3">
                          <b-form-input id="quantity" required v-model="treatmentItemForm.quantity" type="number" placeholder="请检索药品"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>

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
                          <b-button variant="outline-dark" size="md" @click="exitTreatmentItem()">编辑
                          </b-button>
                          <b-button variant="outline-dark" size="md" @click="deleteTreatmentItem()">删除
                          </b-button>
                        </b-button-group>
                      </b-col>
                    </b-row>
                    <br>
                    <!--       *********************  编辑页面  ************************             -->
                    <b-modal ref="operate-treatment-item-modal" size="lg" centered title="修改处置" @ok="exitOk">
                      <b-row>

                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="非药品编码"
                            label-for="operateFmedicalItemsCode"
                            :label-cols="3">
                            <b-form-input id="operateFmedicalItemsCode" required disabled v-model="operateTreatmentItemForm.fmedicalItems.fmedicalItemsCode" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="非药品名称"
                            label-for="operateFmedicalItemsName"
                            :label-cols="3">
                            <b-form-input id="operateFmedicalItemsName" required disabled v-model="operateTreatmentItemForm.fmedicalItems.fmedicalItemsName" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="非药品规格"
                            label-for="operateFmedicalItemsFormat"
                            :label-cols="3">
                            <b-form-input id="operateFmedicalItemsFormat" required disabled v-model="operateTreatmentItemForm.fmedicalItems.fmedicalItemsFormat" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="非药品价格"
                            label-for="operateFmedicalItemsPrice"
                            :label-cols="3">
                            <b-form-input id="operateFmedicalItemsPrice" required disabled v-model="operateTreatmentItemForm.fmedicalItems.fmedicalItemsPrice" type="text" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="开立数量"
                            label-for="operateQuantity"
                            :label-cols="3">
                            <b-form-input id="operateQuantity" required v-model="operateTreatmentItemForm.quantity" type="number" placeholder="请检索药品"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>

                    </b-modal>
                    <b-table
                      show-empty
                      stacked="md"
                      hover
                      selectable
                      select-mode="single"
                      :items="treatmentForm.treatmentItemsList"
                      :fields="treatmentItemsFields"
                      @row-selected="selectTreatmentItem"
                    >
                    </b-table>
                  </b-col>
                </b-row>
              </b-card>
            </b-tab>
            <b-tab title="已开处置">
              <history-treatment-table
                :treatment-items="historyTreatmentItems"
                @selectItem="selectTreatment"
              >
              </history-treatment-table>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RegistrationList from "./component/registrationList";
  import PatientInfo from "./component/patientInfo";
  import FmedicalTable from "./component/fmedicalTable";
  import CommonlyUsedTreatment from "./component/commonlyUsedItems";
  import HistoryTreatmentTable from "./component/treatmentList";
  import {mapState} from "vuex";
    export default {
      name: "treatment",
      components:{RegistrationList,PatientInfo,FmedicalTable,CommonlyUsedTreatment,HistoryTreatmentTable},
      data(){
          return{
            items:{},
            commonlyUsedModalId:'commonly-treatment-modal',
            type:2,
            modalId:'treatment-modal',
            selectedIndex:-1,
            historyTreatmentItems:[],
            operateTreatmentItemForm:{
              fmedicalItems:{},//处置非药品
              fmedicalItemsId:-1,//处置非药品ID
              quantity:1,//开立数量
              actualQuantity:1,//实际数量
            },
            treatmentItemForm:{
              fmedicalItems:{},//处置非药品
              fmedicalItemsId:-1,//处置非药品ID
              quantity:1,//开立数量
              actualQuantity:1,//实际数量
            },
            treatmentForm:{
              medicalRecordId:0,
              doctorId:0,
              treatmentItemsList:[],//处置处置非药品数组
            },
            commonlyUsedFields: [//常用处置非药品条目
              {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
            ],
            commonlyUsedApi:[//获取常用处置非处置非药品
              {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedExamination1ByUserId",
                getCommonlyUsedParams:{},

              },
              {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedExamination2ByUserId",
                getCommonlyUsedParams:{},
              },
              {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedTreatmentByUserId",
                getCommonlyUsedParams:{},
              },
            ],
            api:{
              listTreatmentByMedicalRecordIdApi:"/doctor/treatment/listTreatmentByMedicalRecordId",
              listTreatmentByMedicalRecordIdParams:{},
              insertTreatmentApi:"/doctor/treatment/insertTreatment"
            },
            treatmentItemsFields:[
              {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
              {key: 'quantity', label:'数量', sortable: true},
            ],
          }
      },
      computed:{
        ...mapState("doctor",["patient"]),
        ...mapState("doctor",["doctor"]),
        ...mapState("doctor",["registration"]),
        ...mapState("doctor",["medicalRecordState"]),
        computedModalId(){
          return this.modalId+this.type;
        },
        computedCommonlyUsedModalId(){
          return this.commonlyUsedModalId+this.type;
        },
      },
      watch:{
        patient:{
          handler(){
            this.treatmentReset();
            this.getHistoryTreatment();
          }
        },
      },
      methods:{
        selectPatient(){
          //do nothing
        },
        selectFmedical(item){//选择处置非处置非药品项目
          this.treatmentItemForm.fmedicalItems = item;
        },
        selectCommonlyUsedItem(item){//选择常用处置非处置非药品项目
          this.treatmentItemForm.fmedicalItems = item.fmedicalItems;
        },
        selectTreatmentItem(item){//选择处置条目
          let treatmentItemsList = this.treatmentForm.treatmentItemsList;
          for(let i = 0 ; i< treatmentItemsList.length;i++){
            if(treatmentItemsList[i]===item[0]){
              this.selectedIndex=i;
              break;
            }
          }
        },
        selectTreatment(item){//选择处置单
          console.log("现在点击的处置单为");
          console.log(item);
        },
        treatmentReset(){//重置处置单
          this.treatmentForm={
            medicalRecordId:this.registration.medicalRecordId,
            doctorId:this.doctor.userId,
            treatmentItemsList:[],//处方药品数组
          };
          this.resetTreatmentItem();
        },
        treatmentSubmit(){//提交处置单
          this.treatmentForm.medicalRecordId=this.registration.medicalRecordId;
          this.treatmentForm.doctorId=this.doctor.userId;
          console.log("提交处置单");
          console.log(this.treatmentForm);
          this.$post(this.api.insertTreatmentApi,JSON.parse(JSON.stringify(this.treatmentForm))).then(res=>{
            console.log(res);
            if(res.status === "OK"){
              console.log(res.msg+res.data);
              alert(res.msg);
            }else{
              console.log(res.msg);
              alert(res.msg);
            }
          });
          this.treatmentReset();
        },
        resetTreatmentItem(){//重置正在编辑的treatmentItem
          this.treatmentItemForm={
            fmedicalItems:{},//处置非药品
            fmedicalItemsId:-1,//处置非药品ID
            quantity:1,//开立数量
            actualQuantity:1,//实际数量
          };
        },
        addTreatmentItem(){//新增正在编辑的treatmentItem
          this.treatmentItemForm.fmedicalItemsId = this.treatmentItemForm.fmedicalItems.fmedicalItemsId;
          this.treatmentForm.treatmentItemsList.push( Object.assign({},this.treatmentItemForm));
          this.treatmentItemForm={
            fmedicalItems:{},//处置非药品
            fmedicalItemsId:-1,//处置非药品ID
            quantity:1,//开立数量
            actualQuantity:1,//实际数量
          };
          this.resetTreatmentItem();
        },
        exitTreatmentItem(){
          if(this.selectedIndex>=0){
            this.operateTreatmentItemForm = Object.assign({},this.treatmentForm.treatmentItemsList[this.selectedIndex]);
            console.log("目前要编辑的项目");
            this.$refs["operate-treatment-item-modal"].show();//弹框
          }else{
            alert("请选中处置条目");
          }
        },
        exitOk(){//编辑确认
          this.$set(this.treatmentForm.treatmentItemsList,this.selectedIndex,Object.assign({},this.operateTreatmentItemForm));
          this.selectedIndex = -1;
        },
        deleteTreatmentItem(){
          if(this.selectedIndex>=0){
            this.treatmentForm.treatmentItemsList.splice(this.selectedIndex,1);
            this.selectedIndex = -1;
          }else{
            alert("请选中处置条目");
          }
        },
        getHistoryTreatment(){//获取历史处置
          console.log("正在查找");
          if(!(this.medicalRecordState==='未初诊')){
            this.api.listTreatmentByMedicalRecordIdParams.medicalRecordId = this.registration.medicalRecordId;
            this.$get(this.api.listTreatmentByMedicalRecordIdApi,this.api.listTreatmentByMedicalRecordIdParams).then(res=>{
              if(res.status === "OK"){
                this.historyTreatmentItems = res.data;
              }else{
                console.log(res.msg);
                alert(res.message);
              }
              console.log(res.data);
            });
          }else{
            alert("找个锤子");
          }
        },
      }
    }
</script>

<style scoped>

</style>
