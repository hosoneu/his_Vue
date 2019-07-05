<template>
  <div>

    <b-row>
      <b-col sm="6">
        <b-input-group>
          <b-form-input
            type="text"
            v-model="inputMedicalRecordId"
            placeholder="请输入您的病历号..."
            size="sm"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              @click="researchMedicalRecord"
              size="sm"
              variant="success"
            >
              查询</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <br/>
    <expense-items-list
      :medical-record-id=medicalRecordId
    >
    </expense-items-list>
    <medical-record-info
      :medical-record-id=medicalRecordId
    >
    </medical-record-info>
  </div>

</template>

<script>
  import ExpenseItemsList from "./component/expenseItems";
  import MedicalRecordInfo from "./component/medicalRecord";
    export default {
      name: "homePage",
      components:{MedicalRecordInfo, ExpenseItemsList},
      data(){
        return {
          registrationList: [],
          medicalRecordId:0,
          inputMedicalRecordId:'',
        }
      },
      mounted: async function(){
        //调整用户类型 改变导航栏状态
        this.$store.commit('common/set_curr_user_type', 'patient');
        await this.getRegistrationList();
      },
      methods:{
        getRegistrationList(){
          console.log("请求挂号列表");
          this.$get('registration/showRegistration').then((res)=> {
            console.log(res.data);
            if(res.status === 'OK'){
              this.registrationList = res.data;
            }else{
              console.log("加载挂号列表失败");
            }
          })
        },
        researchMedicalRecord(){
          let ds = this.registrationList.filter(registration => {if(registration.medicalRecord.medicalRecordId === parseInt(this.inputMedicalRecordId)) return true;});
          if (ds.length !== 0){
            alert("查询成功！");
            this.medicalRecordId = parseInt(JSON.parse(JSON.stringify(this.inputMedicalRecordId)));
          }
          else{
            alert("此病历号不存在！");
          }
        }
      }
    }
</script>

<style scoped>

</style>
