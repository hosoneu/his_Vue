<template>
  <b-card header="Card title">
    <template slot="header">
      <div class="pull-right">
        <b-button @click="addDrugs">添加</b-button>
      </div>
    </template>
    <div class="my-1">
      <!-- User Interface controls -->
      <b-row>
        <b-col sm="8" class="my-1">
          <b-input-group>
            <b-form-input
              v-model="filter"
              placeholder="请输入..."
              size="sm"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
                size="sm"
              >
                清空</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col sm="4" class="my-1">
          <b-form-select
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-col>
      </b-row>
      <br>
      <!-- Main table element -->
      <b-table
        show-empty
        :hover="customizeHover"
        stacked="md"
        :aria-busy="customizeIsBusy"
        :items="commonDrugsItems"
        :fields="commonFields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
      </b-table>
      <!--          @row-clicked="selectItem">-->
      <!--页码-->
      <b-row>
        <b-col md="12" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            class="my-0"
            size="sm"
            align="center"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>


    <b-modal title="Modal title" size="lg" v-model="largeModal" @ok="largeModal = false" id="allDrugsModal">
      <div class="my-1">
        <!-- User Interface controls -->
        <b-row>
          <b-col sm="8" class="my-1">
            <b-input-group>
              <b-form-input
                v-model="allfilter"
                placeholder="请输入..."
                size="sm"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  :disabled="!allfilter"
                  @click="allfilter = ''"
                  size="sm"
                >
                  清空</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col sm="4" class="my-1">
            <b-form-select
              v-model="allperPage"
              :options="allpageOptions"
              size="sm"
            ></b-form-select>
          </b-col>
        </b-row>
        <br>
        <!-- Main table element -->
        <b-table
          :selectable="allcustomizeSelectable"
          :select-mode="allcustomizeSelectMode"
          show-empty
          :hover="allcustomizeHover"
          stacked="md"
          :aria-busy="allcustomizeIsBusy"
          :items="alldrugsItems"
          :fields="alldrugsFields"
          :current-page="allcurrentPage"
          :per-page="allperPage"
          :filter="allfilter"
          :sort-by.sync="allsortBy"
          :sort-desc.sync="allsortDesc"
          :sort-direction="allsortDirection"
          @filtered="allonFiltered"
          @row-selected="rowSelected"
        >
<!--          <template slot="amount" slot-scope="data">-->
<!--            &lt;!&ndash;            <b-badge :variant="success">{{data.item.amount}}</b-badge>&ndash;&gt;-->
<!--            <input type="text" v-model="data.item.amount">-->
<!--          </template>-->
        </b-table>
        <!--          @row-clicked="selectItem">-->
        <!--页码-->
        <b-row>
          <b-col md="12" class="my-1">
            <b-pagination
              v-model="allcurrentPage"
              :total-rows="alltotal"
              :per-page="allperPage"
              class="my-0"
              size="sm"
              align="center"
            ></b-pagination>
          </b-col>
        </b-row>
      </div>

      <template slot="modal-footer" slot-scope="{cancel, ok}">
        <b-button size="sm" variant="success" @click="cancel();tempCancel();">
          取消
        </b-button>
        <b-button size="sm" variant="danger" @click="ok();tempOk()">
          确定
        </b-button>
      </template>
<!--      slot-->
      <template slot="modal-footer" slot-scope="{cancel, ok}">
        <b-button size="sm" variant="success" @click="cancel();tempCancel();">
          取消
        </b-button>
        <b-button size="sm" variant="danger" @click="ok();tempOk()">
          确定
        </b-button>
      </template>
    </b-modal>

  </b-card>
</template>
<script>
  export default {
    name:'commonlyUsedItems',
    data(){
      return{
        doctorId:999,

        customizeSelectMode:{//单选/多选 默认为单选
          type:String,
          default:()=>{return 'multi'}
        },
        customizeSelectable:{//是否可选 默认为可选
          type:Boolean,
          default:()=>{return true}
        },
        customizeHover:{//是否有选中动画 默认有选中动画
          type:Boolean,
          default:()=>{return true}
        },
        customizeIsBusy:{
          type:Boolean,
          default:()=>{return false}
        },
        perPage: 5,//每页的个数
        pageOptions: [5, 10, 15],//每页可选页数
        currentPage:1,
        total:1,
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,

        //all
        allcustomizeSelectMode:{//单选/多选 默认为单选
          type:String,
          default:()=>{return 'multi'}
        },
        allcustomizeSelectable:{//是否可选 默认为可选
          type:Boolean,
          default:()=>{return true}
        },
        allcustomizeHover:{//是否有选中动画 默认有选中动画
          type:Boolean,
          default:()=>{return true}
        },
        allcustomizeIsBusy:{
          type:Boolean,
          default:()=>{return false}
        },
        allperPage: 5,//每页的个数
        allpageOptions: [5, 10, 15],//每页可选页数
        allcurrentPage:1,
        alltotal:1,
        allsortBy: null,
        allsortDesc: false,
        allsortDirection: 'asc',
        allfilter: null,


        commonDrugsItems:[],
        commonFields:[
          {key: 'drugs.drugsCode', label: '药品代码', sortable: true},
          {key: 'drugs.drugsName', label:'药品名称'},
          {key: 'drugs.drugsTypeId', label:'类型'},
        ],

        alldrugsItems:[],
        alldrugsFields:[
          {key: 'drugsCode', label: '药品代码', sortable: true},
          {key: 'drugsName', label:'药品名称'},
          {key: 'drugsTypeId', label:'类型'},
        ]
      }
    },
    methods:{
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.total = filteredItems.length;
        this.currentPage = 1;
      },
      //all
      allonFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.alltotal = filteredItems.length;
        this.allcurrentPage = 1;
      },
      addDrugs:function () {
        this.$bvModal.show("allDrugsModal");
      }
    },
    mounted:function(){//挂载之后才开始填充数据

      //获取常用
      let url = '/tech/getCommonUsedDrugs';
      let data = {doctorId:this.doctorId};
      this.$get(url, data).then(res=>{
        if (res.status == "OK"){
          this.commonDrugsItems = res.data;
          this.total = this.commonDrugsItems.length;
          console.log("这是常用");
          console.log(this.commonDrugsItems);
        }
        else {
          alert("url报错");
        }
      });


      let url1 = '/tech/getAllDrugs';
      this.$get(url1).then(res=>{
        if (res.status == "OK"){
          console.log(res.data);
          this.alltotal = res.data.length;
          this.alldrugsItems = res.data;
        }
        else {
          alert("url1报错");
        }
      });
      console.log("await this.getCommonlyUsedList");
    },
  }
</script>
