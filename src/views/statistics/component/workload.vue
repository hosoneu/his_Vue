<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="3">
        <b-input-group prepend="日期">
        <b-form-input   type="date" v-model="sdate"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col lg="3">
        <b-input-group prepend="日期">
        <b-form-input type="date" v-model="edate"></b-form-input>
        </b-input-group>
      </b-col>
      <b-col lg="4">
        <b-input-group >
        <b-form-input v-model="filter" placeholder="请输入关键字" ></b-form-input>
          <b-input-group-append>
        <b-button type="button"  variant="primary" @click="selectItems" >搜索</b-button>
          </b-input-group-append>
        </b-input-group>
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
        <b-button  :variant="row.item.isselected ?  'warning':'primary'" size="sm" @click="itemSelected(row.item)" class="mr-2">
          {{ row.item.isselected ? '取消比较' : '进行比较'}}
        </b-button>
      </template>
    </b-table>
<!--    {{totalRows}}-->
<!--    {{chartdatasets}}-->
<!--    {{items.length}}-->
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
      <b-card header="Chart"  v-if="datacollection.datasets.length" >
      <div class="chart-wrapper" >
      <workload-chart :width="fullWidth" :chart-data="datacollection"></workload-chart>
      </div>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
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
        fullWidth: document.documentElement.clientWidth,
        colorArr:['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'],
        datacollection: { labels: [], datasets: [] },
        chartdatasets: [],
        chartlabels: [],
        sdate:'2019-06-09',
        edate:'2019-06-10',
        items: [
        ],
        fields: [
          { key: "itemID",label:'编号', sortable: true },
          { key: "itemname",label:'姓名', sortable: true },
          {key: "paitents",label:'病人', sortable: true },
          { key: "ghf",label:'挂号', sortable: true },
          { key: "zlf",label:'诊疗', sortable: true },
          {key: "jyf",label:'检验', sortable: true },
          // {key: "jyclf",label:'检验材料费', sortable: true },
          {key: "csjcf",label:'超声', sortable: true },
          // {key: "csclf",label:'超声材料费', sortable: true },
          {key: "fsjcf",label:'放射', sortable: true },
          // {key: "fsclf",label:'放射材料费', sortable: true },
          {key:"mrijcf",label:'MRI', sortable: true },
          // {key: "mriclf",label:'MRI材料费', sortable: true },
          {key: "ctjcf",label:'CT', sortable: true },
          // {key: "ctclf",label:'CT材料费', sortable: true },
          {key: "xyf",label:'西药', sortable: true },
          // {key: "zcpyf",label:'中成药费', sortable: true },
          // {key: "zcyf",label:'中草药费', sortable: true },
          {key: "czf",label:'处置', sortable: true },
          // {key: "czclf",label:'处置材料费', sortable: true },
          {key: "mzf",label:'麻醉', sortable: true },
         // {key: "mzyf",label:'麻醉药费', sortable: true },
          {key: "mzssf",label:'门诊手术', sortable: true },
          {key: "qt",label:'其他', sortable: true },
          {key:"isselected",label:'比较',sortable:false},
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
    ready: function () {

      window.addEventListener('resize', this.handleResize)
    }, beforeDestroy: function () {

      window.removeEventListener('resize', this.handleResize)
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
      reloadChart(){
        this.chartdatasets=[]
      },
      handleResize () {
        this.fullWidth = document.documentElement.clientWidth},
      random(min,max){
        if(isNaN(min) || isNaN(max)){
          return null;
        }
        if(min > max){
          min ^= max;
          max ^= min;
          min ^= max;
        }
        return (Math.random() * (max - min) | 0) + min;
      },
      RandomColor(){
        var color="#";
        for(var i=0;i<6;i++){
          color += this.colorArr[this.random(0,16)];
        }
        return color;
      },
      fillData() {
        let result = {
          labels: this.chartlabels,
          datasets: []
        };
        for(var item of this.chartdatasets){
            var temp ={
              label:item['label'],
              backgroundColor: item['backgroundColor'],
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
              backgroundColor: this.RandomColor(),
              itemID:null,
              data:[]
            };
            for (var m in item) {//遍历一行对象,初始化tempitem数据
              console.log("####")
              console.log(m)
              console.log("####")
              var temp =item[m]
              switch (m) {
                case'itemname':
                  tempitem.label = temp;
                        break;
                case'itemID':
                  tempitem.itemID = temp;
                  break;
                case'invoiceNumber':
                  this.chartlabels.push("发票数")
                  tempitem.data.push(temp);
                  break;
                case'paitents':
                  this.chartlabels.push("病人数")
                  tempitem.data.push(temp);
                  break;
                case'csclf':
                  this.chartlabels.push("超声材料费")
                  tempitem.data.push(temp);
                  break;
                case'csjcf':
                  this.chartlabels.push("超声检查费")
                  tempitem.data.push(temp);
                  break;
                case'ctclf':
                  this.chartlabels.push("CT材料费")
                  tempitem.data.push(temp);
                  break;
                case'ctjcf':
                  this.chartlabels.push("CT检查费")
                  tempitem.data.push(temp);
                  break;
                case'czclf':
                  this.chartlabels.push("处置材料费")
                  tempitem.data.push(temp);
                  break;
                case'czf':
                  this.chartlabels.push("处置费")
                  tempitem.data.push(temp);
                  break;
                case'fsclf':
                  this.chartlabels.push("放射材料费")
                  tempitem.data.push(temp);
                  break;
                case'fsjcf':
                  this.chartlabels.push("放射检查费")
                  tempitem.data.push(temp);
                  break;
                case'ghf':
                  this.chartlabels.push("挂号费")
                  tempitem.data.push(temp);
                  break;
                case'jyclf':
                  this.chartlabels.push("检验材料费")
                  tempitem.data.push(temp);
                  break;
                case'mriclf':
                  this.chartlabels.push("MRI材料费")
                  tempitem.data.push(temp);
                  break;
                case'mrijcf':
                  this.chartlabels.push("MRI检查费")
                  tempitem.data.push(temp);
                  break;
                case'mzf':
                  this.chartlabels.push("麻醉费")
                  tempitem.data.push(temp);
                  break;
                case'mzssf':
                  this.chartlabels.push("门诊手术费")
                  tempitem.data.push(temp);
                  break;
                case'xyf':
                  this.chartlabels.push("西药费")
                  tempitem.data.push(temp);
                  break;
                case'zcpyf':
                  this.chartlabels.push("中成药费")
                  tempitem.data.push(temp);
                  break;
                case'zcyf':
                  this.chartlabels.push("中草药费")
                  tempitem.data.push(temp);
                  break;
                case'zlf':
                  this.chartlabels.push("诊疗费")
                  tempitem.data.push(temp);
                  break;
                case'jyf':
                  this.chartlabels.push("检验费")
                  tempitem.data.push(temp);
                  break;
                case'qt':
                  this.chartlabels.push("其他")
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
        var qs = require('qs');
        if(this.testID==='0'){//所有科室
          //console.log("testID"+this.testID)
          console.log(qs.stringify({ 'sdate':this.sdate,'edate':this.edate })),
          this.$post("workload/findAllDepartmentWorkload",{ 'sdate':this.sdate,'edate':this.edate }).then(res=> {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.items=res.data;
            for (let item of this.items){
              this.$set(item,"isselected",false)
            }
            //console.log("result"+res.data);
          });
        }else if(this.testID==='1'){//某科室
          this.$post("workload/findAllDoctorsWorkload",{ 'sdate':this.sdate,'edate':this.edate,'departmentID':this.currentdepartment}).then(res=> {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.items=res.data;
            for (let item of this.items){
              this.$set(item,"isselected",false)
            }
            //console.log("result"+res.data);
          });
        }else {//某医生
            //console.log('p'+this.currentperson)
          //console.log('d'+this.currentdepartment)
          this.$post("workload/personalWorkload",{ 'sdate':this.sdate,'edate':this.edate,'doctorID':this.currentperson}).then(res=> {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.items=[];
            this.items.push(res.data);
            for (let item of this.items){
              this.$set(item,"isselected",false)
            }
            //console.log(result);
          });
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


