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
        <group-examination
         :type="type"
         @onCite="onCite"
        ></group-examination>
      </b-col>
      <b-col lg="9">

        <b-card header="开立检查">
          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            填写模块
            <div class="card-header-actions">
              <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                <b-button size="sm" :disabled="ifReadonly" @click="examinationReset" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                <b-button size="sm" @click="examinationSave" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 存档</b-button>
                <b-button size="sm" :disabled="ifReadonly" @click="examinationSubmit" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
              </b-button-group>
            </div>
          </div>
          <b-modal ref="examination-group" size="md" @ok="onSave" okTitle="保存" cancelTitle="取消" centered title="存为模板">
            <!--  名称 -->
            <b-form-group
              label="模板名称"
              label-for="groupName"
              :label-cols="3"
              :horizontal="true">
              <b-form-input v-model="groupName" id="groupName" type="text" placeholder="请输入内容..."></b-form-input>
            </b-form-group>
            <!--  名称 -->
            <b-form-group
              label="模板编码"
              label-for="groupCode"
              :label-cols="3"
              :horizontal="true">
              <b-form-input v-model="groupCode" id="groupCode" type="text" placeholder="请输入内容..."></b-form-input>
            </b-form-group>
            <!--  范围 -->
            <b-form-group
              label="适用范围"
              label-for="groupScope"
              :label-cols="3">
              <b-form-radio-group
                id="groupScope"
                v-model="groupScope"
                :options="scopeOptions"
              ></b-form-radio-group>
            </b-form-group>
          </b-modal>
          <b-tabs>
            <!--主模块部分的分菜单栏-->
            <b-tab :title = "computedTitle1" :disabled="ifReadonly">
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
                          <b-button id="searchFmedicalButton" :disabled="showAdditionDrugs" v-b-modal="computedModalId" size="md" variant="outline-dark">检索</b-button>
                          <!--常用处置非药品-->
                          <b-button id="commonlyUsedFmedicalButton" :disabled="showAdditionDrugs" v-b-modal="computedCommonlyUsedModalId" size="md" variant="outline-dark">常用</b-button>
                          <!--重置当前处置条目-->
                          <b-button id="resetFmedicalButton" :disabled="showAdditionDrugs" @click="resetExaminationFmedicalItem" size="md" variant="outline-dark">重置</b-button>
                          <!--新增当前处置条目-->
                          <b-button id="addFmedicalButton" :disabled="showAdditionDrugs" @click="addExaminationFmedicalItem" size="md" variant="outline-dark">新增</b-button>
                        </b-button-group>
                      </b-col>
                    </b-row>

                    <!--    ***********************    检索非药品的弹框     ************************       -->
                    <b-modal :id="computedModalId" okTitle="确定" cancelTitle="取消" @ok="selectFmedicalOk" @cancel="selectFmedicalCancel" size="lg" centered :title="type===0?'检索检查':'检索检验'">
                      <fmedical-table
                        @selectFmedical="selectFmedical"
                        :type=this.type>
                      </fmedical-table>
                    </b-modal>
                    <!--   ***********************     检索常用非药品的弹框  ************************          -->
                    <b-modal :id="computedCommonlyUsedModalId" okTitle="确定" cancelTitle="取消" @ok="selectCommonlyUsedItemOk" @cancel="selectCommonlyUsedItemCancel" size="lg" centered :title="type===0?'常用检查':'常用检验'">
                      <commonly-used-examination
                        :type=2
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
                          <b-button :disabled="showAdditionDrugs" variant="outline-dark" size="md" @click="additionExaminationFmedicalItems()">加药
                          </b-button>
                          <b-button :disabled="showAdditionDrugs" variant="outline-dark" size="md" @click="saveExaminationFmedicalItems()">存档
                          </b-button>
                          <b-button :disabled="showAdditionDrugs" variant="outline-dark" size="md" @click="exitExaminationFmedicalItems()">编辑
                          </b-button>
                          <b-button :disabled="showAdditionDrugs" variant="outline-dark" size="md" @click="deleteExaminationFmedicalItems()">删除
                          </b-button>
                        </b-button-group>
                      </b-col>
                    </b-row>
                    <!--      *********************  编辑非药品页面  ************************     -->
                    <b-modal ref="operate-examination-fmedical-item-modal" size="lg" centered title="修改处置" @ok="exitExaminationFmedicalItemsOk">
                      <b-row>
                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="非药品编码"
                            label-for="operateExaminationFmedicalItemsCode"
                            :label-cols="3">
                            <b-form-input id="operateExaminationFmedicalItemsCode" required disabled v-model="operateExaminationFmedicalItemsForm.fmedicalItems.fmedicalItemsCode" type="text" placeholder="请检索项目"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="非药品名称"
                            label-for="operateExaminationFmedicalItemsName"
                            :label-cols="3">
                            <b-form-input id="operateExaminationFmedicalItemsName" required disabled v-model="operateExaminationFmedicalItemsForm.fmedicalItems.fmedicalItemsName" type="text" placeholder="请检索项目"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="非药品规格"
                            label-for="operateExaminationFmedicalItemsFormat"
                            :label-cols="3">
                            <b-form-input id="operateExaminationFmedicalItemsFormat" required disabled v-model="operateExaminationFmedicalItemsForm.fmedicalItems.fmedicalItemsFormat" type="text" placeholder="请检索项目"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品名称 drugsName-->
                          <b-form-group
                            label="非药品价格"
                            label-for="operateExaminationFmedicalItemsPrice"
                            :label-cols="3">
                            <b-form-input id="operateExaminationFmedicalItemsPrice" required disabled v-model="operateExaminationFmedicalItemsForm.fmedicalItems.fmedicalItemsPrice" type="text" placeholder="请检索项目"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="开立数量"
                            label-for="operateExaminationQuantity"
                            :label-cols="3">
                            <b-form-input id="operateExaminationQuantity" required v-model="operateExaminationFmedicalItemsForm.quantity" type="number" placeholder="请添加数量"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <!--    药品编码 drugsCode-->
                          <b-form-group
                            label="目的或要求"
                            label-for="operateExaminationPurposeRequirements"
                            :label-cols="3">
                            <b-form-input id="operateExaminationPurposeRequirements" required v-model="operateExaminationFmedicalItemsForm.purposeRequirements" type="text" placeholder="请输入"  ></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-modal>
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
              <examination-drugs-table
                :hidden="!showAdditionDrugs"
                :examination-drugs-items-list="currentExaminationDrugsItemsList"
                @saveExaminationDrugsItems="saveExaminationDrugsItems"
              >

              </examination-drugs-table>
            </b-tab>
            <b-tab :title="computedTitle2">
              <history-examination-list
                ref="history-examination-list"
               :type="type"
              ></history-examination-list>
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
  import ExaminationDrugsTable from "./examinationDrugsTable";
  import HistoryExaminationList from "./examinationList";
  import {mapState} from 'vuex';
  import GroupExamination from "./groupExamination";
    export default {
      name: "examination",
      components: {
        GroupExamination,
        RegistrationList,PatientInfo,FmedicalTable,CommonlyUsedExamination,ExaminationDrugsTable,HistoryExaminationList},
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

          api:[//定义需要用到的api
            {
              insertExaminationApi:"/doctor/examination/insertExamination",
              insertGroupExaminationApi:"/doctor/examination/insertGroupExamination",
              insertCommonlyUsedFmedicalApi:"/doctor/common/insertCommonlyUsedFmedical"
            },
            {
              insertExaminationApi:"/doctor/examination/insertExamination",
              insertGroupExaminationApi:"/doctor/examination/insertGroupExamination",
              insertCommonlyUsedFmedicalApi:"/doctor/common/insertCommonlyUsedFmedical"
            }
          ],
          examinationForm:{//当前的检查检验条目
            medicalRecordId:-1,
            doctorId:-1,
            doctorAdvice:'',//提交时添加医嘱
            examinationFmedicalItemsList:[],
            examinationMark:''//1检查2检验
          },
          examinationFmedicalItemsForm:{//当前的非药品条目
            doctorId:0,
            purposeRequirements:'',
            quantity:1,
            fmedicalItems:{},
            examinationDrugsItemsList:[],
          },
          operateExaminationFmedicalItemsForm:{//当前编辑的非药品条目
            doctorId:0,
            purposeRequirements:'',
            quantity:1,
            fmedicalItems:{},
            examinationDrugsItemsList:[],
          },
          examinationFmedicalItemsFields:[//非药品列表
            {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
            {key: 'quantity', label:'数量', sortable: true},
            {key: 'purposeRequirements', label:'目的或要求', sortable: true},
          ],
          selectedExaminationFmedcalItems:{},//当前选中的ExaminationFmedical
          showAdditionDrugs:false,//是否添加药品
          selectedExaminationFmedicalItemsIndex:-1,//当前选中的检查检验非药品项目的索引
          currentExaminationDrugsItemsList:[],
          historyExaminationList:[],//历史检查检查检验单记录
          ifReadonly:true,
          groupName:'',//组套名字
          groupCode:'',
          groupScope:'1',//组套范围
          scopeOptions:[
            { text: '个人', value: '1' },
            { text: '科室', value: '2' },
            { text: '全院', value: '3' },
          ],
          selectedFmedical:{},//记录在所有的非药品列表中选择的对象
          selectedCommonlyUsedItems:{},//记录在常用非药品中选择的对象
        }
      },
      computed:{
        ...mapState("doctor",["patient"]),
        ...mapState("common",["curr_user"]),
        ...mapState("doctor",["registration"]),
        ...mapState("doctor",["medicalRecordState"]),
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
      },
      methods:{

        selectPatient(){//选择患者
          //do nothing
          if(this.medicalRecordState==="未初诊"||this.medicalRecordState==="诊毕"||this.medicalRecordState==="未选择"){
            this.ifReadonly = true;
          }else{
            this.ifReadonly = false;
          }
        },

        onCite(groupExaminationInfoItem){//引用组套
          if(this.medicalRecordState==='未初诊'){
            alert("患者还未初诊");
          }else if(this.medicalRecordState==='诊毕'){
            alert("患者已经诊毕");
          }else{
            let groupExaminationFmedicalItemsList = groupExaminationInfoItem.groupExaminationFmedicalItemsList;
            for(let i = 0;i<groupExaminationFmedicalItemsList.length;i++){
              let examinationFmedicalItems = {};
              examinationFmedicalItems.purposeRequirements=groupExaminationFmedicalItemsList[i].purposeRequirements;
              examinationFmedicalItems.doctorId=this.curr_user.userId;
              examinationFmedicalItems.quantity = groupExaminationFmedicalItemsList[i].quantity;
              examinationFmedicalItems.fmedicalItemsId = groupExaminationFmedicalItemsList[i].fmedicalItemsId;
              examinationFmedicalItems.fmedicalItems = groupExaminationFmedicalItemsList[i].fmedicalItems;
              examinationFmedicalItems.examinationDrugsItemsList=[];
              let groupExaminationDrugsItemsList = groupExaminationFmedicalItemsList[i].groupExaminationDrugsItemsList;
              for(let j = 0;j<groupExaminationDrugsItemsList.length;j++){
                let examinationDrugsItems = {};
                examinationDrugsItems.drugsId = groupExaminationDrugsItemsList[j].drugs.drugsId;
                examinationDrugsItems.doctorId = this.curr_user.userId;
                examinationDrugsItems.drugs=groupExaminationDrugsItemsList[j].drugs;
                examinationDrugsItems.drugsUsage=groupExaminationDrugsItemsList[j].drugsUsage;
                examinationDrugsItems.dosage=groupExaminationDrugsItemsList[j].dosage;//药品用量
                examinationDrugsItems.times=groupExaminationDrugsItemsList[j].times;
                examinationDrugsItems.days=groupExaminationDrugsItemsList[j].days;
                examinationDrugsItems.quantity=groupExaminationDrugsItemsList[j].quantity;
                examinationFmedicalItems.examinationDrugsItemsList.push(Object.assign({},examinationDrugsItems));
              }
              this.examinationForm.examinationFmedicalItemsList.push(Object.assign({},examinationFmedicalItems));
            }
          }
        },
        examinationSave(){//存为组套
          this.$refs["examination-group"].show();
        },
        onSave(){
          let groupExamination = {};
          groupExamination.doctorId = this.curr_user.userId;
          groupExamination.groupExaminationName = this.groupName;
          groupExamination.groupExaminationCode = this.groupCode;
          groupExamination.groupExaminationScope = this.groupScope;
          if(this.type===0){
            groupExamination.groupExaminationType = '1';
          }else{
            groupExamination.groupExaminationType = '2';
          }
          let groupExaminationFmedicalItemsList = [];
          for(let i = 0;i<this.examinationForm.examinationFmedicalItemsList.length;i++){
            let groupExaminationFmedicalItems={};
            groupExaminationFmedicalItems.purposeRequirements=this.examinationForm.examinationFmedicalItemsList[i].purposeRequirements;
            groupExaminationFmedicalItems.quantity = this.examinationForm.examinationFmedicalItemsList[i].quantity;
            groupExaminationFmedicalItems.fmedicalItemsId = this.examinationForm.examinationFmedicalItemsList[i].fmedicalItemsId;
            groupExaminationFmedicalItems.groupExaminationDrugsItemsList=this.examinationForm.examinationFmedicalItemsList[i].examinationDrugsItemsList;
            groupExaminationFmedicalItemsList.push(Object.assign({},groupExaminationFmedicalItems));
          }
          groupExamination.groupExaminationFmedicalItemsList = groupExaminationFmedicalItemsList;
          console.log("开始打印组套");
          console.log(groupExamination);
          this.$post(this.api[this.type].insertGroupExaminationApi,JSON.parse(JSON.stringify(groupExamination))).then(res=>{
            if(res.status==="OK"){
              alert(res.msg);
            }else{
              alert(res.msg);
            }
          });
        },

        examinationReset(){//重置检查检验单
          this.examinationForm.doctorAdvice='';//当前的检查检验条目
          this.examinationForm.examinationFmedicalItemsList = [];
          this.resetExaminationFmedicalItem();
        },
        examinationSubmit(){//提交检查检验单
          if(this.type===0){
            this.examinationForm.examinationMark = '1';//检查
          }else{
            this.examinationForm.examinationMark = '2';//检验
          }
          this.examinationForm.doctorId=this.curr_user.userId;
          this.examinationForm.medicalRecordId=this.registration.medicalRecordId;
          console.log(this.examinationForm);
          this.$post(this.api[this.type].insertExaminationApi,JSON.parse(JSON.stringify(this.examinationForm))).then(res=>{
            if(res.status==="OK"){
              alert(res.msg);
              this.$refs["history-examination-list"].getHistoryExamination();
              this.examinationReset();
            }else{
              alert(res.msg);
            }
          });
        },
        selectFmedical(item){//在检索表单中选择一个非药品
          this.selectedFmedical = item;
        },
        selectFmedicalCancel(){
          this.selectedFmedical = {};
        },
        selectFmedicalOk(){
          this.examinationFmedicalItemsForm.fmedicalItems = JSON.parse(JSON.stringify(this.selectedFmedical));
          this.selectFmedicalCancel();
        },
        selectCommonlyUsedItem(item){//选中常用非药品
          this.selectedCommonlyUsedItems = item.fmedicalItems;
        },
        selectCommonlyUsedItemOk(){
          this.examinationFmedicalItemsForm.fmedicalItems = JSON.parse(JSON.stringify(this.selectedCommonlyUsedItems));
          this.selectCommonlyUsedItemCancel();
        },
        selectCommonlyUsedItemCancel(){
          this.selectedCommonlyUsedItems ={};
        },
        resetExaminationFmedicalItem(){//重置非药品检查检验条目
          this.examinationFmedicalItemsForm.fmedicalItems={};
          this.examinationFmedicalItemsForm.quantity = 1;
          this.examinationFmedicalItemsForm.purposeRequirements='';
        },
        addExaminationFmedicalItem(){//新增非药品检查检验条目
          if(JSON.stringify(this.examinationFmedicalItemsForm.fmedicalItems)=="{}"||(!this.examinationFmedicalItemsForm.fmedicalItems.fmedicalItemsId)) {//判断是否有诊断信息
            alert("您还没有选择检查检验条目");
          }else{
            this.examinationFmedicalItemsForm.doctorId = this.curr_user.userId;
            this.examinationFmedicalItemsForm.fmedicalItemsId = this.examinationFmedicalItemsForm.fmedicalItems.fmedicalItemsId;
            this.examinationForm.examinationFmedicalItemsList.push( Object.assign({},this.examinationFmedicalItemsForm));
            this.examinationFmedicalItemsForm.fmedicalItems={};
            this.examinationFmedicalItemsForm.fmedicalItemsId=-1;
            this.examinationFmedicalItemsForm.quantity=1;
            this.examinationFmedicalItemsForm.purposeRequirement='';
          }
        },
        selectExaminationFmedicalItems(item){//选中非药品项目
          let examinationFmedicalItemsList = this.examinationForm.examinationFmedicalItemsList;
          for(let i = 0 ; i< examinationFmedicalItemsList.length;i++){
            if(examinationFmedicalItemsList[i]===item[0]){
              this.selectedExaminationFmedicalItemsIndex=i;
              break;
            }
          }
        },
        exitExaminationFmedicalItems(){//编辑非药品
          if(this.selectedExaminationFmedicalItemsIndex>=0){
            this.operateExaminationFmedicalItemsForm = Object.assign(this.examinationForm.examinationFmedicalItemsList[this.selectedExaminationFmedicalItemsIndex]);
            console.log("目前要编辑的项目");
            this.$refs["operate-examination-fmedical-item-modal"].show();//弹框
          }else{
            alert("请选中非药品条目");
          }
        },
        exitExaminationFmedicalItemsOk(){//确认编辑
          this.$set(this.examinationForm.examinationFmedicalItemsList,this.selectedExaminationFmedicalItemsIndex,Object.assign({},this.operateExaminationFmedicalItemsForm));
          this.selectedExaminationFmedicalItemsIndex = -1;
        },
        deleteExaminationFmedicalItems(){//删除非药品
          if(this.selectedExaminationFmedicalItemsIndex>=0){
            this.examinationForm.examinationFmedicalItemsList.splice(this.selectedExaminationFmedicalItemsIndex,1);
          }else{
            alert("请选中非药品条目");
          }
        },
        saveExaminationFmedicalItems(){
          if(this.selectedExaminationFmedicalItemsIndex>=0){
            let commonlyUsedFmedical = {};
            commonlyUsedFmedical.fmedicalItemsId = this.examinationForm.examinationFmedicalItemsList[this.selectedExaminationFmedicalItemsIndex].fmedicalItemsId;
            commonlyUsedFmedical.doctorId = this.curr_user.userId;
            this.$post(this.api[this.type].insertCommonlyUsedFmedicalApi,JSON.parse(JSON.stringify(commonlyUsedFmedical))).then(res=>{
              if(res.status === "OK"){
                console.log(res.data);
                alert(res.msg);
              }else{
                console.log("插入失败");
                alert(res.msg);
              }
            });
          }else{
            alert("请选中非药品条目");
          }
        },
        additionExaminationFmedicalItems(){//加非药品
          if(this.selectedExaminationFmedicalItemsIndex>=0){
            this.showAdditionDrugs = true;
            this.currentExaminationDrugsItemsList = JSON.parse(JSON.stringify(this.examinationForm.examinationFmedicalItemsList[this.selectedExaminationFmedicalItemsIndex].examinationDrugsItemsList));
            // this.examinationFmedicalItemsForm = Object.assign({},this.examinationForm.examinationFmedicalItemsList[this.selectedExaminationFmedicalItemsIndex]);
          }else{
            alert("请选中非药品条目");
          }
        },
        saveExaminationDrugsItems(form){//保存药品
          if(this.selectedExaminationFmedicalItemsIndex>=0){
            this.examinationForm.examinationFmedicalItemsList[this.selectedExaminationFmedicalItemsIndex].examinationDrugsItemsList= Object.assign([],form);
            this.showAdditionDrugs=false;
            console.log(this.examinationForm);
          }else{
            alert("您正在进行错误操作");
          }
        },

      }
    }
</script>

<style scoped>

</style>
