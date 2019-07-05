<template>
  <b-card :header="caption">
    <b-row>
      <b-col md="12" class="my-1">
        <b-form-group label-cols-sm="1" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="请输入..."></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">清空</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="my-1">
        <b-form-group label-cols-sm="1" class="mb-0">
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
      <b-col md="8" class="my-1"></b-col>
      <b-col md="4" class="my-1">
        <b-button variant="outline-danger" class="" @click="withdraw">退号</b-button>
      </b-col>
    </b-row>
    <b-table selectable select-mode="single" @row-selected="selectItem" show-empty :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" :busy="isBusy" responsive="sm" :items="items" :fields="captions" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
      <template slot="registrationStatus" slot-scope="row">
        {{getType(row.item)}}
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" size="sm" align="center" hide-goto-end-buttons></b-pagination>
    </nav>
  </b-card>
</template>

<script>
    export default {
        name: "registerTable",
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
          }
        },
        data: () => {
          return {
            currentPage: 1,
            sortBy: null,
            sortDesc: false,
            filter: null,
            selected_items: null,
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
            const map = {boolean: {1: '正常', 2: '退号'}};
            return map.boolean[item.registrationStatus];
          },
          selectItem(items){
            if (items.length > 0){
              this.selected_items = JSON.parse(JSON.stringify(items[0]));
              //传递患者病历号给父组件 用于chargeHome 不用于registerHome
              this.$emit('showExpenseItems', this.selected_items.medicalRecord.medicalRecordId);
            }
            else {
              this.selected_items = {};
              this.$emit('showExpenseItems', null);
            }
          },
          withdraw(){
            if (JSON.stringify(this.selected_items) === "{}"){
              alert("您还未选择希望退号的条目！");
            }
            else {
              alert("您已选择退号");
              this.$emit('withdraw', this.selected_items);
            }
          },
        }
    }
</script>

<style scoped>

</style>
