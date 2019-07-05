<template>
  <div>
    <b-card>
      <b-row>
        <b-col lg="2"></b-col>
        <b-col lg="2">
          <span><i class="fa fa-id-card"> 病历号</i> : {{selectedPatientItems.medicalRecordId}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-user"> 患者姓名</i> :  {{selectedPatientItems.patientName}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-genderless"> 性别</i> :  {{selectedPatientItems.patientGender=="未选择"?"未选择":selectedPatientItems.patientGender==1?"男":"女"}}</span>
        </b-col>
        <b-col lg="2">
          <span><i class="fa fa-money"> 年龄</i> :  {{selectedPatientItems.patientAge}}</span>
        </b-col>
        <b-col lg="2"></b-col>
      </b-row>
    </b-card>
    <b-row>
      <b-col lg="3">
        <b-card header="患者列表" >
          <!--    <b-tabs @input="changeTab">-->
          <!-- changeTab更换tab 个人/科室挂号列表 -->
          <!--      <b-tab v-for="(tab, index) in registrationTabs" :title="tab.title" :key="index" :active="index === currentTab" >-->
          <!-- 分别存放tab的内容-->
          <b-row>
            <b-col sm="8" class="my-1">
              <b-input-group>
                <b-form-input
                  v-model="filter"
                  placeholder="请输入..."
                  size="sm"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    :disabled="!filter"
                    @click="filter = ''"
                    size="sm"
                  >
                    清空</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col sm="4" class="my-1">
              <b-form-select
                v-model="perPage"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
            </b-col>
          </b-row>
          <!-- Main table element -->
          <b-table
            selectable
            select-mode="single"
            show-empty
            hover
            :aria-busy="isBusy"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @row-selected="selectPatient"
          >
            <!-- @filtered当本地筛选导致项目数发生变化时发出。-->
            <!-- 自定义诊断的展示格式 -->
          </b-table>
          <!--页码-->
          <b-row>
            <b-col md="12" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="total"
                :per-page="perPage"
                class="my-0"
                size="sm"
                align="center"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="9">
        <b-card header="药品详情">
          <div slot="header">
            门诊发药单
            <div class="card-header-actions">
              <b-button-group class="pull-right">
                <b-button size="sm" variant="success" @click="dispensing"><i class="fa fa-print"></i>发药</b-button>
                <b-button size="sm" class="d-sm-down-none" variant="secondary" @click="returnDrugs"><i class="fa fa-print"></i> 退药</b-button>
              </b-button-group>
            </div>
          </div>
          <b-table  select-mode="multi"
                    selectable
                    show-empty
                    hover :items="drugItems" :fields="drugsFields"
                    @row-selected="rowSelected">
            <template slot="总金额" slot-scope="data">
              <!--            <b-badge :variant="success">{{data.item.amount}}</b-badge>-->
              {{data.item.drugs.drugsPrice * data.item.actualQuantity}}
            </template>
            <template slot="发药状态" slot-scope="data">
              {{getStatus(data.item)}}
            </template>
<!--            {key: '总金额'},-->
<!--            {key: '发药状态',sortable: true},-->
          </b-table>
        </b-card>
      </b-col>
    </b-row>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="请输入退药数量"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="数量"
          label-for="name-input"
          invalid-feedback="number is required"
        >
          <b-form-input
            id="name-input"
            v-model="number"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
    import ButtonGroups from "../home/buttons/ButtonGroups";
    export default {
      name: "pharmacy",
      components: {ButtonGroups},
      data(){
          return{
            isBusy: false,
            items:[],
            total:0,
            perPage: 5,
            pageOptions: [5, 10, 15],
            currentPage:1,// currentPage:1 表示当前页码为1
            currentTab:0,//  currentTab:0表示个人挂号列表
            sortBy: null,
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,

            selectedPatientItems:{medicalRecordId: "未选择", patientName: "未选择", patientGender: '未选择', patientAge: '未选择'},

            fields: [
              {key: 'medicalRecordId', label: '病历号', sortable: true},
              {key: 'patient.patientName', label: '姓名', sortable: true},
              {key: 'doctorId', label:'医生id'}
              // {key: 'diagnosis_status', label:'状态', sortable: true},
            ],
            drugsFields: [
              {key: 'drugs.drugsCode', label: '药品代码',sortable: true},
              {key: 'drugs.drugsName', label: '药品名称',sortable: true},
              {key: 'drugs.drugsFormat', label: '规格'},
              {key: 'quantity', label: '开立数量',sortable: true},
              {key: 'actualQuantity', label: '实际数量',sortable: true},
              {key: 'drugs.drugsPrice', label: '单价',sortable: true},
              {key: '总金额'},
              {key: '发药状态',sortable: true},
            ],

            drugItems:[],//存储当前病人的药
            currentPatient:{},
            currentAllExamination:{},
            currentAllPrescription:{},
            selectedDrugs:[],//存储选择的药

            //modal数据
            number:0,
            nameState: null,
          }
      },
      mounted:async function () {
        let url='/dispensing/getAllExaminationMedical';
        await this.$get(url).then(res=>{
          if (res.status == "OK"){
            console.log("已获得");
            console.log(res.data);
            this.total += res.data.length;//页码

            this.currentAllExamination = res.data;
            //获得每项的patient信息
            for (let i=0;i<res.data.length;i++){
              // let tempData = null;
              this.getPatient(res.data[i].medicalRecordId,i,0);
            }
            //获取每项非药品信息和缴费信息
            let url3 = '/dispensing/getFmedical';
            let url4 = '/dispensing/getExpenseItems';
            for (let l=0;l<this.currentAllExamination.length;l++){
              for (let k=0;k<this.currentAllExamination[l].examinationDrugsItemsList.length;k++){
                let data3 = {examinationFmedicalItemsId:this.currentAllExamination[l].examinationDrugsItemsList[k].examinationFmedicalItemsId};
                this.$get(url3, data3).then(response1=>{
                  if (response1.status == "OK"){
                    console.log("得到fmedical数据");
                    this.$set(this.currentAllExamination[l].examinationDrugsItemsList[k], 'ffmedical');
                    this.currentAllExamination[l].examinationDrugsItemsList[k].ffmedical = response1.data;
                  }
                  else{
                    alert("url3出错");
                  }
                });

                let data4 = {expenseItemsId:this.currentAllExamination[l].examinationDrugsItemsList[k].expenseItemsId};
                console.log(data4);
                console.log("即将输出的data4");
                this.$get(url4, data4).then(response2=>{
                  if (response2.status == "OK"){
                    console.log("得到expenseItem数据");
                    console.log(response2.data);
                    this.$set(this.currentAllExamination[l].examinationDrugsItemsList[k], 'expenseItem');
                    this.currentAllExamination[l].examinationDrugsItemsList[k].expenseItem = response2.data;
                  }
                  else {
                    console.log('出错的url4');
                    console.log(response2.data);
                    alert("url4出错");
                  }
                });
              }
            }


            //拷贝
            for (let p=0;p<this.currentAllExamination.length;p++){
              this.items.push(this.currentAllExamination[p]);
            }
          }
        });
        let url2='/dispensing/getAllPrescriptionMedical';
        await this.$get(url2).then(respon=>{
            if (respon.status == "OK"){
              console.log('已获得处方数据');
              console.log(respon.data);
              this.total += respon.data.length;
              this.currentAllPrescription = respon.data;
              console.log(this.items);
              console.log("加入之后");
              this.currentAllPrescription = respon.data;//先赋值，在拷贝
              for (let m=0;m<this.currentAllPrescription.length;m++){
                this.getPatient(this.currentAllPrescription[m].medicalRecordId, m, 1);
                let url5 = '/dispensing/getExpenseItems';
                for (let t=0;t<this.currentAllPrescription[m].prescriptionItems.length;t++){
                  let data5 = {expenseItemsId:this.currentAllPrescription[m].prescriptionItems[t].expenseItemsId}
                  console.log("这是即将输出的prescription");

                  this.$get(url5, data5).then(response5=>{
                    if (response5.status == "OK"){
                      console.log(response5.data);
                      this.$set(this.currentAllPrescription[m].prescriptionItems[t], 'expenseItem');
                      this.currentAllPrescription[m].prescriptionItems[t].expenseItem = response5.data;
                    }
                    else {
                      alert("url5报错");
                    }
                  });
                }
              }
              for(let n=0;n<respon.data.length;n++){
                this.items.push(respon.data[n]);
              }
            }
            else {
              alert("报错");
            }
        })
      },
      methods:{
         onFiltered(filteredItems) {
          // 触发分页以更新由于过滤而导致的按钮/页数
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        getPatient:async function (medicalRecordId, index, judge) {
          console.log("开始查询");
          let url1='/dispensing/getPatientById';
          let data1 = {medicalRecordId:medicalRecordId};
          await this.$get(url1, data1).then(response=>{
            if (response.status == "OK"){
              if (judge==0){
                this.$set(this.currentAllExamination[index], 'patient');
                this.currentAllExamination[index].patient = response.data;
              }
              else {//judge==1
                this.$set(this.currentAllPrescription[index], 'patient');
                this.currentAllPrescription[index].patient = response.data;
              }
              console.log(response.data);
              console.log("病人信息");
              return response.data;
            }
            else {
              console.log("没有获得病人信息");
              return null;
            }
          });
        },
        //选择患者
        selectPatient:function(item){
           console.log("这是item");
           console.log(item);
           if (item.length == 0){
             this.currentPatient = {};
             this.drugItems = [];

             this.selectedPatientItems.medicalRecordId = "未选择";
             this.selectedPatientItems.patientName = "未选择";
             this.selectedPatientItems.patientGender = "未选择";
             this.selectedPatientItems.patientAge = "未选择";

             return;
           }

           this.currentPatient = item[0];

          //对selectedPatientItems进行赋值
          // selectedPatientItems:{medicalRecordId: "未选择", patientName: "未选择", patientGender: '未选择', patientAge: '未选择'},
          this.selectedPatientItems.medicalRecordId = this.currentPatient.medicalRecordId;
          this.selectedPatientItems.patientName = this.currentPatient.patient.patientName;
          this.selectedPatientItems.patientGender = this.currentPatient.patient.patientGender;
          this.selectedPatientItems.patientAge = this.currentPatient.patient.patientAge;

           console.log(item[0]);
           console.log("打印选择项");
           console.log(item[0].examinationDrugsItemsList);
           if (!item[0].examinationDrugsItemsList){
             console.log("选择处方药");
             this.drugItems = item[0].prescriptionItems ;
             console.log(this.drugItems);
           }
           else{
             console.log("选择检查检验药");
             this.drugItems = item[0].examinationDrugsItemsList;
           }

        },
        rowSelected:function(items){
          console.log(items);
          this.selectedDrugs = items;
        },
        getStatus:function(item){
           if (!item.expenseItem.payStatus) {
             return '不存在';
           }
          if (item.expenseItem.payStatus != "2") {
            return "无效";
          }
          else if (item.expenseItem.payStatus == "2"){
            if (item.drugsDispensingStatus == "1"){
              return "未发";
            } 
            else if (item.drugsDispensingStatus == "2"){
              return "已发";
            }
            else if (item.drugsDispensingStatus == "3"){
              return "已部分退药";
            }
          }
          else {
            return item;
          }
        },
        dispensing:function () {
          if (this.selectedDrugs.length == 0){
            alert("请先选择药品");
            return;
          }
          for (let i=0;i<this.selectedDrugs.length;i++){
            if (this.selectedDrugs[i].drugsDispensingStatus == 2||this.selectedDrugs[i].drugsDispensingStatus == 3){
              alert("请确认选择药品全部未发药");
              return;
            }
          }

          console.log(this.selectedDrugs);
          console.log("当前病人");

          console.log(this.currentPatient);
          let url = '/dispensing/dispensing';

          let data = [];
          for (let i=0;i<this.selectedDrugs.length;i++){
            data.push(this.selectedDrugs[i].drugs.drugsId);
          }
          data.push(this.currentPatient.medicalRecordId);

          this.$post(url, data).then(res=>{
            if (res.data == "OK"){
              alert("发药成功");
            }
            else{
              alert("发药失败");
            }
          });
          //改变状态1->2
          if (this.currentPatient.examinationId) {//若是检查检验药
            console.log("检查检验药");
            for (let n=0;n<this.selectedDrugs.length;n++){
              let drugsId = this.selectedDrugs[n].drugsId;
              for (let i=0;i<this.currentAllExamination.length;i++){
                if (this.currentPatient.examinationId == this.currentAllExamination[i].examinationId) {//找到
                  for (let m=0;m<this.currentAllExamination[i].examinationDrugsItemsList.length;m++){
                    if (drugsId == this.currentAllExamination[i].examinationDrugsItemsList[m].drugsId) {//找到该药品
                      this.currentAllExamination[i].examinationDrugsItemsList[m].drugsDispensingStatus = "2";
                      alert("更改成功");
                    }
                  }
                }
              }
            }
          }
          else if (this.currentPatient.prescriptionId){//是处方药
            console.log("处方药");
            for (let n=0;n<this.selectedDrugs.length;n++){
              let drugsId = this.selectedDrugs[n].dragsId;
              alert("药id" + drugsId);
              for (let i=0;i<this.currentAllPrescription.length;i++){
                if (this.currentPatient.prescriptionId == this.currentAllPrescription[i].prescriptionId) {//找到
                  alert("找到currentAllPrescription");
                  for (let m=0;m<this.currentAllPrescription[i].prescriptionItems.length;m++){
                    if (drugsId == this.currentAllPrescription[i].prescriptionItems[m].dragsId){//找到该药品
                      this.currentAllPrescription[i].prescriptionItems[m].drugsDispensingStatus = "2";
                      alert(drugsId);
                      alert("进来一次");
                    }
                  }
                }
              }
            }
          }
          else {
            alert("系统出错");
          }

        },
        returnDrugs:function () {
          if (this.selectedDrugs.length != 1){
            alert("请只选择一个药品");
            return;
          }
          if (this.selectedDrugs[0].drugsDispensingStatus != 2){
            alert("请选择已发药品");
            return;
          }
          else if (this.selectedDrugs.length == 1){
            this.$bvModal.show("modal-prevent-closing");
          }
        },

        returnDrugsTemp:function(){
           //部分药
           if (this.selectedDrugs[0].examinationDrugsItemsId){
             console.log("为检查检验药");
             let url1 = '/dispensing/returnExaminationDurgs';
             this.selectedDrugs[0].actualQuantity = this.selectedDrugs[0].quantity-this.number;
             this.selectedDrugs[0].drugsDispensingStatus = "3";
             let data1 = this.selectedDrugs[0];
             this.$post(url1, data1).then(res =>{
                if (res.status == "OK"){
                  console.log("检查检验退药ok");
                }
             });
           }
           else if (this.selectedDrugs[0].prescriptionId){
             console.log("为处方药");
             let url2 = '/dispensing/returnPrescriptionDurgs';
             this.selectedDrugs[0].actualQuantity = this.selectedDrugs[0].quantity-this.number;
             this.selectedDrugs[0].drugsDispensingStatus = "3";
             let data2 = this.selectedDrugs[0];
             this.$post(url2, data2).then(respon =>{
               if (respon.status == "OK"){
                  console.log("处方退药ok");
               }
             });
           }
           else {
             alert("出错");
           }
        },

        //modal相关
        checkFormValidity() {
          const valid = this.$refs.form.checkValidity()
          this.nameState = valid ? 'valid' : 'invalid'
          return valid
        },
        resetModal() {
          this.number = 0
          this.nameState = null
        },
        handleOk(bvModalEvt) {
           alert("ok");
           if (this.number<=0 || this.number>this.selectedDrugs[0].quantity) {
             alert("请输入正确的数量");
             return;
           }
           this.returnDrugsTemp();
          // Prevent modal from closing
          // bvModalEvt.preventDefault();
          // Trigger submit handler
          this.handleSubmit()
        },
        handleSubmit() {
          // Exit when the form isn't valid
          if (!this.checkFormValidity()) {
            return
          }
          // Hide the modal manually
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        }
      },
    }
</script>

<style scoped>

</style>
