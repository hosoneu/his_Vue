<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
      </b-col>
      <b-col lg="9">
        <BasicTable :caption="'用户列表'" :usedData="usedData" :textFields="user_text_fields" :selectFields="user_select_fields" :multiFields="user_multi_fields" :table-data="items" :perPage="10" :itemType="itemType" @insertList ="insertList" @updateList="updateList" @deleteList="deleteList">
        </BasicTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import BasicTable from "./component/basicTable";
    import BasicTabs from "./component/basicTabs";
    export default {
        name: "UserInfo",
        components: {BasicTable, BasicTabs},
        data(){
          return{
            user_text_fields:[
              {
                key: 'userName',
                sortable: true,
                label: '用户名称'
              },
              {
                key: 'userLoginname',
                sortable: true,
                label: '用户登录名'
              },
              {
                key: 'userPassword',
                sortable: true,
                label: '用户密码'
              },
              {
                key: 'userSchedulingLimitcount',
                sortable: true,
                label: '用户排班限额'
              },
            ],
            user_select_fields: [
              {
                key: 'userTitleId',
                sortable: true,
                label: '用户职称',
                options: [
                  {text: '主任医师', value: '81'},
                  {text: '副主任医师', value: '82'},
                  {text: '主治医师', value: '83'},
                  {text: '住院医师', value: '84'},
                ]
              },
              {
                key: 'userGender',
                sortable: true,
                label: '用户性别',
                options: [
                  {text: '男', value: '1'},
                  {text: '女', value: '2'},
                ]
              },
            ],
            user_multi_fields: [
                {
                  key: 'department.departmentName',
                  sortable: true,
                  label: '所属科室',
                  from: 'departmentId',
                  to: 'departmentName',
                  table: 'department',
                },
                {
                  key: 'role.roleName',
                  sortable: true,
                  label: '所属角色',
                  from: 'roleId',
                  to: 'roleName',
                  table: 'role',
                },
            ],
            items:[],
            itemType: '用户',
            isBusy: false,
            usedData:{
              department: [],
              role: [],
            },
          }
        },
        mounted: async function(){
          console.log("mounted");
          // this.$store.commit('common/set_curr_user_type', 'basicInfo');
          await this.getUserList();
          await this.getDepartmentList();
          await this.getRoleList();
        },
        methods: {
          getUserList(){
            console.log("请求用户列表");
            this.$get('user/getAllUserWithRole').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.items = res.data;
                console.log(this.items);
              }else{
                console.log("加载用户列表失败");
              }
            })
          },
          getDepartmentList(){
            console.log("请求科室列表");
            this.$get('department/getAllDepartment').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.usedData.department = res.data;
              }else{
                console.log("加载科室列表失败");
              }
            })
          },
          getRoleList(){
            console.log("请求角色列表");
            this.$get('user/getAllRole').then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                this.usedData.role = res.data;
              }else{
                console.log("加载角色列表失败");
              }
            })
          },
          deleteList(item){
            this.$get('user/delete', {"id": item.userId}).then((res)=> {
              if(res.status === 'OK'){
                console.log("删除成功");
                this.getUserList();
              }else{
                console.log("加载失败");
              }
            })
          },
          updateList(item){
            this.$post('user/update', JSON.stringify(item)).then((res)=> {
              if(res.code === true){
                console.log("更新成功");
                //改变数据后重新请求
                this.getUserList();
              }else{
                console.log("加载失败");
              }
            })
          },
          insertList(item){
            // alert(JSON.stringify(item));
            this.$post('user/insert', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("插入成功");
                //改变数据后重新请求
                this.getUserList();
              } else {
                console.log("插入失败");
              }
            })
          },
        }
    }
</script>

<style scoped>

</style>
