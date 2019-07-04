export default {
  namespaced:true,
  state:{
    counter:1,
    patientInfo:"",
    DepartmentId:-1,
  },
  getters:{
    getPatientInfo:state=>{
      return state.patientInfo;
    },
    getDepartmentId:state=>{
      return state.DepartmentId;
    }
  },
  mutations:{
    setCounter:function(state, n){
      state.counter += n;
    },
    // 将登录患者的信息存储
    setState:function (state, patientInfo) {
      state.patientInfo = patientInfo;
      // state.patientInfo.MedicalRecordID=patientInfo.MedicalRecordID;
      // state.patientInfo.patientId=patientInfo.patientId;
      // state.patientInfo.patientName=patientInfo.patientName;
      // state.patientInfo.patientGender=patientInfo.patientGender;
      // state.patientInfo.patientBirth=patientInfo.patientBirth;
      // state.patientInfo.patientAge=patientInfo.patientAge;
      // state.patientInfo.patientIdentity=patientInfo.patientIdentity;
      // state.patientInfo.patientAddress=patientInfo.patientAddress;
    }
  },
  action:{
    change(){
      return 'bbb';
    }
  }
}
