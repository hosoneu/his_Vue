<template>
  <b-row>
    <b-col lg="3">
    <b-card  header="科室列表">
          <input type="text" class="form-control" placeholder="请输入关键字" v-on:input="departmentSearch" v-model="departmentKeywords" id="departmentTable">
    <b-table
      id="departmentTable"
      :per-page="departmentPerPage"
      :current-page="departmentCurrentPage"
      selectable
      select-mode="single"
      selectedVariant="success"
      :items="currentdepartmentitems"
      @row-selected="departmentrowSelected"
      :fields="departmentfields"
      :sort-by.sync="departmentsortBy"
      :sort-desc.sync="departmentsortDesc"
    ></b-table>
      <b-pagination
        size="sm"
        v-model="departmentCurrentPage"
        :total-rows="departmentRows"
        :per-page="departmentPerPage"
        aria-controls="departmentTable"
        align="center"
      ></b-pagination>
    </b-card>
    <b-card :header="departmentselected[0].departmentName"v-if="isShow" >
      <input type="text" class="form-control" placeholder="请输入关键字" v-on:input="personalSearch" v-model="personalKeywords" >
      <b-table
        :per-page="personalPerPage"
        :current-page="personalCurrentPage"
        selectable
        select-mode="single"
        selectedVariant="success"
        :items="currentpersonalitems"
        @row-selected="personalrowSelected"
        :fields="personalfields"
        :sort-by.sync="persoanlsortBy"
        :sort-desc.sync="persoanlsortDesc"
      ></b-table>
      <b-pagination
        size="sm"
        v-model="personalCurrentPage"
        :total-rows="personalRows"
        :per-page="personalPerPage"
        align="center"
      ></b-pagination>
    </b-card>
    </b-col>
    <b-col>
      <b-card>
      <workload :test-i-d="test" :currentdepartment="currentdepartmentID" :currentperson="currentpersonalID">
      </workload>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  import Workload from "./component/workload";
  import axios from 'axios/index'
  export default {
    components: {Workload},
    data() {
      return {
        currentdepartmentID:null,
        currentpersonalID:null,
        personalPerPage:4,
        personalCurrentPage:1,
        personalKeywords:'',
        departmentKeywords:'',
        departmentPerPage:4,
        departmentCurrentPage:1,
        test:'0',
        isShow: false,
        departmentsortBy: null,
        departmentsortDesc: false,
        persoanlsortBy: null,
        persoanlsortDesc: false,
        departmentfields: [
          { key: 'departmentId',label:'科室编号', sortable: true },
          { key: 'departmentName',label:'科室名称', sortable: true },
        ],
        departmentitems: [
        ],
        currentdepartmentitems: [
        ],
        currentpersonalitems: [
        ],
        personalfields: [
          { key: 'userId',label:'医生编号', sortable: true },
          { key: 'userName',label:'医生姓名', sortable: true },
        ],
        personalitems: [],
        departmentselected: null,
        personalselected: null,
      }
    },
    computed: {
      departmentRows() {
        return this.departmentitems.length
      },
      personalRows() {
        return this.personalitems.length
      },
      departmentSearch() {
        var newList = [];
        //console.log(this.departmentKeywords)
        this.departmentitems.forEach(item => {
          if (item.departmentName.includes(this.departmentKeywords) ) {
            //console.log("有")
            newList.push(item)
            //console.log("存入")
          }
        });
        this.currentdepartmentitems=newList;
      },
      personalSearch() {
        var newList = [];
        //console.log(this.departmentKeywords)
        this.personalitems.forEach(item => {
          if (item.userName.includes(this.personalKeywords) ) {
            //console.log("有")
            newList.push(item)
            //console.log("存入")
          }
        });
        this.currentpersonalitems=newList;
      },
    },
    methods: {
      //需要一个方法当点击department的时候用传来的departmentID请求doctor列表的数据
      findAll(){
        var url  = "http://localhost:8080/hoso/department/findAll";
                    // 发送请求:将数据返回到一个回到函数中
                    // 并且响应成功以后会执行then方法中的回调函数
                    axios.get(url).then(function(result) {
                          // result是所有的返回回来的数据
                          // 包括了响应报文行
                          // 响应报文头
                          // 响应报文体
                      this.departmentitems=result.data.data
                      this.currentdepartmentitems.push(result.data.data[0])
                      //console.log(result.data.data);
                    }.bind(this));
      },
      findModel(){
       // console.log(this.currentDepartment)
        //console.log(this.currentPerson)
        if (this.departmentselected=== null){
          this.test='0'

        } else if (this.personalselected===null){
          this.test='1'
          } else {
          this.test='2'
          }
      },
      departmentrowSelected(items) {
        //console.log(items)
        if (items.length===0){
          this.isShow = false;
          this.departmentselected=null;
          this.currentdepartmentID=null;
        } else {
          this.currentdepartmentID= items[0]['departmentId'];
          this.departmentselected= items;
          console.log(items[0]['departmentId'])
          var qs = require('qs');
          axios.post("http://localhost:8080/hoso/department/findUser",qs.stringify({ 'departmentID': items[0]['departmentId'] })).then(function(result) {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.personalitems=result.data.data
            console.log("result.data.data:"+this.personalitems);
          }.bind(this));
          console.log(this.departmentitems)
        this.isShow = true;
       // console.log(this.currentDepartment)
        }
        this.findModel()
      },
      personalrowSelected(items) {
        if (items.length===0){
          this.currentpersonalID = null;
          this.personalselected=null;
        } else {
          this.currentpersonalID = items[0]['userId']
          console.log(items[0])
          this.personalselected = items;
          //console.log(this.currentPerson)
        }
        this.findModel()
      }
    },
    mounted() {
      this.findAll();
    }
  }
</script>

<style scoped>

</style>
