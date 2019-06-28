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

        <b-card header="开立检查">
          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            填写模块
            <div class="card-header-actions">
              <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                <b-button size="sm" @click="examinationReset" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                <b-button size="sm" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 存档</b-button>
                <b-button size="sm" @click="examinationSubmit" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
              </b-button-group>
            </div>
          </div>
          <b-tabs>
            <!--主模块部分的分菜单栏-->
            <b-tab :title = "computedTitle1">
              <b-card>
                <b-row>
                  <b-col md="1"></b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col
                        align="right"
                      >
                        <b-button-group class="pull-right">
                          <!--检索处置非药品-->
                          <b-button id="searchFmedicalButton" v-b-modal="computedModalId" size="md" variant="outline-dark">检索</b-button>
                          <!--常用处置非药品-->
                          <b-button id="commonlyUsedFmedicalButton" v-b-modal="computedCommonlyUsedModalId" size="md" variant="outline-dark">常用</b-button>
                          <!--重置当前处置条目-->
                          <b-button id="resetFmedicalButton" @click="resetExaminationFmedicalItem" size="md" variant="outline-dark">重置</b-button>
                          <!--新增当前处置条目-->
                          <b-button id="addFmedicalButton" @click="addExaminationFmedicalItem" size="md" variant="outline-dark">新增</b-button>
                        </b-button-group>
                      </b-col>
                    </b-row>

                    <!--    ***********************    检索非药品的弹框     ************************       -->
                    <b-modal :id="computedModalId" size="lg" centered :title="type===0?'检索检查':'检索检验'">
                      <fmedical-table
                        @selectFmedical="selectFmedical"
                        :type=this.type>
                      </fmedical-table>
                    </b-modal>
                    <!--   ***********************     检索常用非药品的弹框  ************************          -->
                    <b-modal :id="computedCommonlyUsedModalId" size="lg" centered :title="type===0?'常用检查':'常用检验'">
                      <commonly-used-examination
                        @selectCommonlyUsedItem="selectCommonlyUsedItem"
                        :commonly-used-type=this.type
                        :commonly-used-api=this.commonlyUsedApi
                        :commonly-used-fields=this.commonlyUsedFields
                      ></commonly-used-examination>
                    </b-modal>

                    <br>


                    <b-row>
                      <b-col md="6">
                        <!--    药品编码 drugsCode-->
                        <b-form-group
                          label="非药品编码"
                          label-for="fmedicalItemsCode"
                          :label-cols="3">
                          <b-form-input id="fmedicalItemsCode" required disabled v-model="examinationFmedicalItemsForm.fmedicalItems.fmedicalItemsCode" type="text" placeholder="请检索项目"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <!--    药品名称 drugsName-->
                        <b-form-group
                          label="非药品名称"
                          label-for="fmedicalItemsName"
                          :label-cols="3">
                          <b-form-input id="fmedicalItemsName" required disabled v-model="examinationFmedicalItemsForm.fmedicalItems.fmedicalItemsName" type="text" placeholder="请检索项目"  ></b-form-input>
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
                          <b-form-input id="fmedicalItemsFormat" required disabled v-model="examinationFmedicalItemsForm.fmedicalItems.fmedicalItemsFormat" type="text" placeholder="请检索项目"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <!--    药品名称 drugsName-->
                        <b-form-group
                          label="非药品价格"
                          label-for="fmedicalItemsPrice"
                          :label-cols="3">
                          <b-form-input id="fmedicalItemsPrice" required disabled v-model="examinationFmedicalItemsForm.fmedicalItems.fmedicalItemsPrice" type="text" placeholder="请检索项目"  ></b-form-input>
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
                          <b-form-input id="quantity" required v-model="examinationFmedicalItemsForm.quantity" type="number" placeholder="请添加数量"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <!--    药品编码 drugsCode-->
                        <b-form-group
                          label="目的或要求"
                          label-for="purposeRequirements"
                          :label-cols="3">
                          <b-form-input id="purposeRequirements" required v-model="examinationFmedicalItemsForm.purposeRequirements" type="text" placeholder="请输入"  ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
              <b-card>
                <b-row>
                  <b-col md="1">

                  </b-col>
                  <b-col md="10">

                    <b-row>
                      <b-col
                        align="right"
                      >
                        <b-button-group class="pull-right">
                          <b-button variant="outline-dark" size="md" @click="additionExaminationFmedicalItems()">加药
                          </b-button>
                          <b-button variant="outline-dark" size="md" @click="exitExaminationFmedicalItems()">编辑
                          </b-button>
                          <b-button variant="outline-dark" size="md" @click="deleteExaminationFmedicalItems()">删除
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
                      :items="examinationForm.examinationFmedicalItemsList"
                      :fields="examinationFmedicalItemsFields"
                      @row-selected="selectExaminationFmedicalItems"
                    >
                    </b-table>
                  </b-col>
                </b-row>

              </b-card>

              <b-card header="附加药品" :hidden="!showAdditionDrugs">
                <b-row>
                  <b-col md="1"></b-col>
                  <b-col md="10">
                    <b-row>
                      <b-col
                        align="right"
                      >
                        <b-button-group class="pull-right">
                          <!-- 检索中药    -->
                          <b-button id="searchPatentDrugsButton" v-b-modal="computedDrugsModalId+'patent'" size="md" variant="outline-dark">成药</b-button>
                          <!-- 检索西药   -->
                          <b-button id="searchHerbalDrugsButton" v-b-modal="computedDrugsModalId+'herbal'" size="md" variant="outline-dark">草药</b-button>
                          <!--常用药品-->
                          <b-button id="commonlyUsedDrugsButton" v-b-modal="computedCommonlyUsedDrugsModalId" size="md" variant="outline-dark">常用</b-button>
                          <!--重置当前药品条目-->
                          <b-button id="resetDrugsButton" @click="resetExaminationDrugsItem" size="md" variant="outline-dark">重置</b-button>
                          <!--新增当前药品条目-->
                          <b-button id="addDrugsButton" @click="addExaminationDrugsItem" size="md" variant="outline-dark">新增</b-button>
                        </b-button-group>
                      </b-col>
                    </b-row>
                    <!--   ***********************     检索草药的弹框  ************************          -->
                    <b-modal :id="computedDrugsModalId+'herbal'" size="lg" centered title="检索草药">
                      <herbal-drugs-table
                        @selectDrugs="selectDrugs"
                        :type=1>
                      </herbal-drugs-table>
                    </b-modal>
                    <!--   ***********************     检索成药的弹框  ************************          -->
                    <b-modal :id="computedDrugsModalId+'patent'" size="lg" centered title="检索成药">
                      <patent-drugs-table
                        @selectDrugs="selectDrugs"
                        :type=0>
                      </patent-drugs-table>
                    </b-modal>
                    <!--   ***********************     检索常用药品的弹框  ************************          -->
                    <b-modal :id="computedCommonlyUsedDrugsModalId" size="lg" centered title="常用药品">
                      <commonly-used-drugs
                        @selectCommonlyUsedItem="selectCommonlyUsedItem"
                        :commonly-used-type=0
                        :commonly-used-api=this.commonlyUsedDrugsApi
                        :commonly-used-fields=this.commonlyUsedDrugsFields
                      ></commonly-used-drugs>
                    </b-modal>
                  </b-col>
                </b-row>
              </b-card>
            </b-tab>
            <b-tab :title="computedTitle2">

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
  import FmedicalTable from "./fmedicalTable";
  import CommonlyUsedExamination from "./commonlyUsedItems";
  import HerbalDrugsTable from "./drugsTable";
  import PatentDrugsTable from "./drugsTable";
  import CommonlyUsedDrugs from "./commonlyUsedItems";
    export default {
      name: "examination",
      components: {RegistrationList,PatientInfo,FmedicalTable,CommonlyUsedExamination,HerbalDrugsTable,PatentDrugsTable,CommonlyUsedDrugs},
      props:{
        type:{
          type:Number,//0 检查 1 检验
          default:()=>{return 0}
        }
      },
      data(){
        return{
          commonlyUsedModalId:'commonly-treatment-modal',
          modalId:'treatment-modal',
          commonlyUsedFields: [//常用非药品条目的field
            {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
          ],
          commonlyUsedApi:[//获取常用检查检验的非药品
            {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedExamination1ByUserId",
              getCommonlyUsedParams:{},
            },
            {getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedExamination2ByUserId",
              getCommonlyUsedParams:{},
            },
          ],
          commonlyUsedDrugsFields:[
            {key: 'drugs.drugsCode', label:'编码', sortable: true},
            {key: 'drugs.drugsName', label:'名称', sortable: true},
            {key: 'drugs.drugsFormat', label:'规格', sortable: true},
            {key: 'drugs.drugsUnit', label:'单位', sortable: true},
            {key: 'drugs.drugsPrice', label:'价格', sortable: true},
          ],
          commonlyUsedDrugsApi:[//获取常用药品
            {
              getCommonlyUsedListApi:"/doctor/common/listCommonlyUsedDrugsByUserId",
              getCommonlyUsedParams:{},
            }
          ],
          api:[//定义需要用到的api


          ],
          examinationForm:{
            medicalRecordId:-1,
            doctorId:-1,
            doctorAdvice:'',//提交时添加医嘱
            examinationFmedicalItemsList:[],
          },
          examinationFmedicalItemsForm:{//检查检验非药品条目
            doctorId:0,
            purposeRequirements:'',
            quantity:1,
            fmedicalItems:{},
            examinationDrugsItemsList:[],
          },
          examinationFmedicalItemsFields:[
            {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
            {key: 'quantity', label:'数量', sortable: true},
            {key: 'purposeRequirements', label:'目的或要求', sortable: true},
          ],
          selectedExaminationFmedcalItems:{},//当前选中的ExaminationFmedical
          showAdditionDrugs:false,//是否添加药品
        }
      },
      computed:{
        computedTitle1(){
          return ((this.type===0)?'开立检查':'开立检验');
        },
        computedTitle2(){
          return ((this.type===0)?'已开检查':'已开检验');
        },
        computedModalId(){//非药品弹框
          return this.modalId+this.type+"fmedical";
        },
        computedCommonlyUsedModalId(){//常用非药品弹框
          return this.commonlyUsedModalId+this.type+"fmedical";
        },
        computedDrugsModalId(){//药品弹框
          return this.modalId+this.type+"drugs";
        },
        computedCommonlyUsedDrugsModalId(){//常用药品弹框
          return this.commonlyUsedModalId+this.type+"drugs";
        },

      },
      methods:{
        selectPatient(){//选择患者

        },
        examinationReset(){//重置检查检验单

        },
        examinationSubmit(){//提交检查检验单

        },
        resetExaminationFmedicalItem(){//重置非药品检查检验条目

        },
        addExaminationFmedicalItem(){//新增药品检查检验条目

        },
        resetExaminationDrugsItem(){//重置当前非药品项目的附加药品

        },
        addExaminationDrugsItem(){//为非药品项目附加药品

        },
        selectExaminationFmedicalItems(){//选中非药品项目

        },
        exitExaminationFmedicalItems(){//编辑药品

        },
        deleteExaminationFmedicalItems(){//删除药品

        },
        additionExaminationFmedicalItems(){//加药
          this.showAdditionDrugs = !this.showAdditionDrugs;
        },

      }
    }
</script>

<style scoped>

</style>
