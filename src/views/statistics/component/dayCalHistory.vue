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
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
      >
        <template slot="isselected" slot-scope="row">
          <b-button :variant="row.item.isselected ?  'warning':'primary'" size="sm" @click="itemSelected(row.item)" class="mr-2">
            {{ row.item.isselected ? '隐藏图表' : '展示图表'}}
          </b-button>
        </template>
      </b-table>
<!--      {{totalRows}}-->
<!--      {{chartdatasets}}-->
<!--      {{items.length}}-->
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
      <div class="chart-wrapper" >
      <workload-chart width="900px" v-if="datacollection.datasets.length" :chart-data="datacollection"></workload-chart>
      </div>
    </b-row>
  </b-container>
</template>

<script>
  import WorkloadChart from './workloadChart'
  export default {
    components: {WorkloadChart},
    name:'dayCalHistory',
    props: {
      userID:{
        type: Number,
      },
      chartlabels:{
        type:Array,
        default:()=>['挂号费','药费','材料费','检查费','处置费（含麻醉）','其他费用','总计']
      },
      fields:{
        type: Array,
        default: ()=>[
          { key: "ghTotal",label:'挂号费', sortable: true },
          { key: "yfTotal",label:'药费', sortable: true },
          { key: "clTotal",label:'材料费', sortable: true },
          { key: "jcTotal",label:'检查费', sortable: true },
          {key: "czTotal",label:'处置费', sortable: true },
          {key:"qtTotal",label:'其他',sortable:true},
          {key:"dayCalTotal",label:'总计',sortable:true},
          {key:"isselected",label:'选择',sortable:false},
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
        ]
      },
    },
    data() {
      return {
        colorArr:['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'],
        datacollection: { labels: [], datasets: [] },
        chartdatasets: [],
        sdate:'2019-06-27',
        edate:'2019-06-29',
        items: [],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
      }
    },
    watch:{
      'userID':'reload',
      'items':'CaltotalRows',
      'chartdatasets':'fillData',
    },
    mounted() {
      this.selectItems();
      // Set the initial number of items
    },
    methods: {
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
      },//random color
      RandomColor(){
        var color="#";
        for(var i=0;i<6;i++){
          color += this.colorArr[this.random(0,16)];
        }
        return color;
      },
      reload(){
        this.selectItems();
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
            if (this.chartdatasets[i]["dayCalId"]===item['dayCalId']){
              this.chartdatasets.splice(i,1)
            }
          }
          for(var j in this.items){//找到items中的他，并改为false
            if (this.items[j]===null){
              break;
            }
            if (this.items[j]["dayCalId"]===item['dayCalId']){
              this.items[j]['isselected']=false;
            }
          }
        } else{//添加他
          console.log("正在添加");
          var tempitem={
            label: '',
            backgroundColor: this.RandomColor(),
            dayCalId:null,
            Day_Cal_Date:null,
            data:[]
          };
          for (var m in item) {//遍历一行对象,初始化tempitem数据
            var temp =item[m]
            switch (m) {
              case'dayCalId':
                tempitem.label = temp;
                tempitem.dayCalId=temp;
                break;
              case'dayCalDate':
                tempitem.Day_Cal_Date = temp;
                break;
              case'ghTotal':
                tempitem.data.push(temp);
                break;
              case'yfTotal':
                tempitem.data.push(temp);
                break;
              case'clTotal':
                tempitem.data.push(temp);
                break;
              case'jcTotal':
                tempitem.data.push(temp);
                break;
              case'czTotal':
                tempitem.data.push(temp);
                break;
              case'qtTotal':
                tempitem.data.push(temp);
                break;
              case'dayCalTotal':
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
            if (this.items[n]["dayCalId"]===item['dayCalId']){
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
      selectItems(){//从数据库搜索items
        if(this.userID===null){
          console.log();
        }else {
          this.$post("dayCalculate/userDayCalculateHistory", {
            'sdate': this.sdate,
            'edate': this.edate,
            'userID': this.userID
          }).then(res=> {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.items = [];
            this.items = res.data;
            for (let item of this.items) {
              this.$set(item, "isselected", false)
            }
            //console.log(result);
          });
          this.CaltotalRows();
        }
      },
    }
  }
</script>

<style scoped>

</style>

