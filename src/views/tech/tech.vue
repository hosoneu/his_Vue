<template>
  <div>
    <b-row>
      <b-col lg="12">
        <patient-info v-bind:initial-user="selectedPatientItems" ></patient-info>
      </b-col>
  </b-row>
  <b-row>
    <b-col lg="3">
      <registrationList
        :registration-fields="patientFields"
        @selectPatient="selectPatient"
      >
      </registrationList>
      <FmedicalTable :tableData="currentAllFmedical" :ffields="examinationFmedicalfields" caption="项目明细" @TextResultEmit="TextResult = true"
        @selectFmedical="selectFmedical"
      ></FmedicalTable>
    </b-col>
    <b-col lg="9">
      <detailsTable :table-data="medicalitems" :mfields="medicalfields" :toptodownmessage="this.toptodownmessage" :toptodownFindings="this.toptodownFindings" :getchanged="this.getchanged" @resultEmit="resultEmit" @getchangedEmitnew="getchangedEmit" @FmedicalSelectedEmit="FmedicalSelected"
      :isWrite="isWrite" @tech_isWriteEmit="tech_isWrite" @submitEmit="submit" @detailsFindingsEmit="techFindings" @getAllDrugs="getAllDrugs" :drugstableData="allDrugs"
                    :drugsfields="techDrugsfields" @drugsOkEmit="drugsOk" ref="imgCancel"
      ></detailsTable>
    </b-col>
  </b-row>
  </div>
</template>

<script>
  // 引用医生patientInfo
  import patientInfo from "./component/patientInfo";
  import registrationList from "./component/registrationList";
  import FmedicalTable from "./component/fmedicalItems";
  import detailsTable from "./component/detailsTable";
  import axios from "axios";
  import {mapState} from "vuex";

  // import {mapMutations} from 'vuex';
  // import {mapGetters} from 'vuex';
    export default {
      //更改，设置非药品不可选，切换病人时级联保存
      name: "tech",
      components:{patientInfo, registrationList, FmedicalTable, detailsTable},
      data: () =>{
        return {
          //表头及属性映射
          selectedPatientItems:{medicalRecordId: "未选择", patientName: "未选择", patientGender: '未选择', patientAge: '未选择', calculationTypeId:'未选择'},
          patientFields: [
            {key: 'medicalRecordId', label: '病历号', sortable: true},
            {key: 'patient.patientName', label: '姓名', sortable: true},
            // {key: 'diagnosis_status', label:'状态', sortable: true},
          ],
          examinationFmedicalfields: [
            {key: 'fmedicalItems.fmedicalItemsCode', label: '项目代码', sortable: true},
            {key: 'fmedicalItems.fmedicalItemsName', label:'项目名称'},
            {key:'项目状态'},
          ],
          medicalfields: [
            {key: 'drugs.drugsCode', label: '药品代码', sortable: true},
            {key: 'drugs.drugsName', label:'药品名称'},
            {key: 'drugs.drugsTypeId', label:'类型'},
            {key: 'actualQuantity', label:'数量'},
            {key: '缴费状态'}
          ],
          // patientTabs:{
          //   title:"个人",
          //   getPatientApi:"/tech/getAllPatientByDepartmentId",
          //   getPatientParams:{departmentId:133},
          // },
          techDrugsfields:[
            {key: 'drugsMnemoniccode', label: '拼音助记码', sortable: true},
            {key: 'drugsName', label:'药品名称'},
            {key: 'drugsFormat', label:'药品规格'},
            {key: 'amount', label:'数量', sortable: true},
          ],

          // techDoctorId:this.curr_user_id,
          // DepartmentId:this.curr_dept.departmentId,

          //当前病人下各种信息
          currentFmedical:-1,//当前非药品项目
          medicalitems:[],//存储药品
          // message:'',//存储检查检验结果
          currentregistration:'',//当前病人全部信息
          currentAllFmedical:[],//当前病人全部非药

          allDrugs:[],//所有药
          // DepartmentId:-1,//当前科室号
          // techDoctorId:-1,//当前医技医生id


          smImgUrl:'',//sm传来的url
          //向result文本框传递消息
          toptodownmessage:'',
          toptodownFindings:'',
          getchanged:0, //判断药品是否登记
          isWrite:true,//判断是否可写

          TextResult:false,

          techDoctorId:-1,
          DepartmentId:-1,
        }
      },
      computed:{
        // techDoctorId : this.$store.state.common.curr_user_id,
        // DepartmentId : this.$store.state.common.curr_dept.departmentId
        // techDoctorId:this.$store.state.common.curr_user_id,
        // DepartmentId:this.$store.state.common.curr_dept.departmentId
        ...mapState("common",['curr_user_id']),
        ...mapState("common",['curr_dept']),

  // {'curr_dept']
      },
      mounted:function(){
        this.techDoctorId = this.curr_user_id;
        this.DepartmentId = this.curr_dept.departmentId;
      },
      methods: {
        selectPatient: async function (registration) {//根据患者选择非药品项目
          if(registration==undefined){
            return;
          }
          //切换病人之后，若不是第一个个病人，判断是否保存信息
          // if(!this.currentregistration==''){
          //   alert("是否保存");
          // }
          //重置病人
          this.resetPatientInfo();

          console.log(registration);
          console.log('later');
          this.currentregistration = registration;//当前病人
          this.selectedPatientItems.medicalRecordId = registration.medicalRecordId;
          this.selectedPatientItems.patientName = registration.patient.patientName;
          this.selectedPatientItems.patientGender = (registration.patient.patientGender == 1 ? '男' : '女');
          this.selectedPatientItems.patientAge = registration.patient.patientAge;
          this.selectedPatientItems.calculationTypeId = registration.calculationTypeId;

          // int Medical_record_ID, int Department_ID
          // let data = "Medical_record_ID=" + registration.medicalRecordId + "&Department_ID=" + this.departmentId;
          // this.items = [];

          let data = {Medical_record_ID:registration.medicalRecordId,Department_ID:this.DepartmentId};
          console.log("点击病人获取非药品的data");
          console.log(data);
          let url = "/tech/getAllFmedical";
          await this.$get(url, JSON.parse(JSON.stringify(data))).then(res => {
          // this.$get(url, JSON.parse(JSON.stringify(data))).then(res => {
            console.log(res);
            if (res.status === "OK") {
              console.log("res.data");
              console.log(res.data  );
              this.currentAllFmedical = res.data;
              if (this.currentAllFmedical == null){
                this.currentAllFmedical = [];
              }
              for(let i=0;i<this.currentAllFmedical.length;i++){
                this.getStatus(i);
              }
              console.log("currentAllFmedical"+ this.currentAllFmedical);
              console.log(res.data);
              console.log("res.data")
              // this.items = res.data;
              // this.total = this.items.length;//得到s当前的总数
              // this.isBusy = false;
            }
          })
        },
        getStatus:async function(i){
          this.$set(this.currentAllFmedical[i], 'currentStatus');
          //添加判断是否缴费
          let url = 'dispensing/getExpenseItems';
          console.log("这是即将获得expenseItemsId的数据");

          let data = {expenseItemsId:this.currentAllFmedical[i].expenseItemsId};
          console.log(data);
          await this.$get(url, data).then(res=>{
            if (res.status == "OK"){
              console.log("得到数据");
              this.$set(this.currentAllFmedical[i], 'expenseItems');
              this.currentAllFmedical[i].expenseItems = res.data;
              console.log(res.data);
              console.log("啊哈哈哈");
            }
            else{
              alert("url出错");
            }
          });

          console.log("这是即将得到的 + this.currentAllFmedical[i]");
          console.log(this.currentAllFmedical[i]);
          console.log(this.currentAllFmedical[i].expenseItems);
          if (this.currentAllFmedical[i].expenseItems.payStatus!="2"){//未缴费
            this.currentAllFmedical[i].currentStatus = "无效";
          }
          else if (this.currentAllFmedical[i].expenseItems.payStatus=="3"){//未缴费
            this.currentAllFmedical[i].currentStatus = "已退费";
          }
          else if (this.currentAllFmedical[i].expenseItems.payStatus=="4"){//未缴费
            this.currentAllFmedical[i].currentStatus = "无效";
          }
          else if (this.currentAllFmedical[i].expenseItems.payStatus=="2") {
            if (this.currentAllFmedical[i].validStatus!=1){
              this.currentAllFmedical[i].currentStatus = "无效";
            }
            else if (this.currentAllFmedical[i].examinationResultId != null ){
              this.currentAllFmedical[i].currentStatus = "已提交";
            }
            else{
              this.currentAllFmedical[i].currentStatus = "未提交";
            }
          }
        },
        selectFmedical:function(examinationFmedical){//选择非药品，给出药品

          console.log("这是选择非药品");
          console.log(examinationFmedical);
          this.$refs['imgCancel'].imgCancel();
          // alert("进来了");
          this.toptodownmessage = '';
          if (examinationFmedical == undefined){//解决连续点击多次，触发事件，但是没有返回值
            this.currentFmedical = -1;
            return;
          }
          //切换非药品项目后，给出药品，添加msg属性，选择当前非药品项目，传递msg
          console.log('当前所有非药品项目');
          console.log(this.currentAllFmedical);
          for(var i=0;i<this.currentAllFmedical.length;i++){
            if(examinationFmedical.examinationFmedicalItemsId == this.currentAllFmedical[i].examinationFmedicalItemsId){
              console.log("找到当前药");
              if(this.currentAllFmedical[i].msg == undefined || this.currentAllFmedical[i].findings == undefined){//点击的非药品添加msg属性
                this.$set(this.currentAllFmedical[i], 'msg');
                this.currentAllFmedical[i].msg = '';
                this.$set(this.currentAllFmedical[i], 'findings');
                this.currentAllFmedical[i].findings = '';
                this.getchanged = 1;
                console.log('新建了msg');
              }
              else{
                console.log("当前msg");
                console.log(this.currentAllFmedical[i].msg);
              }
              this.currentFmedical = i;//当前非药品项目
              // this.currentFmedical = this.currentAllFmedical[i];
              // this.toptodownmessage = this.currentFmedical.msg;
              this.toptodownmessage = this.currentAllFmedical[i].msg;
              this.toptodownFindings = this.currentAllFmedical[i].findings;
              console.log("tech 下toptodownmessage传的值是"+ this.toptodownmessage)

              if (!this.currentAllFmedical[i].temp_registrationStatus){
                console.log("tech 当前temp_registrationStatus状态不存在" + this.currentAllFmedical[i].examinationFmedicalItemsId);
                this.isWrite = true;
              }
              else {
                this.isWrite = false;
              }
            }
          }
          this.medicalitems = [];
          this.medicalitems = examinationFmedical.examinationDrugsItemsList;
            if (this.medicalitems != null || this.medicalitems!=[]){
            for (let i=0;i<this.medicalitems.length;i++){
              let url = 'dispensing/getExpenseItems';
              let data = {expenseItemsId:this.medicalitems[i].expenseItemsId};
              console.log(data);
              this.$get(url, data).then(res=>{
                if (res.status == "OK"){
                  console.log("得到数据");
                  this.$set(this.medicalitems[i], 'expenseItems');
                  this.medicalitems[i].expenseItems = res.data;
                }
                else{
                  alert("url出错");
                }
              });
            }
          }
          console.log(this.medicalitems);
          console.log("medicalitems");
        },
        //点击登记按钮
        FmedicalSelected:function(){
          if (this.currentFmedical==-1){
            alert("请选择非药品项目");
            return;
          }
          if (this.currentAllFmedical[this.currentFmedical].currentStatus == "未缴费") {
            alert("该项目未缴费");
            return;
          }
          if (this.currentAllFmedical[this.currentFmedical].currentStatus == "无效") {
            alert("该项目已失效");
            return;
          }
          if(this.currentAllFmedical[this.currentFmedical].currentStatus == "已提交"){
            alert("该项目已提交");
            return;
          }
          this.isWrite = false;
          console.log("已登记");
          for(var n=0;n<this.currentAllFmedical.length;n++){
            if(this.currentAllFmedical[this.currentFmedical].examinationFmedicalItemsId == this.currentAllFmedical[n].examinationFmedicalItemsId){
              this.$set(this.currentAllFmedical[n], 'temp_registrationStatus');
              this.currentAllFmedical[n].temp_registrationStatus=1; //设置为已登记状态
            }
          }
        },
        //重置病人及非药品等信息
        resetPatientInfo:function(){
          this.currentFmedical=-1;//当前非药品项目
          this.medicalitems=[];//存储药品
          this.message='';//存储检查检验结果
          this.currentregistration='';//当前病人全部信息
          this.currentAllFmedical=[];//当前病人全部非药
        },
        resultEmit:function (tempMessage) {
          console.log('tech监听到' + tempMessage);
          if(this.currentFmedical == -1){
            return ;
          }
          else {
            this.currentAllFmedical[this.currentFmedical].msg = tempMessage;
            this.toptodownmessage = tempMessage;
          }
        },
        techFindings:function(tempFindings){
          console.log('tech监听到' + tempFindings);
          if(this.currentFmedical == -1){
            return ;
          }
          else {
            this.currentAllFmedical[this.currentFmedical].findings = tempFindings;
            this.toptodownFindings = tempFindings;
          }
        },
        getchangedEmit:function () {
          this.getchanged = 0;
        },
        tech_isWrite:function () {
          console.log('tech iswrite');
        },
        submit: async function (imgFile) {
          if (this.currentAllFmedical == -1 || !this.currentAllFmedical[this.currentFmedical].temp_registrationStatus){
            alert('请先登记非药品项目');
            return;
          }
          if (this.currentAllFmedical[this.currentFmedical].temp_SubmitStatus || this.currentAllFmedical[this.currentFmedical].examinationResultId != null){//已提交过，
            alert("您已提交过");
            return;
          }
          this.isWrite = true;
          console.log(this.currentAllFmedical[this.currentFmedical]);
          console.log("选择提交");
          this.$set(this.currentAllFmedical[this.currentFmedical], 'temp_SubmitStatus');
          this.currentAllFmedical[this.currentFmedical].temp_SubmitStatus = 1;

          //判断
          for (let i=0;i<this.currentAllFmedical.length;i++){

          }

          let url = "/tech/updateRegistrationStatus";
          let data = {examinationFmedicalItemdId:this.currentAllFmedical[this.currentFmedical].examinationFmedicalItemsId}
          console.log("登记发出的data" + data);
          console.log(data);
          await this.$get(url, JSON.parse(JSON.stringify(data))).then(res => {//后端登记
            if (res.status === "OK"){
              console.log(this.currentAllFmedical[this.currentFmedical].examinationFmedicalItemsId + "登记成功");
            }
            else {
              alert("登记失败");
            }
          });
          //改变该药品提交状态
          this.currentAllFmedical[this.currentFmedical].currentStatus = "已提交"

          //上传sm得到图片url
          if (imgFile != null){
            console.log("upload");
            console.log(imgFile);
            let formData = new FormData();
            formData.append("smfile", imgFile);
            await axios({
              method:'post',
              baseURL:"/sm",
              url:'/upload',
              data:formData
            }).then(res=> {
              console.log(res.data.url);
              console.log(res.data.data.url);
              console.log('这是sm返回的res');
              this.smImgUrl = res.data.data.url;
            });
            // let url1 = '/tech/insertExaminationResultImage';
            // let data1 = {examinationResultId}
            // this.$get(url)
          }

          //后端提交结果
          this.submitMethod(this.currentAllFmedical[this.currentFmedical]);

          // if (imgFile != null){
          //   var _this = this
          //   let url = "/tech/uploadImg";
          //   var formData = new FormData();
          //   formData.append("imgFile", imgFile.raw);
          //   _this.$post(url, formData).then(res =>{
          //     console.log(res.data);
          //     alert("得到");
          //   })
          // }
        },

        submitMethod:function (temp) {
          let url="/tech/insertExaminationResult"
          // let data = {examinationResult:{doctorId:this.techDoctorId, findings:temp.findings,diagnosticSuggestion:temp.msg}, examinationFmedicalItemsId:temp.examinationFmedicalItemsId};
          alert(this.smImgUrl);
          let data = {doctorId:this.techDoctorId, findings:temp.findings,diagnosticSuggestion:temp.msg, examinationFmedicalItemsId:temp.examinationFmedicalItemsId, imageURL:this.smImgUrl,imageName:'name' };
          console.log(data);
          console.log("要传的data");
          this.$get(url, JSON.parse(JSON.stringify(data))).then(res=>{
            if(res.status === "OK"){
              alert("提交成功");
            }
            else {
              alert("提交失败");
            }
          })
        },
        //获得所有药
        getAllDrugs:function () {
          //判断是否选择非药品

          if (this.currentFmedical == -1){
            alert("请选择非药品项目");
            return;
          }
          let url = "/tech/getAllDrugs"
          this.$get(url).then(res=>{
            if (res.status === "OK"){
              console.log("已获得所有药");
              let temp = res.data;
              for (let i=0;i<temp.length;i++){
                this.$set(temp[i], 'amount');
                temp[i].amount = 0;
              }
              this.allDrugs = temp;
              console.log(this.allDrugs);
              console.log("当前所有药");
            }
            else{
              alert("未获得");
            }
          })
        },
        drugsOk:function(selectedAllDrugs){//allDrugs是一个List<Drugs>，后端接收List<ExaminationDrugsItems> examinationDrugsItems, int Medical_record_ID
          console.log("即将传入后端的所有药品");
          console.log(selectedAllDrugs);
          // Examination_Fmedical_Items_ID
          // Drugs_ID
          // Quantity
          // Actual_Quantity
          // Drugs_Dispensing_Status发药状态
          // Doctor_ID医技id
          alert("开药成功");
          console.log("开药成功");
          console.log(selectedAllDrugs);
          let tempDrugs=[];//存储所有药
          for (let i=0;i<selectedAllDrugs.length;i++){
            let tempDrugsItems={examinationFmedicalItemsId:this.currentAllFmedical[this.currentFmedical].examinationFmedicalItemsId,
              drugsId:-1,doctorId:this.techDoctorId,quantity:-1,actualQuantity:-1,drugsDispensingStatus:1};//存储所有药明细
            //reset
            tempDrugsItems.drugsId = -1;
            tempDrugsItems.quantity = -1;
            tempDrugsItems.quantity = -1;
            //赋值
            tempDrugsItems.drugsId = selectedAllDrugs[i].drugsId;
            tempDrugsItems.quantity = selectedAllDrugs[i].amount;
            tempDrugsItems.actualQuantity = selectedAllDrugs[i].amount;

            tempDrugs.push(tempDrugsItems);
          }
          let url="/tech/insertExaminationDrugsAndExpense";
          console.log(tempDrugs);
          console.log("这是要传过去开药的数据");
          let data = {examinationDrugsItemsList:tempDrugs, medicalRecordID:this.currentregistration.medicalRecordId};
          this.$post(url, data).then(res=>{
            if (res.status == "OK"){
              console.log("药发过来了");
            }
            else{
              alert("url出错");
            }
          });
          // // let data = {examinationResult:{doctorId:this.techDoctorId, findings:temp.findings,diagnosticSuggestion:temp.msg}, examinationFmedicalItemsId:temp.examinationFmedicalItemsId};
          // let data = {doctorId:this.techDoctorId, findings:temp.findings,diagnosticSuggestion:temp.msg, examinationFmedicalItemsId:temp.examinationFmedicalItemsId};
          // console.log(data);
          // console.log("要传的data");
          // this.$get(url, JSON.parse(JSON.stringify(data))).then(res=>{
          //   if(res.status === "OK"){
          //     alert("提交成功");
          //   }
          //   else {
          //     alert("提交失败");
          //   }
          // })
        },
        // //维护常用项目
        // maintainCommonFmedical:function () {
        //
        // }
      },
    }
</script>

<style scoped>

</style>
