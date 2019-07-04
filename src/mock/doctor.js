import Mock from "mockjs";

export default function () {
  const Random = Mock.Random;
  Mock.mock(RegExp('/api/countPatientList' + ".*"), "get", {
    code:true,
    total:100
  });
  Mock.mock(RegExp('/api/getPatientList' + ".*"), "get", ()=>{
    let list = [];
    for(let i = 0; i < 4; i++) {
      let listObject = {
        id: Random.integer(100, 9999),
        name: Random.cword(2, 4),
      };
      list.push(listObject);
    }
    return {
      code: true,
      data: list
    }});
}
