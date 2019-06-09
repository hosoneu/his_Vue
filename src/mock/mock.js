//前端测试端口
export default function () {
    const Mock = require('mockjs')
    const Random = Mock.Random;
    Mock.mock('/api/data', () => {//当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
        let list = [];
        for(let i = 0; i < 30; i++) {
            let listObject = {
                title: Random.csentence(5, 10),//随机生成一段中文文本。
                company: Random.csentence(5, 10),
                attention_degree: Random.integer(100, 9999),//返回一个随机的整数。
                photo: Random.image('114x83', '#00405d', '#FFF', 'Mock.js')
            };
            list.push(listObject);
        }
        return {
            data: list
        };
    });
    Mock.mock('/api/login',{
          'code|1': true,});
    //若需要mock其他端口，请在此处添加
}
