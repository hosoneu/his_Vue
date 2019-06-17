<template>
        <b-card header="患者列表">
          <b-table :items="initialItems" :fields="tableFields" :busy="isBusy">
            <template slot="status" slot-scope="data">
              <b-badge :variant="data.item.status">{{data.item.status}}</b-badge>
            </template>
            <template slot="选择" slot-scope="row">
              <b-button variant="outline-primary" size="sm" @click="selectUser(row.index)" class="mr-2">
                选择
              </b-button>
            </template>
          </b-table>
        </b-card>
</template>
<script>
    export default {
      props:['initialFields', 'initialItems','isBusy'],
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
