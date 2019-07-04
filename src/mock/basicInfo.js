import Mock from "mockjs";

export default function () {
  const Random = Mock.Random;
  Mock.mock(RegExp('/api/getDepartmentCount' + ".*"), "get", {
    code:true,
    total:100
  });
  Mock.mock(RegExp('/api/getDepartmentList' + ".*"), "get", ()=>{
    let list = [];
    for(let i = 0; i < 99; i++) {
      let listObject = {
        department_Code: Random.integer(100, 9999),
        department_Name: Random.cword(2, 4),
        department_Type:Random.pick(['内科','外科']),
        department_Category: Random.pick(['中医','西医']),
      };
      list.push(listObject);
    }
    return {
      code: true,
      data: list
    }});
}
