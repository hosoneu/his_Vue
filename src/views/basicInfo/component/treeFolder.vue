<template>
  <vue-tree
    v-model="checkedIds"
    :tree-data="treeData"
    :options="options"
  />
</template>

<script>
    import Tree from './tree.json';
    export default {
        name: "treeFolder",
        data () {
          return {
            checkedIds: [],
            treeData: Tree.data,
            options: {}
          }
        }
    }
</script>

<style scoped>

</style>
