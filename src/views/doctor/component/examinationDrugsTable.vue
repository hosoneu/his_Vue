<template>
  <b-card header="附加药品" >
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
        <!--   *********************** 检索草药的弹框  ************************          -->
        <b-modal :id="computedDrugsModalId+'herbal'"  okTitle="确认" cancelTitle="取消"  size="lg" centered title="检索草药">
          <herbal-drugs-table
            @selectDrugs="selectDrugs"
            :type=1>
          </herbal-drugs-table>
        </b-modal>
        <!--   *********************** 检索成药的弹框  ************************          -->
        <b-modal :id="computedDrugsModalId+'patent'"  okTitle="确认" cancelTitle="取消"  size="lg" centered title="检索成药">
          <patent-drugs-table
            @selectDrugs="selectDrugs"
            :type=0>
          </patent-drugs-table>
        </b-modal>
        <!--   ***********************  检索常用药品的弹框  ************************          -->
        <b-modal :id="computedCommonlyUsedDrugsModalId"  okTitle="确认" cancelTitle="取消" size="lg" centered title="常用药品">
          <commonly-used-drugs
            @selectCommonlyUsedItem="selectCommonlyUsedDrugsItem"
            :commonly-used-type=0
            :commonly-used-api=this.commonlyUsedDrugsApi
            :commonly-used-fields=this.commonlyUsedDrugsFields
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
              <b-form-input id="drugsCode" required disabled v-model="examinationDrugsItemsForm.drugs.drugsCode" type="text" placeholder="请检索药品"  ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <!--    药品名称 drugsName-->
            <b-form-group
              label="药品名称"
              label-for="drugsName"
              :label-cols="3">
              <b-form-input id="drugsName" required disabled v-model="examinationDrugsItemsForm.drugs.drugsName" type="text" placeholder="请检索药品"  ></b-form-input>
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
              <b-form-input id="drugsFormat" disabled v-model="examinationDrugsItemsForm.drugs.drugsFormat" type="text" placeholder="请检索药品"  ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <!--    药品名称 drugsName-->
            <b-form-group
              label="药品价格"
              label-for="drugsName"
              :label-cols="3">
              <b-form-input id="drugsPrice" disabled v-model="examinationDrugsItemsForm.drugs.drugsPrice" type="text" placeholder="请检索药品"  ></b-form-input>
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
              <b-form-select v-model="examinationDrugsItemsForm.drugsUsage" :options="drugsUsageOptions" ></b-form-select>
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
                  <b-form-input id="days" required v-model="examinationDrugsItemsForm.days" type="number"  ></b-form-input>
                </b-col>

                <b-col md="2">
                  <p>天</p>
                </b-col>
                <b-col md="4">
                  <b-form-input id="times" required v-model="examinationDrugsItemsForm.times" type="number"  ></b-form-input>
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
              <b-form-input id="quantity" required v-model="examinationDrugsItemsForm.quantity" type="text" placeholder="请输入..."  ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <!--    药品名称 drugsName-->
            <b-form-group
              label="每次用量"
              label-for="dosage"
              :label-cols="3">
              <b-form-input id="dosage" required v-model="examinationDrugsItemsForm.dosage" type="text" placeholder="请输入..."  ></b-form-input>
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
              <b-form-textarea v-model="examinationDrugsItemsForm.drugsAdvice" id="drugsAdvice" placeholder="请输入..." rows="3" ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col
            align="right"
          >
            <b-button-group class="pull-right">
              <b-button size="md" variant="outline-dark"  @click="exitExaminationDrugsItems" >编辑
              </b-button>
              <b-button size="md" variant="outline-dark" @click="deleteExaminationDrugsItems">删除
              </b-button>
              <b-button size="md" variant="outline-dark" @click="saveExaminationDrugsItems">保存
              </b-button>
            </b-button-group>
          </b-col>
        </b-row>
        <!--    ******************   编辑界面   *****************          -->
        <b-modal ref="operate-examination-drugs-item-modal" size="lg" centered title="修改诊断" @ok="exitOk">
          <b-row>
            <b-col md="6">
              <!--    药品编码 drugsCode-->
              <b-form-group
                label="药品编码"
                label-for="operateDrugsCode"
                :label-cols="3">
                <b-form-input id="operateDrugsCode" required disabled v-model="operateExaminationDrugsItemsForm.drugs.drugsCode" type="text" placeholder="请检索药品"  ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <!--    药品名称 drugsName-->
              <b-form-group
                label="药品名称"
                label-for="operateDrugsName"
                :label-cols="3">
                <b-form-input id="operateDrugsName" required disabled v-model="operateExaminationDrugsItemsForm.drugs.drugsName" type="text" placeholder="请检索药品"  ></b-form-input>
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
                <b-form-input id="operateDrugsFormat" disabled v-model="operateExaminationDrugsItemsForm.drugs.drugsFormat" type="text" placeholder="请检索药品"  ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <!--    药品名称 drugsName-->
              <b-form-group
                label="药品价格"
                label-for="operateDrugsName"
                :label-cols="3">
                <b-form-input id="operateDrugsPrice" disabled v-model="operateExaminationDrugsItemsForm.drugs.drugsPrice" type="text" placeholder="请检索药品"  ></b-form-input>
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
                <b-form-select id="operateDrugsUsage" v-model="operateExaminationDrugsItemsForm.drugsUsage" :options="drugsUsageOptions" ></b-form-select>
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
                    <b-form-input id="operateDays" required v-model="operateExaminationDrugsItemsForm.days" type="number"  ></b-form-input>
                  </b-col>

                  <b-col md="2">
                    <p>天</p>
                  </b-col>
                  <b-col md="4">
                    <b-form-input id="operateTimes" required v-model="operateExaminationDrugsItemsForm.times" type="number"  ></b-form-input>
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
                <b-form-input id="operateQuantity" required v-model="operateExaminationDrugsItemsForm.quantity" type="text" placeholder="请输入..."  ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <!--    药品名称 drugsName-->
              <b-form-group
                label="每次用量"
                label-for="operateDosage"
                :label-cols="3">
                <b-form-input id="operateDosage" required v-model="operateExaminationDrugsItemsForm.dosage" type="text" placeholder="请输入..."  ></b-form-input>
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
                <b-form-textarea v-model="operateExaminationDrugsItemsForm.drugsAdvice" id="operateDrugsAdvice" placeholder="请输入..." rows="3" ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-modal>

        <br>
        <!--展示选中的非药品对应开立的药品列表-->
        <b-table
          show-empty
          stacked="md"
          hover
          selectable
          select-mode="single"
          :items="examinationDrugsItemsList"
          :fields="examinationDrugsItemsFields"
          @row-selected="selectExaminationDrugsItems"
        >
        </b-table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  import HerbalDrugsTable from "./drugsTable";
  import PatentDrugsTable from "./drugsTable";
  import CommonlyUsedDrugs from "./commonlyUsedItems";
  import {mapState} from "vuex";
    export default {
      name: "examinationDrugsTable",
      components:{HerbalDrugsTable,PatentDrugsTable,CommonlyUsedDrugs},
      props:{
        examinationDrugsItemsList:{
          type:Array,
          default:()=>{return []}
        },
      },
      data(){
        return{
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
          examinationDrugsItemsForm:{//当前的药品条目
            drugs:{},//药品
            drugsId:-1,//药品ID
            drugsUsage:"4",//药品用法：1 静脉滴注 2 静脉可注 3 肌肉注射 4 口服 5 皮试 6 皮下注射
            dosage:0.0,//药品用量
            times:3,//次数
            days:1,//天数 *次*天 如1天3次
            quantity:1,//开立数量
            drugsAdvice:'',//药品医嘱
          },
          operateExaminationDrugsItemsForm:{//当前编辑的药品条目
            drugs:{},//药品
            drugsId:-1,//药品ID
            drugsUsage:"4",//药品用法：1 静脉滴注 2 静脉可注 3 肌肉注射 4 口服 5 皮试 6 皮下注射
            dosage:0.0,//药品用量
            times:3,//次数
            days:1,//天数 *次*天 如1天3次
            quantity:1,//开立数量
            drugsAdvice:'',//药品医嘱
          },
          examinationDrugsItemsFields:[//非药品对应的药品列表
            {key: 'drugs.drugsName', label:'名称', sortable: true},
            {key: 'drugs.drugsFormat', label:'规格', sortable: true},
            {key: 'quantity', label:'数量', sortable: true},
            {key: 'drugsUsage', label:'用法', sortable: true},
            {key: 'days', label:'频次', sortable: true},
            {key: 'dosage', label:'用量', sortable: true},
            {key: 'drugs.drugsPrice', label:'单价', sortable: true},
            {key: 'drugsAdvice', label:'医嘱'}
          ],
          drugsUsageOptions:[
            { value: '1', text: '静脉滴注' },
            { value: '2', text: '静脉可注' },
            { value: '3', text: '肌肉注射' },
            { value: '4', text: '口服' },
            { value: '5', text: '皮试'},
            { value: '6', text: '皮下注射' },
          ],
          selectedIndex:-1,//当前选中的检查检验药品条目索引
          total:0,
        }
      },
      computed:{
        ...mapState("common",["curr_user"]),
        computedDrugsModalId(){//药品弹框
          return this.modalId+this.type+"drugs";
        },
        computedCommonlyUsedDrugsModalId(){//常用药品弹框
          return this.commonlyUsedModalId+this.type+"drugs";
        },
      },
      watch:{
        examinationDrugsItemsList:{
          handler(){
            this.total = this.examinationDrugsItemsList.length;
          },
        }
      },
      methods:{
        selectDrugs(item){//选中药品
          this.examinationDrugsItemsForm.drugs = item;
        },
        selectCommonlyUsedDrugsItem(item){//选中常用药品
          this.examinationDrugsItemsForm.drugs = item.drugs;
        },
        resetExaminationDrugsItem(){//重置当前非药品项目的附加药品
          this.examinationDrugsItemsForm.drugs={};
          this.examinationDrugsItemsForm.drugsUsage="4";//药品用法：1 静脉滴注 2 静脉可注 3 肌肉注射 4 口服 5 皮试 6 皮下注射
          this.examinationDrugsItemsForm.dosage=0.0;//药品用量
          this.examinationDrugsItemsForm.times=3;//次数
          this.examinationDrugsItemsForm.days=1;//天数 *次*天 如1天3次
          this.examinationDrugsItemsForm.quantity=1;//开立数量
          this.examinationDrugsItemsForm.drugsAdvice='';//药品医嘱
        },
        addExaminationDrugsItem(){//为非药品项目附加药品
          this.examinationDrugsItemsForm.drugsId = this.examinationDrugsItemsForm.drugs.drugsId;
          this.examinationDrugsItemsForm.doctorId = this.curr_user.userId;
          this.examinationDrugsItemsList.push(JSON.parse(JSON.stringify(this.examinationDrugsItemsForm)));
          this.resetExaminationDrugsItem();
        },
        saveExaminationDrugsItems(){//保存当前药品
          console.log("现在要保存当前药品列表");
          this.$emit("saveExaminationDrugsItems",this.examinationDrugsItemsList);
        },
        selectExaminationDrugsItems(item){//选中检查检验药品条目
          let currentExaminationDrugsItemsList = this.examinationDrugsItemsList;
          for(let i = 0 ; i< currentExaminationDrugsItemsList.length;i++){
            if(currentExaminationDrugsItemsList[i]===item[0]){
              this.selectedIndex = i;
              break;
            }
          }
        },
        exitExaminationDrugsItems(){//编辑检查检验药品项目
          if(this.selectedIndex>=0){
            this.$refs["operate-examination-drugs-item-modal"].show();//弹框
            this.operateExaminationDrugsItemsForm = JSON.parse(JSON.stringify(this.examinationDrugsItemsList[this.selectedIndex]));
          }else{
            alert("请选中药品条目");
          }
        },
        exitOk(){
          this.examinationDrugsItemsList.splice(this.selectedIndex,1,JSON.parse(JSON.stringify(this.operateExaminationDrugsItemsForm)));
        },
        deleteExaminationDrugsItems(){//删除检查检验药品项目
          this.examinationDrugsItemsList.splice(this.selectedIndex,1);
        },
      }
    }
</script>

<style scoped>

</style>
