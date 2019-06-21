import Mock from "mockjs";

export default function () {
  const Random = Mock.Random;
  Mock.mock(RegExp('/api/countPatientList' + ".*"), "get", {
    code:true,
    total:100
  });
  Mock.mock(RegExp('/api/getPatientList' + ".*"), "get", ()=>{
    let list = [];
    for(let i = 0; i < 5; i++) {
      let listObject = {
        medical_record_id: Random.integer(2019062000, 2019062100),
        patient_name: Random.cword(2, 3),
        pay_way: Random.cword(2, 4),
        diagnosis_status: Random.pick(['待診','已却診','已初诊','诊毕']),
        patient_sex:Random.pick(['男','女']),
      };
      list.push(listObject);
    }
    return {
      code: true,
      data: list
    }});
  Mock.mock(RegExp('/api/countMedicalRecordTemplateList' + ".*"), "get", {
    code:true,
    total:100
  });
  Mock.mock(RegExp('/api/getMedicalRecordTemplateList' + ".*"), "get", ()=>{
    let list = [];
    for(let i = 0; i < 5; i++) {
      let listObject = {
        medical_record_template_id: Random.integer(1, 100),
        medical_record_template_name: Random.cword(4, 5),
      };
      list.push(listObject);
    }
    return {
      code: true,
      data: list
    }});
  Mock.mock(RegExp('/api/getDiagnosisList' + ".*"), "get", ()=>{
    let list = [];
    for(let i = 0; i < 3; i++) {
      let listObject = {
        disease_id:Random.integer(1, 100),
        disease_name:Random.cword(4, 5),
        main_diagnosis_mark:Random.pick(['非主诊','主诊']),
        suspect_mark:Random.pick(['非疑似','疑似']),
        onset_date:Random.pick(['2019-10-10','2019-10-11']),
      };
      list.push(listObject);
    }
    return {
      code: true,
      data: list
    }});

}
