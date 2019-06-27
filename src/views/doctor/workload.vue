<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>

      <b-col lg="3">
        <b-form-input   type="date" v-model="sdate"></b-form-input>
      </b-col>
      <b-col lg="3">
        <b-form-input type="date" v-model="edate"></b-form-input>
      </b-col>
      <b-col lg="4">
        <b-form-input v-model="filter" placeholder="请输入关键字" ></b-form-input>
      </b-col>
      <b-col lg="2">
        <b-button type="button"  variant="primary" @click="selectItems" >搜索</b-button>
      </b-col>
    </b-row>
    <!-- Main table element -->
    <b-row>
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template slot="isselected" slot-scope="row">
        <b-button size="sm" @click="itemSelected(row.item)" class="mr-2">
          {{ row.item.isselected ? 'NO' : 'DO'}} Comparing
        </b-button>
      </template>
    </b-table>
    {{totalRows}}
    {{chartdatasets}}
    {{items.length}}
      <b-col class="my-1" >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
          align="center"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row>
      <workload-chart v-if="datacollection.datasets.length" :chart-data="datacollection"></workload-chart>
    </b-row>
  </b-container>
</template>

<script>
  import axios from 'axios'
  import WorkloadChart from './workloadChart'
  export default {
    components: {WorkloadChart},
    name:'Workload',
    props: {
      testID : String,
      currentdepartment: Number,
      currentperson: Number,
    },
    data() {
      return {
        datacollection: { labels: [], datasets: [] },
        chartdatasets: [],
        chartlabels: [ 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 10, 0, 20, 0, 0, 10, 10, 7777, 9 ],
        sdate:'2019-06-09',
        edate:'2019-06-10',
        testID:'0',
        items: [
        ],
        fields: [
          { key: "itemID",label:'编号', sortable: true },
          { key: "itemname",label:'姓名', sortable: true },
          { key: "ghf",label:'挂号费', sortable: true },
          { key: "zlf",label:'诊疗费', sortable: true },
          {key: "jyf",label:'检验费', sortable: true },
          {key:"isselected",label:'比较',sortable:false}
          // {key: 4,label:'检验材料费', sortable: true },
          // {key: 5,label:'超声检查费', sortable: true },
          // {key: 6,label:'超声材料费', sortable: true },
          // {key: 7,label:'放射检查费', sortable: true },
          // {key: 8,label:'放射材料费', sortable: true },
          // {key: 9,label:'MRI检查费', sortable: true },
          // {key: 10,label:'MRI材料费', sortable: true },
          // {key: 11,label:'CT检查费', sortable: true },
          // {key: 12,label:'CT材料费', sortable: true },
          // {key: 13,label:'西药费', sortable: true },
          // {key: 14,label:'中成药费', sortable: true },
          // {key: 15,label:'中草药费', sortable: true },
          // {key: 16,label:'处置费', sortable: true },
          // {key: 17,label:'处置材料费', sortable: true },
          // {key: 18,label:'麻醉费', sortable: true },
          // {key: 19,label:'麻醉药费', sortable: true },
          // {key: 20,label:'门诊手术费', sortable: true },
          // {key: 21,label:'其他', sortable: true },
          // {key: 22,label:'病人数', sortable: true },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
      }
    },
    watch:{
      'items':'CaltotalRows',
      'chartdatasets':'fillData',
      'currentdepartment': 'selectItems',
      'currentperson': 'selectItems'
    },
    mounted() {
      this.selectItems();
      // Set the initial number of items
    },
    methods: {
      fillData() {
        let result = {
          labels: this.chartlabels,
          datasets: []
        };
        for(var item of this.chartdatasets){
            var temp ={
              label:item['label'],
              data:item['data']
            }
            result.datasets.push(temp)
        }
        console.log(result);
        this.datacollection = result;
      },
      CaltotalRows(){
        this.totalRows = this.items.length;
      },
      itemSelected(ite) {//选择条目得到对应数据，更新itemSelected数组
        var item=JSON.parse(JSON.stringify(ite));
          if (item['isselected']===true){//如果在比较就找到他并删除
            for(var i in this.chartdatasets){
              if (this.chartdatasets[i]["itemID"]===item['itemID']){
                this.chartdatasets.splice(i,1)
              }
            }
            for(var j in this.items){//找到items中的他，并改为false
              if (this.items[j]===null){
                break;
              }
              if (this.items[j]["itemID"]===item['itemID']){
                this.items[j]['isselected']=false;
              }
            }
          } else{//添加他
            console.log("正在添加");
            var tempitem={
              label: '',
              itemID:null,
              data:[]
            };
            for (var m in item) {//遍历一行对象,初始化tempitem数据
              var temp =item[m]
              switch (m) {
                case'itemname':
                  tempitem.label = temp;
                        break;
                case'itemID':
                  tempitem.itemID = temp;
                  break;
                case'invoiceNumber':
                  tempitem.data.push(temp);
                  break;
                case'paitents':
                  tempitem.data.push(temp);
                  break;
                case'csclf':
                  tempitem.data.push(temp);
                  break;
                case'csjcf':
                  tempitem.data.push(temp);
                  break;
                case'ctclf':
                  tempitem.data.push(temp);
                  break;
                case'ctjcf':
                  tempitem.data.push(temp);
                  break;
                case'czclf':
                  tempitem.data.push(temp);
                  break;
                case'czf':
                  tempitem.data.push(temp);
                  break;
                case'fsclf':
                  tempitem.data.push(temp);
                  break;
                case'fsjcf':
                  tempitem.data.push(temp);
                  break;
                case'ghf':
                  tempitem.data.push(temp);
                  break;
                case'jyclf':
                  tempitem.data.push(temp);
                  break;
                case'mriclf':
                  tempitem.data.push(temp);
                  break;
                case'mrijcf':
                  tempitem.data.push(temp);
                  break;
                case'mzf':
                  tempitem.data.push(temp);
                  break;
                case'mzssf':
                  tempitem.data.push(temp);
                  break;
                case'xyf':
                  tempitem.data.push(temp);
                  break;
                case'zcpyf':
                  tempitem.data.push(temp);
                  break;
                case'zcyf':
                  tempitem.data.push(temp);
                  break;
                case'zlf':
                  tempitem.data.push(temp);
                  break;
                case'qt':
                  tempitem.data.push(temp);
                  break;
                default:
                  break;
              }
            }
            console.log(typeof tempitem+"temp为");
            console.log(tempitem);
            this.chartdatasets.push(tempitem);//插入到已选择数组
            console.log("更改items中的isselected值");
            for(var n in this.items){//找到items中的他，并改为true
              //console.log("元素"+this.items[n]['itemID']);
              if (this.items[n]["itemID"]===item['itemID']){
                //console.log("isselected为"+this.items[n]['isselected']);
                this.items[n]['isselected']=true;
                //console.log(this.items[n]);
                break;
              }
            }

          }
        console.log("list");
        console.log(this.chartdatasets)
        this.fillData()
      },
      // test(){
      //   console.log(this.sdate)
      // },
      selectItems(){//从数据库搜索items
        if(this.testID==='0'){//所有科室
          //console.log("testID"+this.testID)
          var qs = require('qs');
          axios.post("http://localhost:8080/hoso/workload/findAllDepartmentWorkload",qs.stringify({ 'sdate':this.sdate,'edate':this.edate })).then(function(result) {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.items=result.data.data
            for (let item of this.items){
              this.$set(item,"isselected",false)
            }
            //console.log("result"+result.data.data);
          }.bind(this));
        }else if(this.testID==='1'){//某科室
          var qs = require('qs');
          axios.post("http://localhost:8080/hoso/workload/findAllDoctorsWorkload",qs.stringify({ 'sdate':this.sdate,'edate':this.edate,'departmentID':this.currentdepartment})).then(function(result) {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.items=result.data.data;
            for (let item of this.items){
              this.$set(item,"isselected",false)
            }
            //console.log("result"+result.data.data);
          }.bind(this));
        }else {//某医生
            //console.log('p'+this.currentperson)
          //console.log('d'+this.currentdepartment)
          var qs = require('qs');
          axios.post("http://localhost:8080/hoso/workload/personalWorkload",qs.stringify({ 'sdate':this.sdate,'edate':this.edate,'doctorID':this.currentperson})).then(function(result) {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.items=[];
            this.items.push(result.data.data);
            for (let item of this.items){
              this.$set(item,"isselected",false)
            }
            //console.log(result);
          }.bind(this));
        }
        this.CaltotalRows();
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      }
    }
  }
</script>
