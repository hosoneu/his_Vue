<template>
  <b-modal id="drugsModal" data-backdrop="static">
    <template slot="modal-header">
      <h5>编辑{{edit_name}}</h5>
    </template>
    <b-form novalidate>
      <b-form-group v-for="field in text_fields" :key="field.key" :label-for="field.label" :label="field.label">
        <b-form-input type="text" class="form-control-success" :id="field.label" v-model="selected_items[field.key]"></b-form-input>
      </b-form-group>

      <b-form-group
        v-for="field in multi_fields"
        :key="field.key"
        :label="field.label"
        :label-for="field.label"
        :label-cols="3"
        :horizontal="true">
        <b-form-select :id="field.label"
                       :plain="true"
                       v-model="selected_items[field.from]"
        >
          <!--options 默认有text value分别代表文本 和 值-->
          <option v-for="choice in options[field.table]" :value="choice.constantItemsId" :label="choice[field.to]" :key="choice.constantItemsId">
          </option>
        </b-form-select>
      </b-form-group>

<!--      <b-form-group-->
<!--        v-for="field in multi_fields"-->
<!--        :key="field.key"-->
<!--        :label="field.label"-->
<!--        :label-for="field.label"-->
<!--        :label-cols="3"-->
<!--        :horizontal="true">-->
<!--        <b-form-select :id="field.label"-->
<!--                       :plain="true"-->
<!--                       v-model="selected_items[field.from]"-->
<!--        >-->
<!--          &lt;!&ndash;options 默认有text value分别代表文本 和 值&ndash;&gt;-->
<!--          <option v-for="choice in options[field.table]" :value="choice[field.from]" :label="choice[field.to]" :key="choice[field.from]">-->
<!--          </option>-->
<!--        </b-form-select>-->
<!--      </b-form-group>-->
    </b-form>

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
        name: "drugsModal",
        props: {
          //编辑项目名称 比如科室
          edit_name: {
            type: String,
            default: '项目'
          },
          selected_items: {
            type: Object,
            default: () => {},
            // validator: function (value) {
            //   if (JSON.stringify(value) === "{}" || !value){
            //     console.log("验证为空");
                //返回携带各属性的空对象
                // return {};
                // return {"drugsCode": '', "drugsName": '', "drugsFormat": '', "drugsPrice": '', "drugsManufacturer": '', "drugsDosage": '', "drugsType": ''};
              // }
              // else{
              //   console.log("验证不为空");
              //   return value;
              // }
            // }
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
          },
          usedData: {
            type: Object,
            default: () =>{},
          },
        },
        data: () => {
          return {
            list: {},
            options: {},
          }
        },
        computed: {
          pageData:function () {
            return this.usedData;
          }
        },
        methods:{
          getList(field){
            //更新时，对话框中所有下拉框请求列表
            this.options[field.table] = this.pageData[field.table];
          },
        },
        beforeUpdate: async function(){
          for (let i = 0; i < this.multi_fields.length; i++){
            await this.getList(this.multi_fields[i]);
          }
        }
    }
</script>

<style scoped>

</style>
