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
      <b-col md="11" class="my-1"></b-col>
      <b-col md="1" class="my-1">
        <b-button variant="success" class="btn-pill" @click="insertList" v-b-modal="'departmentModal'">添加</b-button>
      </b-col>
    </b-row>
    <b-table show-empty :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" :busy="isBusy" responsive="sm" :items="items" :fields="captions" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
      <template slot="departmentType" slot-scope="row">
        {{getType(row.item)}}
      </template>
      <template slot="删除" slot-scope="row">
        <b-button variant="danger" class="btn-pill" @click="deleteList(row.index, row.item)">删除</b-button>
      </template>
      <template slot="编辑" slot-scope="row">
        <b-button variant="info" class="btn-pill" @click="updateList(row.item)" v-b-modal="'departmentModal'">编辑</b-button>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
    <DepartmentModal :edit_name="itemType" :selected_items="this.selected_items"></DepartmentModal>
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
        default: false
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
      initialFields: {
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
      captions: function() { return this.initialFields },
      sortOptions() {
        // Create an options list from our fields
        return this.initialFields
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
      getType(item){
        const map = {boolean: {1: '临床', 2: '医技', 3: '财务', 4: '行政', 5: '其他'}};
        return map.boolean[item.departmentType];
      },
      deleteList(index, item){
        alert(index);
        this.$emit('deleteList', index, item);
      },
      updateList(item){
        alert(item);
        console.log(item);
        this.selected_items=item;
        // this.$emit('updateList', item);
      },
      insertList(){
        this.selected_items={departmentCode: "", departmentName: "", departmentType: "", departmentCategory: ""};
        alert(this.selected_items);
      }
    }
  }
</script>

<style scoped>

</style>
