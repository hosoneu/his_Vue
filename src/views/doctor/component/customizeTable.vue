<template>
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
      :selectable="customizeSelectable"
      :select-mode="customizeSelectMode"
      show-empty
      :hover="customizeHover"
      stacked="md"
      :aria-busy="customizeIsBusy"
      :items="customizeItems"
      :fields="customizeFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      @row-clicked="selectItem">
    </b-table>
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
</template>

<script>
    export default {
      name: "customizeTable",
      props:{
        customizeFields:{//数据域（表头）
          type:Array,
          default:()=>{return []}
        },
        customizeItems:{//数据项
          type:Array,
          default:()=>{return []}
        },
        customizeSelectMode:{//单选/多选 默认为单选
          type:String,
          default:()=>{return 'single'}
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
        }
      },
      data(){
          return{
            perPage: 5,//每页的个数
            pageOptions: [5, 10, 15],//每页可选页数
            currentPage:1,
            total:1,
            sortBy: null,
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
          }
      },
      mounted: function () {
        this.total = this.customizeItems.length;
      },
      methods:{
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total = filteredItems.length;
          this.currentPage = 1;
        },
        selectItem(item){//选中某项
          this.$emit("selectItem",item[0]);
        },
      },

    }
</script>

<style scoped>

</style>
