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
        <group-treatment
         @onCite="onCite"
        ></group-treatment>
      </b-col>
      <b-col lg="9">
        <b-card header="处置">
          <div slot="header"><!-- slot设置插槽便于模板数据的精准插入-->
            填写模块
            <div class="card-header-actions">
              <b-button-group class="pull-right" ><!-- 此处为清空暂存提交按钮 -->
                <b-button :disabled="ifReadonly" size="sm" @click="treatmentReset" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                <b-button :disabled="ifReadonly" size="sm" @click="treatmentSave" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 存档</b-button>
                <b-button :disabled="ifReadonly" size="sm" @click="treatmentSubmit" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
              </b-button-group>
            </div>
          </div>

          <b-modal ref="treatment-group" size="md" @ok="onSave" okTitle="保存" cancelTitle="取消" centered title="存为模板">
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
            <b-tab title = "开立处置" :disabled="this.ifReadonly">
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


                    <b-modal :id="computedModalId"  okTitle="确定" cancelTitle="取消" @ok="selectFmedicalOk" @cancel="selectFmedicalCancel"  size="lg" centered title="检索处置">
                      <fmedical-table
                        @selectFmedical="selectFmedical"
                        :type=this.type>
                      </fmedical-table>
                    </b-modal>

                    <b-modal :id="computedCommonlyUsedModalId" okTitle="确定" cancelTitle="取消" @ok="selectCommonlyUsedItemOk" @cancel="selectCommonlyUsedItemCancel"  size="lg" centered title="常用处置">
                      <commonly-used-treatment
                        :type=2
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
                          <b-button variant="outline-dark" size="md" @click="saveTreatmentItem()">存档
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
                :if-readonly="this.ifReadonly"
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
  import GroupTreatment from "./component/groupTreatment";
  import {mapState} from "vuex";
    export default {
      name: "treatment",
      components:{GroupTreatment,RegistrationList,PatientInfo,FmedicalTable,CommonlyUsedTreatment,HistoryTreatmentTable},
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
              insertTreatmentApi:"/doctor/treatment/insertTreatment",
              insertGroupTreatmentApi:"/doctor/treatment/insertGroupTreatment",
              insertCommonlyUsedFmedicalApi:"/doctor/common/insertCommonlyUsedFmedical"
            },
            treatmentItemsFields:[
              {key: 'fmedicalItems.fmedicalItemsCode', label:'编码', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsName', label:'名称', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsFormat', label:'规格', sortable: true},
              {key: 'fmedicalItems.fmedicalItemsPrice', label:'价格', sortable: true},
              {key: 'quantity', label:'数量', sortable: true},
            ],
            ifReadonly:true,
            selectedCommonlyUsedItem:{},//在常用项目中选择的项目
            selectedFmedical:{},//在所有处置信息中选择的项目
            groupName:'',//组套名字
            groupCode:'',
            groupScope:'1',//组套范围
            scopeOptions:[
              { text: '个人', value: '1' },
              { text: '科室', value: '2' },
              { text: '全院', value: '3' },
            ],
          }
      },
      computed:{
        ...mapState("doctor",["patient"]),
        ...mapState("common",["curr_user"]),
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
          if(this.medicalRecordState==="未初诊"||this.medicalRecordState==="诊毕"){
            this.ifReadonly = true;
          }else{
            this.ifReadonly = false;
          }
        },
        selectFmedical(item){//选择处置非处置非药品项目
          this.selectedFmedical = item;

        },
        selectFmedicalOk(){
          this.treatmentItemForm.fmedicalItems = JSON.parse(JSON.stringify(this.selectedFmedical));
          this.selectFmedicalCancel();
        },
        selectFmedicalCancel(){
          this.selectedFmedical = {};
        },

        selectCommonlyUsedItem(item){//选择常用处置非处置非药品项目
          this.selectedCommonlyUsedItem = item.fmedicalItems;
        },
        selectCommonlyUsedItemOk(){
          this.treatmentItemForm.fmedicalItems = JSON.parse(JSON.stringify(this.selectedCommonlyUsedItem));
          this.selectCommonlyUsedItemCancel();
        },
        selectCommonlyUsedItemCancel(){
          this.selectedCommonlyUsedItem = {};
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
            doctorId:this.curr_user.userId,
            treatmentItemsList:[],//处方药品数组
          };
          this.resetTreatmentItem();
        },
        treatmentSubmit(){//提交处置单
          this.treatmentForm.medicalRecordId=this.registration.medicalRecordId;
          this.treatmentForm.doctorId=this.curr_user.userId;
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
          this.treatmentReset();//
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
          if(JSON.stringify(this.treatmentItemForm.fmedicalItems)=="{}"||(!this.treatmentItemForm.fmedicalItems.fmedicalItemsId )) {//判断是否有诊断信息
            alert("您还没有选择处方条目");
          }else{
            this.treatmentItemForm.fmedicalItemsId = this.treatmentItemForm.fmedicalItems.fmedicalItemsId;
            this.treatmentForm.treatmentItemsList.push( Object.assign({},this.treatmentItemForm));
            this.treatmentItemForm={
              fmedicalItems:{},//处置非药品
              fmedicalItemsId:-1,//处置非药品ID
              quantity:1,//开立数量
              actualQuantity:1,//实际数量
            };
            this.resetTreatmentItem();
          }

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
        saveTreatmentItem(){
          if(this.selectedIndex>=0){
            let commonlyUsedFmedical = {};
            commonlyUsedFmedical.fmedicalItemsId = this.treatmentForm.treatmentItemsList[this.selectedIndex].fmedicalItems.fmedicalItemsId;
            commonlyUsedFmedical.doctorId = this.curr_user.userId;
            this.$post(this.api.insertCommonlyUsedFmedicalApi,JSON.parse(JSON.stringify(commonlyUsedFmedical))).then(res=>{
              if(res.status==="OK"){
                alert(res.msg);
              }else{
                alert(res.msg);
              }
            });
          }else{
            alert("请选中处置条目");
          }
        },
        deleteTreatmentItem(){
          if(this.selectedIndex>=0){
            this.treatmentForm.treatmentItemsList.splice(this.selectedIndex,1);
            this.selectedIndex = -1;
          }else{
            alert("请选中处置条目");
          }
        },
        onCite(groupTreatmentInfoItem) {//
          if (this.medicalRecordState === '未初诊') {
            alert("患者还未初诊");
          } else if (this.medicalRecordState === '诊毕') {
            alert("患者已经诊毕");
          } else {
            let treatmentItemsList = groupTreatmentInfoItem.groupTreatmentItemsList;
            for (let i = 0; i < treatmentItemsList.length; i++) {
              let treatmentItems = {};
              treatmentItems.fmedicalItems = treatmentItemsList[i].fmedicalItems;
              treatmentItems.fmedicalItemsId = treatmentItemsList[i].fmedicalItemsId;
              treatmentItems.quantity = treatmentItemsList[i].quantity;
              this.treatmentForm.treatmentItemsList.push(Object.assign({}, treatmentItems));
            }
          }
        },
        treatmentSave(){//
          this.$refs["treatment-group"].show();
        },
        onSave(){
          let groupTreatment={};
          groupTreatment.doctorId = this.curr_user.userId;
          groupTreatment.groupTreatmentCode = this.groupCode;
          groupTreatment.groupTreatmentName = this.groupName;
          groupTreatment.groupTreatmentScope= this.groupScope;
          groupTreatment.groupTreatmentItemsList = this.treatmentForm.treatmentItemsList;
          this.$post(this.api.insertGroupTreatmentApi,JSON.parse(JSON.stringify(groupTreatment))).then(res=>{
            if(res.status==="OK"){
              alert(res.msg);
            }else{
              alert(res.msg);
            }
          });
        },

      }
    }
</script>

<style scoped>

</style>
