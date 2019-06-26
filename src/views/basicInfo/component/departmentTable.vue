<template>
  <b-card :header="caption">
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false">Asc</option> <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="9" class="my-1"></b-col>
      <b-col>
        <b-button variant="success" class="btn-pill" @click="insertList" v-b-modal="'departmentModal'">添加</b-button>
      </b-col>
      <b-col>
        <b-button variant="danger" class="btn-pill" @click="deleteList">删除</b-button>
      </b-col>
      <b-col md="1" class="my-1">
        <b-button variant="info" class="btn-pill" @click="updateList" v-b-modal="'departmentModal'">编辑</b-button>
      </b-col>
    </b-row>
    <b-table selectable select-mode="single" @row-selected="selectItem" show-empty :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" :busy="isBusy" responsive="sm" :items="items" :fields="captions" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered"
             :current-page="currentPage" :per-page="perPage">
<!--      <template slot="departmentType" slot-scope="data">-->
<!--        {{convertType(data.item, currentPage)}}-->
<!--      </template>-->
<!--      <template slot="删除" slot-scope="row">-->
<!--        <b-button variant="danger" class="btn-pill" @click="deleteList(row.index, row.item)">删除</b-button>-->
<!--      </template>-->
<!--      <template slot="编辑" slot-scope="row">-->
<!--        <b-button variant="info" class="btn-pill" @click="updateList(row.item)" v-b-modal="'departmentModal'">编辑</b-button>-->
<!--      </template>-->
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons></b-pagination>
    </nav>
    <DepartmentModal :edit_name="itemType" :selected_items="this.selected_items" :text_fields="textFields" :select_fields="selectFields" :multi_fields="multiFields">
      <template slot="submit" slot-scope="">
        <b-button variant="success" class="btn-pill" @click="testSlot">提交</b-button>
      </template>
      <template slot="reset" slot-scope="">
        <b-button variant="warning" class="btn-pill" @click="testSlot">重置</b-button>
      </template>
      <template slot="cancel" slot-scope="">
        <b-button variant="danger" class="btn-pill" @click="testSlot">取消</b-button>
      </template>
    </DepartmentModal>
  </b-card>
</template>

<script>
  import DepartmentModal from "./departmentModal";
  export default {
    name: "departmentTable",
    components: {DepartmentModal},
    inheritAttrs: false,
    props: {
      caption: {
        type: String,
        default: 'Table'
      },
      hover: {
        type: Boolean,
        default: true
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      },
      isBusy: {
        type: Boolean,
        default: false
      },
      tableData: {
        type: [Array, Function],
        default: () => []
      },
      textFields: {
        type: [Array, Object],
        default: () => []
      },
      selectFields: {
        type: [Array, Object],
        default: () => []
      },
      multiFields: {
        type: [Array, Object],
        default: () => []
      },
      perPage: {
        type: Number,
        default: 10
      },
      dark: {
        type: Boolean,
        default: false
      },
      itemType: {
        type:String,
        default: ""
      }
    },
    data: () => {
      return {
        currentPage: 1,
        sortBy: null,
        sortDesc: false,
        filter: null,
        selected_items: {}
      }
    },
    computed: {
      items: function() {
        const items =  this.tableData;
        return Array.isArray(items) ? items : items()
      },
      totalRows: function () { return this.getRowCount() },
      captions: function() { return this.textFields.concat(this.selectFields, this.multiFields) },
      sortOptions() {
        // Create an options list from our fields
        return this.captions
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : status === 'Inactive' ? 'secondary'
            : status === 'Pending' ? 'warning'
              : status === 'Banned' ? 'danger' : 'primary'
      },
      getRowCount: function () {
        return this.items.length
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1
      },
      convertType(item, key){
        console.log("转换的是" + key);
        const map = {departmentType: {1: '临床', 2: '医技', 3: '财务', 4: '行政', 5: '其他'}};
        return map.departmentType[item.departmentType];
      },
      selectItem(item){
        console.log("已选择" + item[0].fmedicalItemsName);
        this.selected_items = item[0];
      },
      deleteList(){
        alert("删除按钮");
        // this.$emit('deleteList', this.selected_items);
      },
      updateList(){
        alert("更新按钮");
        // this.$emit('updateList', this.selected_items);
      },
      insertList(){
        this.selected_items={departmentCode: "", departmentName: "", departmentType: "", departmentCategory: ""};
        alert(this.selected_items);
      },
      testSlot(){
        console.log("TestSlot 成功！");
      }
    }
  }
</script>

<style scoped>

</style>
