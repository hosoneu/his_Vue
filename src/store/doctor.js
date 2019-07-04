export default {
  //如果有些状态严格属于单个组件，最好还是作为组件的局部状态
  namespaced:true,
  //使用vuex的原因
  //用来管理共享状态
  //1.多个视图依赖于同一状态。
  //2.来自不同视图的行为需要变更同一状态。
  state:{
    department:{},//当前科室医生所在科室
    patient:{medicalRecordState: "未选择", patientGender: "未选择", medicalRecordId: '未选择', patientName: '未选择', calculationTypeId:0},//当前患者
    medicalRecord:{},//当前病历
    registration:{medicalRecord:1},//当前挂号
    // date:new Date(),
    medicalRecordState:''//当前就诊状态 未初诊 已初诊 已终诊 诊毕
  },
  //通过store.state.count获取值
  //当一个组件需要获取多个状态时候,可以使用 mapState 辅助函数帮助我们生成计算属性
  mutations:{
    updateRegistration(state,registration){
      state.registration = registration;
      state.medicalRecord = registration.medicalRecord;
    },
    // updateMedicalRecord(state,medicalRecord){
    //   state.medicalRecord = medicalRecord;
    // },
    updateMedicalRecordState (state, medicalRecordState) {//更新就诊状态
      state.medicalRecordState = medicalRecordState;
    },
    updatePatient(state,patient){//更新当前患者
      state.patient = patient;
    },


    //通过store.commit('increment')触发变更->更明确地追踪到状态的变化
  }

}
