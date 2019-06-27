<template>
  <div>

    <b-row>
      <b-col lg="4">
        <b-form-input v-model="filter" placeholder="请输入关键字" ></b-form-input>
      </b-col>
    </b-row>
    <b-row>
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
    {{ selected }}
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'userTable',
    watch:{
      'items':'CaltotalRows',
    },
    data() {
      return {
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        fields:[{ key: 'userId',label:'工作编号', sortable: true },
          { key: 'userName',label:'职员姓名', sortable: true },],
        items: [],
        selected: []
      }
    },
    mounted() {
      this.CaltotalRows();
      this.findNotCalUsers();
      // Set the initial number of items
    },
    methods: {
      findNotCalUsers(){
        axios.post("http://localhost:8080/hoso/dayCalculate/findNotCalUsers").then(function(result) {
          // result是所有的返回回来的数据
          // 包括了响应报文行
          // 响应报文头
          // 响应报文体
          this.items=result.data.data;
        }.bind(this));
      },
      CaltotalRows(){
        this.totalRows = this.items.length;
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      rowSelected(items) {
        this.selected = items
      }
    }
  }
</script>

<style scoped>

</style>
