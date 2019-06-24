<template>
  <b-modal id="editModal">
    <template slot="modal-header">
      <h5>编辑{{edit_name}}</h5>
    </template>
    <b-form validated novalidate>
      <b-form-group label-for=field.index label="Non-required input" v-for="field in edit_fields" :key="field.index">
        <b-form-input type="text" class="form-control-success" id=field.index v-model="this.items"></b-form-input>
        <b-form-valid-feedback>
          Input is not required.
        </b-form-valid-feedback>
      </b-form-group>
<!--      <b-form-group label-for="inputSuccess" label="Non-required input">-->
<!--        <b-form-input type="text" class="form-control-success" id="inputSuccess"></b-form-input>-->
<!--        <b-form-valid-feedback>-->
<!--          Input is not required.-->
<!--        </b-form-valid-feedback>-->
<!--      </b-form-group>-->
<!--      <b-form-group label-for="inputError" label="Required input">-->
<!--        <b-form-input type="text" class="form-control-warning" id="inputError" required></b-form-input>-->
<!--        <b-form-valid-feedback>-->
<!--          Input provided.-->
<!--        </b-form-valid-feedback>-->
<!--        <b-form-invalid-feedback>-->
<!--          Please provide a required input.-->
<!--        </b-form-invalid-feedback>-->
<!--      </b-form-group>-->
    </b-form>
  </b-modal>
</template>

<script>
    export default {
        name: "basicModal",
        props: {
          //编辑项目名称 比如科室
          edit_name: {
            type: String,
            default: '项目'
          },
          //编辑项目属性
          edit_fields: {
            type: [Array, Object],
            default: () => []
          },
          edit_items: {
            type: [Array, Object],
            default: () => []
          }
        },
      data: () => {
        return {

        }
      },
      computed: {
          items:{
            get(){
              return this.edit_items;
            },
            set(newValue){
              this.edit_items = newValue;
            }
          }
      }
    }
</script>

<style scoped>

</style>
