<template>
  <b-card :header="caption">
    <b-row>
      <b-col md="12" class="my-1">
        <b-form-group label-cols-sm="1" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="my-1">
        <b-form-group label-cols-sm="1" label="Sort" class="mb-0">
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
    <b-table selectable select-mode="single" @row-clicked="selectItem" show-empty :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" :busy="isBusy" responsive="sm" :items="items" :fields="captions" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
      <template slot="registrationStatus" slot-scope="row">
        {{getType(row.item)}}
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons></b-pagination>
    </nav>
  </b-card>
</template>

<script>
    export default {
        name: "ChargeTable",
        props:{
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
          expenseItemsListForPatient:{
            type: [Array, Object],
            default: () => []
          },
        },
    }
</script>

<style scoped>

</style>
