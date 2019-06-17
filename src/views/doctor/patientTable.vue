<template>
        <b-card header="患者列表">
          <b-table :items="m_items" :fields="m_fields">
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
      props:['initialFields', 'initialItems'],
      data() {
        return {
          innerFields: ['选择'],
          m_items: this.initialItems
        }
      },
      computed: {
          m_fields :function(){
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
