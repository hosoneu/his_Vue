<template>
        <b-card header="患者列表">
          <b-table id='user-table' :items="initialItems" :fields="tableFields" :busy="isBusy" :per-page="perPage"
                   :current-page="currentPage">
            <template slot="status" slot-scope="data">
              <b-badge :variant="data.item.status">{{data.item.status}}</b-badge>
            </template>
            <template slot="选择" slot-scope="row">
              <b-button variant="outline-primary" size="sm" @click="selectUser(row.index)" class="mr-2">
                选择
              </b-button>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="user-table"
          ></b-pagination>
        </b-card>
</template>
<script>
    export default {
      props:['initialFields', 'initialItems','isBusy','perPage','currentPage'],
      data() {
        return {
          innerFields: ['选择'],
        }
      },
      computed: {
          tableFields :function(){
            return this.initialFields.concat(this.innerFields);
          }
      },
      methods:{
        selectUser (key) {
          console.log(key);
          this.$emit('select_user', key)
        }
      }
    }
</script>

<style scoped>

</style>
