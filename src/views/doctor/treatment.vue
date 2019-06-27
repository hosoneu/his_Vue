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
                          <b-button id="addButton" @click="submitTreatmentItem" size="md" variant="outline-dark">新增</b-button>
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
                    <b-table
                      show-empty
                      stacked="md"
                      hover
                      selectable
                      select-mode="single"
                      :items="treatmentForm.treatmentItemsList"
                      :fields="treatmentItemsFields"
                      @row-clicked="selectTreatmentItem"
                    >
                    </b-table>
                  </b-col>
                </b-row>
              </b-card>
            </b-tab>
            <b-tab title="已开处置">
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
  import {mapState} from "vuex";
    export default {
      name: "treatment",
      components:{RegistrationList,PatientInfo,FmedicalTable,CommonlyUsedTreatment},
      data(){
          return{
            commonlyUsedModalId:'commonly-treatment-modal',
            type:2,
            modalId:'treatment-modal',
            selectedIndex:-1,
            treatmentItemForm:{
              fmedicalItems:{},//处置非药品
              fmedicalItemsId:-1,//处置非药品ID
              quantity:1,//开立数量
              actualQuantity:'',//实际数量
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
        computedModalId(){
          return this.modalId+this.type;
        },
        computedCommonlyUsedModalId(){
          return this.commonlyUsedModalId+this.type;
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
        selectTreatmentItem(item,index,button){//选择项目单列表中的条目
          button.preventDefault();
          this.selectedIndex = index;
        },
        treatmentReset(){//重置处置单

        },
        treatmentSubmit(){//提交处置单

        },
        resetTreatmentItem(evt){//重置正在编辑的treatmentItem
          evt.preventDefault();
          this.treatmentItemForm={
            fmedicalItems:{},//处置非药品
            fmedicalItemsId:-1,//处置非药品ID
            quantity:1,//开立数量
            actualQuantity:'',//实际数量
          };
        },
        submitTreatmentItem(evt){//新增正在编辑的treatmentItem
          evt.preventDefault();
          this.treatmentForm.treatmentItemsList.push( Object.assign({},this.treatmentItemForm));
          this.treatmentItemForm={
            fmedicalItems:{},//处置非药品
            fmedicalItemsId:-1,//处置非药品ID
            quantity:1,//开立数量
            actualQuantity:'',//实际数量
          };
        },
        exitTreatmentItem(){
          alert(this.selectedIndex);

        },
        deleteTreatmentItem(){
          this.treatmentForm.treatmentItemsList.splice(this.selectedIndex,1);
          this.selectedIndex = -1;
        }



      }
    }
</script>

<style scoped>

</style>
