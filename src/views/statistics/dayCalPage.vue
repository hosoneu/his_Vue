<template>
  <div>
    <b-row>
      <b-col lg="3">
        <b-card header="日结列表">

          <b-tabs @input="changeTab">
            <b-tab title="未日结" :active="currentTab===0">
              <b-form-input v-model="filter" placeholder="请输入关键字" ></b-form-input>
              <b-table
                selectable
                select-mode="single"
                selectedVariant="success"
                :items="items"
                :fields="fields"
                @row-selected="rowSelected"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
              ></b-table>
              <b-pagination
                size="sm"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                class="my-0"
                align="center"
              ></b-pagination>
            </b-tab>
            <b-tab title="历史日结"  :active="currentTab===1">
              <b-form-input v-model="historyfilter" placeholder="请输入关键字" ></b-form-input>
              <b-table
                selectable
                select-mode="single"
                selectedVariant="success"
                :items="historyitems"
                :fields="historyfields"
                @row-selected="HistoryrowSelected"
                :current-page="historycurrentPage"
                :per-page="historyperPage"
                :filter="historyfilter"
                :sort-by.sync="historysortBy"
                :sort-desc.sync="historysortDesc"
                :sort-direction="historysortDirection"
                @filtered="HistoryonFiltered"
              ></b-table>
              <b-pagination
                size="sm"
                v-model="historycurrentPage"
                :total-rows="historytotalRows"
                :per-page="historyperPage"
                class="my-0"
                align="center"
              ></b-pagination>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col lg="9">
        <b-card header="发票列表"  v-if="currentTab===0">
          <template slot="header">
            <b-row class="ml-auto" >
              <b-col lg="3">
                <b-row>
                <label style="font-size: medium">
                  发票列表
                </label>
                </b-row>
              </b-col>
              <b-col  lg="9" >
                <b-row style="float: right">
                  <div>
                    <!-- Using modifiers -->
                    <!-- Using value -->
                    <b-button variant="primary" v-b-modal="'my-modal'" @click="CalSelectedtotalRows" :disabled="invoiceIDselected.length===0">日结</b-button>

                    <!-- The modal -->
                    <b-modal id="my-modal" title="日结发票列表" @ok="DODaycal" okTitle="确认日结" cancelTitle="取消">

                      <b-table
                        striped hover
                        :items="invoiceselected"
                        :fields="invoicefields"
                        :current-page="invoiceselectedcurrentPage"
                        :per-page="invoiceselectedperPage"
                        :filter="invoiceselectedfilter"
                        :sort-by.sync="invoiceselectedsortBy"
                        :sort-desc.sync="invoiceselectedsortDesc"
                        :sort-direction="invoiceselectedsortDirection"
                        @filtered="InvoiceSelectedOnFiltered"
                      >
                        <template slot="payTime" slot-scope="row">
                          {{row.value.split('T')[0]}}
                        </template>
                        <template slot="isselected" slot-scope="row">
                            {{ row.item.isselected ? '' : '已选择'}}
                        </template>
                      </b-table>
                      <b-pagination
                        v-model="invoiceselectedcurrentPage"
                        :total-rows="invoiceselectedtotalRows"
                        :per-page="invoiceselectedperPage"
                        align="center"
                      ></b-pagination>
                    </b-modal>
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </template>
          <b-row style="float: right">
          <b-button size="sm" :disabled="selected.length===0" :variant="isAllRowSelected ? 'warning':'primary'" @click="AllRowSelected()" class="mr-2">
            {{isAllRowSelected ? '取消' : '全选'}}
          </b-button>
          </b-row>
          <b-table
            :items="invoiceitems"
            :fields="invoicefields"
            :current-page="invoicecurrentPage"
            :per-page="invoiceperPage"
            :filter="invoicefilter"
            :sort-by.sync="invoicesortBy"
            :sort-desc.sync="invoicesortDesc"
            :sort-direction="invoicesortDirection"
            @filtered="InvoiceOnFiltered"
          >
            <template slot="payTime" slot-scope="row">
              {{row.value.split('T')[0]}}
            </template>
            <template slot="isselected" slot-scope="row">
              <b-button size="sm" :variant="row.item.isselected ?  'warning':'primary'" @click="InvoiceRowSelected(row.item)" class="mr-2">
                {{ row.item.isselected ? '已' : ''}} 选择
              </b-button>
            </template>
          </b-table>
          <b-pagination
            v-model="invoicecurrentPage"
            :total-rows="invoicetotalRows"
            :per-page="invoiceperPage"
            align="center"
          ></b-pagination>
          <b-row>
                <b-table :items="daycalitems" :fields="daycalfields" striped>
                  <template slot="show_details" slot-scope="row">
                    <b-button size="sm" :variant="row.detailsShowing ?  'warning':'primary'" @click="row.toggleDetails" class="mr-2">
                      {{ row.detailsShowing ? '隐藏明细' : '显示明细'}}
                    </b-button>
                  </template>
                  <template slot="row-details" slot-scope="row">
                    <b-card>
                      <b-card class="text-center">
                      <b-row class="mb-2">
                        <b-col sm="2" class="text-lg-left"><b>药品费</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>中成药费:{{ row.item.zcpyf }}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>中草药费:{{ row.item.zcyf }}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>西药费:{{ row.item.xyf }}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>麻醉药费:{{ row.item.mzyf }}</b></b-col>
                      </b-row>
                      </b-card>
                      <b-card class="text-center">
                      <b-row class="mb-2">
                        <b-col sm="2" class="text-sm-left"><b>检查费</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>超声检查费：{{ row.item.csjcf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>MRI检查费：{{ row.item.mrijcf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>放射检查费：{{ row.item.fsjcf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>CT检查费：{{ row.item.ctjcf}}</b></b-col>
                      </b-row>
                      </b-card>
                      <b-card class="text-center">
                      <b-row class="mb-2">
                        <b-col sm="2" class="text-sm-left"><b>检查材料费</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>超声材料费：{{ row.item.csclf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>MRI材料费：{{ row.item.mriclf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>放射材料费：{{ row.item.fsclf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>CT材料费：{{ row.item.ctclf}}</b></b-col>
                      </b-row>
                      </b-card>
                      <b-card class="text-center">
                      <b-row class="mb-2">
                        <b-col sm="2" class="text-sm-left"><b>处置费(含麻醉）费</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>处置费：{{ row.item.czf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>处置材料费：{{ row.item.czclf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>麻醉费：{{ row.item.mzf}}</b></b-col>
                      </b-row>
                      </b-card>
                      <b-card class="text-center">
                      <b-row class="mb-2">
                        <b-col sm="2" class="text-sm-left"><b>其他费用</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>诊疗费：{{ row.item.zlf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>检验费：{{ row.item.jyf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>检验材料费：{{ row.item.jyclf}}</b></b-col>
                        <b-col sm="2" class="text-sm-left"><b>门诊手术费：{{ row.item.mzssf}}</b></b-col>
                        <b-col sm="1" class="text-sm-left"><b>其他：{{ row.item.qt}}</b></b-col>
                      </b-row>
                      </b-card>
                    </b-card>
                  </template>
                </b-table>
          </b-row>
        </b-card>

        <b-card header="" v-if="currentTab===1">
          <day-cal-history :user-i-d="historyuserID"></day-cal-history>
        </b-card>
      </b-col>
    </b-row>
    <!--{{ invoiceselected }}-->
    <!--{{invoiceIDselected}}-->
<!--    {{userID}}-->
<!--    {{historyuserID}}-->
  </div>
</template>

<script>
  //UserDayCalculate
  import {mapState} from 'vuex'
  import dayCalHistory from './component/dayCalHistory'
  export default {
    name: 'userTable',
    components: {dayCalHistory},
    watch: {
      'historyselected': 'fillHistoryUser',
      'currentTab': 'getHistoryORDayCal',
      'detailworkload': 'DayCalculate',
      'items': 'CaltotalRows',
      'invoiceselected': 'fillCalData',
      'invoiceitems': 'CalTotalInvoicesRows',
      'invoiceIDselected': 'CalculateWorkload'
    },
    computed: {
      ...mapState("statistics", ["userID"])
    },
    data() {
      return {
        invoiceselectedtotalRows: 1,
        invoiceselectedcurrentPage: 1,
        invoiceselectedperPage: 4,
        invoiceselectedsortBy: null,
        invoiceselectedsortDesc: false,
        invoiceselectedsortDirection: 'asc',
        invoiceselectedfilter: null,
        isAllRowSelected: false,
        historyuserID: null,
        daycalfields: [
          {key: 'GH_Total', label: '挂号费'},
          {key: 'YF_Total', label: '药费'},
          {key: 'CL_Total', label: '材料费'},
          {key: 'JC_Total', label: '检查费'},
          {key: 'CZ_Total', label: '处置（含麻醉）费'},
          {key: 'QT_Total', label: '其他费用'},
          {key: 'Day_Cal_Total', label: '总计'},
          {key: 'show_details', label: '明细'},
        ],
        daycalitems: [],
        detailworkload: {
          GH_Total: 0.0,
          YF_Total: 0.0,
          CL_Total: 0.0,
          JC_Total: 0.0,
          CZ_Total: 0.0,
          QT_Total: 0.0,
          Day_Cal_Total: 0.0,
          invoiceNumber: 0,
          qt: 0.0,
          csclf: 0.0,
          mzssf: 0.0,
          zlf: 0.0,
          ghf: 0.0,
          fsjcf: 0.0,
          mrijcf: 0.0,
          csjcf: 10.0,
          fsclf: 0.0,
          ctclf: 0.0,
          xyf: 0.0,
          czclf: 0.0,
          zcpyf: 0.0,
          jyf: 0.0,
          jyclf: 0.0,
          zcyf: 0.0,
          mriclf: 0.0,
          mzf: 0.0,
          czf: 0.0,
          mzyf: 0.0,
          ctjcf: 0.0,
          // paitents:0,
          // itemID:0,
          // itemname:0,
        },
        currentTab: 0,
        invoiceitems: [],
        invoicetotalRows: 1,
        invoicecurrentPage: 1,
        invoiceperPage: 5,
        invoicesortBy: null,
        invoicesortDesc: false,
        invoicesortDirection: 'asc',
        invoicefilter: null,
        invoicefields: [{key: 'invoiceNo', label: '发票编号', sortable: true},
          {key: 'payTime', label: '时间', sortable: true},
          {key: 'totalCost', label: '总金额', sortable: true},
          {key: 'isselected', label: '选择'}],
        invoiceselected: [],
        invoiceIDselected: [],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        fields: [{key: 'userId', label: '工作编号', sortable: true},
          {key: 'userName', label: '职员姓名', sortable: true},],
        items: [],
        selected: [],
        historyitems: [],
        historyselected: [],
        historytotalRows: 1,
        historycurrentPage: 1,
        historyperPage: 5,
        historysortBy: null,
        historysortDesc: false,
        historysortDirection: 'asc',
        historyfilter: null,
        historyfields: [{key: 'userId', label: '工作编号', sortable: true},
          {key: 'userName', label: '职员姓名', sortable: true},],
      }
    },
    mounted() {
      this.findNotCalUsers();
      this.CaltotalRows();
      this.DayCalculate();
      // Set the initial number of items
    },
    inject: ['reload'],
    methods: {
      fillHistoryUser() {
        if (this.historyselected.length === 0) {
          this.historyuserID = null
        } else {
          this.historyuserID = this.historyselected[0]['userId']
        }

      },
      DODaycal() {
        //console.log(qs.stringify({usrID:this.userID,date:new Date(),drugCost:this.detailworkload.YF_Total,registrateCost:this.detailworkload.GH_Total,materialCost:this.detailworkload.CL_Total,examinateCost:this.detailworkload.JC_Total,treatCost:this.detailworkload.CZ_Total,qtCost:this.detailworkload.QT_Total ,totalCost:this.detailworkload.Day_Cal_Total,invoiceIDs: this.invoiceIDselected}, {indices: false}))
        this.$post("dayCalculate/personalDayCalculate", {
          userID: this.userID,
          date: new Date(),
          drugCost: this.detailworkload.YF_Total,
          registrateCost: this.detailworkload.GH_Total,
          materialCost: this.detailworkload.CL_Total,
          examinateCost: this.detailworkload.JC_Total,
          treatCost: this.detailworkload.CZ_Total,
          qtCost: this.detailworkload.QT_Total,
          totalCost: this.detailworkload.Day_Cal_Total,
          invoiceIDs: this.invoiceIDselected
        }).then(res=> {
          // result是所有的返回回来的数据
          // 包括了响应报文行
          // 响应报文头
          // 响应报文体
          if (res.status === "OK") {
            alert("成功");
            this.reload();
          }
        });
      },
      async changeTab(index) {
        this.currentTab = index;
        this.getHistoryORDayCal()
      },
      DayCalculate() {
        this.daycalitems = [];
        this.daycalitems.push(this.detailworkload)
      },
      findNotCalInvoices() {
        console.log(this.selected[0]['userId'])
        this.$post("dayCalculate/findInvoices", {userID: this.selected[0]['userId']}).then(res=> {
          // result是所有的返回回来的数据
          // 包括了响应报文行
          // 响应报文头
          // 响应报文体
          this.invoiceitems = [];
          console.log(res.data)
          this.invoiceitems = res.data;
          for (let item of this.invoiceitems) {
            this.$set(item, "isselected", false)
          }
        });
      },
      fillCalData() {
        let result = [];
        if (this.invoiceselected.length === 0) {
          this.invoiceIDselected = result;
        } else {
          for (var item of this.invoiceselected) {
            result.push(item['invoiceId'])
          }
          console.log(result);
          this.invoiceIDselected = result;
          this.CalculateWorkload();
        }
      },
      CalculateWorkload() {
        if (this.invoiceIDselected.length === 0) {
          this.detailworkload = {
            GH_Total: 0.0,
            YF_Total: 0.0,
            CL_Total: 0.0,
            JC_Total: 0.0,
            CZ_Total: 0.0,
            QT_Total: 0.0,
            Day_Cal_Total: 0.0,
            invoiceNumber: 0,
            qt: 0.0,
            csclf: 0.0,
            mzssf: 0.0,
            zlf: 0.0,
            ghf: 0.0,
            fsjcf: 0.0,
            mrijcf: 0.0,
            csjcf: 10.0,
            fsclf: 0.0,
            ctclf: 0.0,
            xyf: 0.0,
            czclf: 0.0,
            zcpyf: 0.0,
            jyf: 0.0,
            jyclf: 0.0,
            zcyf: 0.0,
            mriclf: 0.0,
            mzf: 0.0,
            czf: 0.0,
            mzyf: 0.0,
            ctjcf: 0.0,
            // paitents:0,
            // itemID:0,
            // itemname:0,
          }
        } else {
          this.$post("dayCalculate/userDayCalculate", {invoiceIDs: this.invoiceIDselected}).then(res=> {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            this.detailworkload.Day_Cal_Total = 0.0;
            this.detailworkload.YF_Total = 0.0;
            this.detailworkload.CZ_Total = 0.0;
            this.detailworkload.GH_Total = 0.0;
            this.detailworkload.JC_Total = 0.0;
            this.detailworkload.CL_Total = 0.0;
            this.detailworkload.QT_Total = 0.0;
            for (var item in res.data) {
              var temp = res.data[item];
              switch (item) {
                case'invoiceNumber':
                  this.detailworkload.invoiceNumber = temp;
                  break;
                case'csclf':
                  this.detailworkload.csclf = temp;
                  this.detailworkload.CL_Total = this.detailworkload.CL_Total + temp;
                  break;
                case'csjcf':
                  this.detailworkload.csjcf = temp;
                  this.detailworkload.JC_Total = this.detailworkload.JC_Total + temp;
                  break;
                case'ctclf':
                  this.detailworkload.ctclf = temp;
                  this.detailworkload.CL_Total = this.detailworkload.CL_Total + temp;
                  break;
                case'ctjcf':
                  this.detailworkload.ctjcf = temp;
                  this.detailworkload.JC_Total = this.detailworkload.JC_Total + temp;
                  break;
                case'czclf':
                  this.detailworkload.czclf = temp;
                  this.detailworkload.CL_Total = this.detailworkload.CL_Total + temp;
                  break;
                case'czf':
                  this.detailworkload.czf = temp;
                  this.detailworkload.CZ_Total = this.detailworkload.CZ_Total + temp;
                  break;
                case'fsclf':
                  this.detailworkload.fsclf = temp;
                  this.detailworkload.CL_Total = this.detailworkload.CL_Total + temp;
                  break;
                case'fsjcf':
                  this.detailworkload.fsjcf = temp;
                  this.detailworkload.JC_Total = this.detailworkload.JC_Total + temp;
                  break;
                case'ghf':
                  this.detailworkload.GH_Total = temp;
                  break;
                case'jyclf':
                  this.detailworkload.jyclf = temp;
                  this.detailworkload.CL_Total = this.detailworkload.CL_Total + temp;
                  break;
                case'mriclf':
                  this.detailworkload.mriclf = temp;
                  this.detailworkload.CL_Total = this.detailworkload.CL_Total + temp;
                  break;
                case'mrijcf':
                  this.detailworkload.mrijcf = temp;
                  this.detailworkload.JC_Total = this.detailworkload.JC_Total + temp;
                  break;
                case'mzf':
                  this.detailworkload.mzf = temp;
                  this.detailworkload.CZ_Total = this.detailworkload.CZ_Total + temp;
                  break;
                case'mzssf':
                  this.detailworkload.mzssf = temp;
                  this.detailworkload.QT_Total = this.detailworkload.QT_Total + temp;
                  break;
                case'xyf':
                  this.detailworkload.xyf = temp;
                  this.detailworkload.YF_Total = this.detailworkload.YF_Total + temp;
                  break;
                case'zcpyf':
                  this.detailworkload.zcpyf = temp;
                  this.detailworkload.YF_Total = this.detailworkload.YF_Total + temp;
                  break;
                case'zcyf':
                  this.detailworkload.zcyf = temp;
                  this.detailworkload.YF_Total = this.detailworkload.YF_Total + temp;
                  break;
                case'zlf':
                  this.detailworkload.zlf = temp;
                  this.detailworkload.YF_Total = this.detailworkload.YF_Total + temp;
                  break;
                case'mzyf':
                  this.detailworkload.mzyf = temp;
                  this.detailworkload.YF_Total = this.detailworkload.YF_Total + temp;
                  break;
                case'qt':
                  this.detailworkload.qt = temp;
                  this.detailworkload.QT_Total = this.detailworkload.QT_Total + temp;
                  break;
                case'jyf':
                  this.detailworkload.jyf = temp;
                  this.detailworkload.QT_Total = this.detailworkload.QT_Total + temp;
                  break;
                default:
                  break;
              }
            }
            this.detailworkload.Day_Cal_Total = this.detailworkload.YF_Total + this.detailworkload.CZ_Total + this.detailworkload.GH_Total + this.detailworkload.JC_Total + this.detailworkload.CL_Total + this.detailworkload.QT_Total;
            console.log(this.detailworkload.Day_Cal_Total);
          });
        }
      },
      getHistoryORDayCal() {
        if (this.currentTab === 0) {
          this.findNotCalUsers();//请求未日结user
          this.CaltotalRows();//计算table行数
          this.DayCalculate();//更新右侧日结
        } else {
          this.getHistory();//请求历史数据
        }
      },
      getHistory() {
        this.$post("dayCalculate/findHistoryCalUsers").then(res=> {
          // result是所有的返回回来的数据
          // 包括了响应报文行
          // 响应报文头
          // 响应报文体
          this.historyitems = res.data;
        });
      },
      findNotCalUsers() {
        this.$post("dayCalculate/findNotCalUsers").then(res=> {
          // result是所有的返回回来的数据
          // 包括了响应报文行
          // 响应报文头
          // 响应报文体
          this.items = res.data;
        });
      },
      CaltotalRows() {
        this.totalRows = this.items.length;
      },
      CalSelectedtotalRows() {
        this.invoiceselectedtotalRows = this.invoiceselected.length;
      },
      CalTotalInvoicesRows() {
        this.invoicetotalRows = this.invoiceitems.length;
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      InvoiceOnFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.invoicetotalRows = filteredItems.length
        this.invoicecurrentPage = 1
      },
      HistoryonFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.historytotalRows = filteredItems.length
        this.historycurrentPage = 1
      },
      InvoiceSelectedOnFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.invoiceselectedtotalRows = filteredItems.length
        this.invoiceselectedcurrentPage = 1
      },
      rowSelected(items) {
        if (items.length === 0) {
          this.invoiceitems = [];
          this.selected = items
        } else {
          this.selected = items;
          this.findNotCalInvoices();
        }
        this.invoiceselected = [];
        this.invoiceIDselected = [];
        this.CalculateWorkload();
      },
      HistoryrowSelected(items) {
        this.historyselected = items;
      },
      AllRowSelected() {
        if (this.isAllRowSelected) {
          for (var j in this.invoiceitems) {//找到items中的所有改为false
            this.invoiceitems[j]['isselected'] = false;
          }
          this.invoiceselected=[]
          this.invoiceIDselected=[]
          this.isAllRowSelected = false
        } else {
          //添加他
          for (var n in this.invoiceitems) {//找到items中的他，并改为true
            this.invoiceselected.push(this.invoiceitems[n]);
            this.invoiceitems[n]['isselected'] = true;
          }
          this.fillCalData();
          this.isAllRowSelected = true
        }
      },
      InvoiceRowSelected(ite) {//选择条目得到对应数据，更新itemSelected数组
        var item = JSON.parse(JSON.stringify(ite));
        if (item['isselected'] === true) {//如果已经被选中就找到他并删除
          for (var i in this.invoiceselected) {
            if (this.invoiceselected[i]["invoiceId"] === item['invoiceId']) {
              console.log("删除"+i+'号元素')
              this.invoiceselected.splice(i, 1)
            }
          }
          for (var j in this.invoiceitems) {//找到items中的他，并改为false
            if (this.invoiceitems[j] === null) {
              console.log();
            }
            if (this.invoiceitems[j]["invoiceId"] === item['invoiceId']) {
              this.invoiceitems[j]['isselected'] = false;
            }
          }
        } else {//添加他
          console.log(item);
          this.invoiceselected.push(item);//插入到已选择数组
          console.log("更改items中的isselected值");
          for (var n in this.invoiceitems) {//找到items中的他，并改为true
            //console.log("元素"+this.invoiceitems[n]['invoiceId']);
            if (this.invoiceitems[n]["invoiceId"] === item['invoiceId']) {
              this.invoiceitems[n]['isselected'] = true;
            }
          }

        }
        console.log(this.invoiceselected)
        this.fillCalData();
      }
    }
  }
</script>

<style scoped>

</style>
