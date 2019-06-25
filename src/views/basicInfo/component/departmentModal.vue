<template>
  <b-modal id="departmentModal">
    <template slot="modal-header">
      <h5>编辑{{edit_name}}</h5>
    </template>
    <b-form validated novalidate>
      <b-form-group label-for="科室编码" label="科室编码">
        <b-form-input type="text" class="form-control-success" id="科室编码" v-model="selected_items.departmentCode"></b-form-input>
        <b-form-valid-feedback>
          Input is not required.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group label-for="科室名称" label="科室名称">
        <b-form-input type="text" class="form-control-success" id="科室名称" v-model="selected_items.departmentName"></b-form-input>
        <b-form-valid-feedback>
          Input is not required.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group label-for="科室分类" label="科室分类">
        <b-form-input type="text" class="form-control-success" id="科室分类" v-model="selected_items.departmentType"></b-form-input>
        <b-form-valid-feedback>
          Input is not required.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group label-for="科室类别" label="科室类别">
        <b-form-input type="text" class="form-control-success" id="科室类别" v-model="selected_items.departmentCategory"></b-form-input>
        <b-form-valid-feedback>
          Input is not required.
        </b-form-valid-feedback>
      </b-form-group>
      //成功按钮 提交添加或编辑 判断是否变化
    </b-form>
    <template slot="modal-footer">
      <b-button variant="success" class="btn-pill" @click="ok()">提交</b-button>
      <b-button variant="danger" class="btn-pill" @click="cancel()">取消</b-button>
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
      }
    }
</script>

<style scoped>

</style>
