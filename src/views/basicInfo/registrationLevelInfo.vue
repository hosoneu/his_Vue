<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <BasicTabs></BasicTabs>
      </b-col>
      <b-col lg="9">
        <BasicTable :caption="'挂号级别列表'" :textFields="registrationLevel_text_fields" :selectFields="registrationLevel_select_fields" :multiFields="registrationLevel_multi_fields" :table-data="items" :perPage="10" :itemType="itemType" @insertList ="insertList" @updateList="updateList" @deleteList="deleteList">
        </BasicTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import BasicTable from "./component/basicTable";
    import BasicTabs from "./component/basicTabs";
    export default {
        name: "registrationLevelInfo",
        components: {BasicTable, BasicTabs},
        data(){
          return{
            registrationLevel_text_fields:[
              {
                key: 'registrationLevelName',
                sortable: true,
                label: '挂号级别名称'
              },
              {
                key: 'registrationCost',
                sortable: true,
                label: '挂号费用'
              },
            ],
            registrationLevel_select_fields: [
              {
                key: 'isDefault',
                sortable: true,
                label: '默认',
                options: [
                  {text: '是', value: '1'},
                  {text: '不是', value: '2'},
                ]
              },
            ],
            registrationLevel_multi_fields: [],
            items:[],
            itemType: '挂号级别',
          }
        },
        mounted: async function(){
          console.log("mounted");
          // this.$store.commit('common/set_curr_user_type', 'basicInfo');
          await this.getRegistrationLevelList();
        },
        methods: {
          getRegistrationLevelList() {
            console.log("请求挂号级别列表");
            this.$get('registrationLevel/getAllRegistrationLevel').then((res) => {
              console.log(res.data);
              if (res.status === 'OK') {
                this.items = res.data;
              } else {
                console.log("加载挂号级别列表失败");
              }
            })
          },
          deleteList(item) {
            this.$get('registrationLevel/delete', {"id": item.registrationLevelId}).then((res) => {
              if (res.status === 'OK') {
                console.log("删除成功");
                this.getRegistrationLevelList();
              } else {
                console.log("加载失败");
              }
            })
          },
          updateList(item) {
            this.$post('registrationLevel/update', JSON.stringify(item)).then((res) => {
              if (res.code === true) {
                console.log("更新成功");
                //改变数据后重新请求
                this.getRegistrationLevelList();
              } else {
                console.log("加载失败");
              }
            })
          },
          insertList(item) {
            // alert(JSON.stringify(item));
            this.$post('registrationLevel/insert', JSON.stringify(item)).then((res) => {
              if (res.status === 'OK') {
                console.log("插入成功");
                //改变数据后重新请求
                this.getRegistrationLevelList();
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
