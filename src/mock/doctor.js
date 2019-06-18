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
        user_name: Random.cword(2, 4),
        pay_way: Random.cword(2, 4),
        status: Random.pick(['primary','secondary']),
        sex:Random.pick(['男','女']),
      };
      list.push(listObject);
    }
    return {
      code: true,
      data: list
    }});
}
