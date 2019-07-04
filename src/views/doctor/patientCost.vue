<template>
  <b-row>
    <b-input-group >
      <b-form-input v-model="filter" placeholder="请输入关键字" ></b-form-input>
    </b-input-group>
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
    </b-table>
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
</template>

<script>
    export default {
        name: "patientCost",
      props: {
        fields:{
          type : Array,
          default:[{id:"id",label:"字段", sortable: true},{id:"name",label:"字段",sortable:false},{id:"sex",label:"字段",sortable:false},{id:"more",label:"字段",sortable:false}]},
        items:{
          type:Array,
          default: [{id:1,name:"I",sex:"L",more:"Y"},{id:2,name:"I",sex:"L",more:"Y"},{id:3,name:"I",sex:"L",more:"Y"},{id:4,name:"I",sex:"L",more:"Y"},{id:5,name:"I",sex:"L",more:"Y"},]
        }
      },
      data(){
          return{
            totalRows: 1,
            currentPage: 1,
            perPage: 4,
            sortBy: null,
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
        }
      },
      methods:{
          fillData(){

          },
        CaltotalRows(){
          this.totalRows = this.items.length;
        },
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length;
          this.currentPage = 1;
        }
      },
      mounted() {
          this.CaltotalRows()
      }
    }
</script>

<style scoped>

</style>
