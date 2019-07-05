<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
      </b-col>
      <b-col lg="9">
        <BasicTable :caption="'科室列表'" :textFields="department_text_fields" :selectFields="department_select_fields" :multiFields="department_multi_fields" :table-data="items" :perPage="10" :itemType="itemType" @insertList ="insertList" @updateList="updateList" @deleteList="deleteList">
        </BasicTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import BasicTable from "./component/basicTable";
    import BasicTabs from "./component/basicTabs";
    export default {
        name: "departmentInfo",
        components: {BasicTable, BasicTabs},
        data(){
          return{
            department_text_fields:[
              {
                key: 'departmentCode',
                sortable: true,
                label: '科室编码'
              },
              {
                key: 'departmentName',
                sortable: true,
                label: '科室名称'
              },
            ],
            department_select_fields: [
              {
                key: 'departmentType',
                sortable: true,
                label: '科室类型',
                options: [
                  {text: '临床', value: '1'},
                  {text: '医技', value: '2'},
                  {text: '财务', value: '3'},
                  {text: '行政', value: '4'},
                  {text: '其他', value: '5'},
                ]
              },
              {
                  key: 'departmentCategoryId',
                  sortable: true,
                  label: '科室分类',
                  options: [
                    {text: '内科', value: '11'},
                    {text: '外科', value: '12'},
                    {text: '儿科', value: '14'},
                    {text: '传染病科', value: '15'},
                    {text: '妇产科', value: '16'},
                    {text: '男科', value: '17'},
                    {text: '精神心理科', value: '18'},
                    {text: '皮肤性病科', value: '19'},
                    {text: '中医科', value: '20'},
                    {text: '肿瘤科', value: '21'},
                    {text: '骨科', value: '22'},
                    {text: '五官科', value: '23'},
                    {text: '康复医学科', value: '24'},
                    {text: '麻醉医学科', value: '25'},
                    {text: '营养科', value: '26'},
                    {text: '医技科', value: '27'},
                    {text: '医学影像学', value: '28'},
                    {text: '其他科室', value: '29'},
                  ]
                },
            ],
            //由于department中departmentCategoryId属性应与constantItemsId对应，但名字却不同 所以在调用复用组件时，会出现错误。
            //科室分类较少，姑且以选择形式编写
            department_multi_fields: [
            //   {
            //     key: 'constantItems.constantItemsName',
            //     sortable: true,
            //     label: '科室分类',
            //     from: 'constantItems.constantItemsId',
            //     to: 'constantItemsName',
            //     table: 'constantItems',
            //   },
            ],
            items:[],
            itemType: '科室',
            isBusy: false,
            // usedData:{
            //   //原本写作departmentCategory，后来发现 自己配置的代码中此处必须和 multi_fields的table相同
            //   constantItems: [],
            // },
          }
        },
        mounted: async function(){
          console.log("mounted");
          // this.$store.commit('common/set_curr_user_type', 'basicInfo');
          await this.getDepartmentList();
          // await this.getDepartmentCategoryList();
        },
        methods: {
          getDepartmentList(){
            console.log("请求科室列表");
            this.$get('department/getAllDepartment').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.items = res.data;
                console.log(this.items);
              }else{
                console.log("加载科室列表失败");
              }
            })
          },
          deleteList(item){
            this.$get('department/delete', {"id": item.departmentId}).then((res)=> {
              if(res.status === 'OK'){
                console.log("删除成功");
                // this.items.splice(index, 1);
                this.getDepartmentList();
              }else{
                console.log("加载失败");
              }
            })
          },
          updateList(item){
            this.$post('department/update', JSON.stringify(item)).then((res)=> {
              if(res.code === true){
                console.log("更新成功");
                //改变数据后重新请求
                this.getDepartmentList();
              }else{
                console.log("加载失败");
              }
            })
          },
          insertList(item){
            // alert(JSON.stringify(item));
            this.$post('department/insert', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("插入成功");
                //改变数据后重新请求
                this.getDepartmentList();
              } else {
                console.log("插入失败");
              }
            })
          },
          // getDepartmentCategoryList() {
          //   console.log("请求科室类型列表");
          //   this.$get('department/getAllDepartmentCategory').then((res) => {
          //     if (res.status === 'OK') {
          //       this.usedData.constantItems = res.data;
          //     } else {
          //       console.log("加载科室类型列表失败");
          //     }
          //   })
          // },
        }
    }

</script>

<style scoped>

</style>
