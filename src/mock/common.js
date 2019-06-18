import Mock from 'mockjs'
import userType from '../config/userType'

export default function () {
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
    Mock.mock('/api/login',(data)=>{
      let param = JSON.parse(data.body);
      return{
        'code': true,
        'user_type':userType.indexOf(param.username)
      }
    });
}
