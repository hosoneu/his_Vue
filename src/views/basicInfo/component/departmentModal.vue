<template>
  <b-modal id="departmentModal">
    <template slot="modal-header">
      <h5>编辑{{edit_name}}</h5>
    </template>
    <b-form validated novalidate>
      <b-form-group v-for="(index, field) in text_fields" :key="index" :label-for=field.label :label=field.label>
        <b-form-input type="text" class="form-control-success" :id=field.label v-model="selected_items[field.key]"></b-form-input>
        <b-form-valid-feedback>
          Input is not required.
        </b-form-valid-feedback>
      </b-form-group>
    </b-form>
<!--    <b-form validated novalidate>-->
<!--      <b-form-group :label-for=edit_fields[0].label :label=edit_fields[0].label>-->
<!--        <b-form-input type="text" class="form-control-success" :id=edit_fields[0].label v-model="selected_items[edit_fields[0].key]"></b-form-input>-->
<!--        <b-form-valid-feedback>-->
<!--          Input is not required.-->
<!--        </b-form-valid-feedback>-->
<!--      </b-form-group>-->
<!--      <b-form-group :label-for=edit_fields[1].label :label=edit_fields[1].label>-->
<!--        <b-form-input type="text" class="form-control-success" :id=edit_fields[1].label v-model="selected_items.departmentName"></b-form-input>-->
<!--        <b-form-valid-feedback>-->
<!--          Input is not required.-->
<!--        </b-form-valid-feedback>-->
<!--      </b-form-group>-->
<!--      <b-form-group label-for="科室分类" label="科室分类">-->
<!--        <b-form-input type="text" class="form-control-success" id="科室分类" v-model="selected_items.departmentType"></b-form-input>-->
<!--        <b-form-valid-feedback>-->
<!--          Input is not required.-->
<!--        </b-form-valid-feedback>-->
<!--      </b-form-group>-->
<!--      <b-form-group label-for="科室类别" label="科室类别">-->
<!--        <b-form-input type="text" class="form-control-success" id="科室类别" v-model="selected_items.departmentCategory"></b-form-input>-->
<!--        <b-form-valid-feedback>-->
<!--          Input is not required.-->
<!--        </b-form-valid-feedback>-->
<!--      </b-form-group>-->
<!--    </b-form>-->
    <!--成功按钮 提交添加或编辑 判断是否变化-->
    <template slot="modal-footer">
      <slot name="submit"></slot>
      <slot name="reset"></slot>
      <slot name="cancel"></slot>
    </template>
  </b-modal>
</template>

<script>
    export default {
        name: "departmentModal",
        props: {
          //编辑项目名称 比如科室
          edit_name: {
            type: String,
            default: '项目'
          },
          selected_items: {
            type: Object,
            default: () => {}
          },
          text_fields: {
            type: [Array, Object],
            default: ()=> {}
          },
          select_fields: {
            type: [Array, Object],
            default: ()=> {}
          },
          multi_fields: {
            type: [Array, Object],
            default: ()=> {}
          }
        },
      data: () => {
        return {
          // edit_item: this.selected_items,
        }
      },
      computed: {
          item:{
            get(){
              return this.edit_item;
            },
            set(newValue){
              this.edit_item = newValue;
            }
          }
      },
      methods:{
          getFieldsAmount(){
            console.log("属性数量为" + this.edit_fields.length);
            return this.edit_fields.length;
          }
      },
      mounted() {
        this.getFieldsAmount();
      }
    }
</script>

<style scoped>

</style>
