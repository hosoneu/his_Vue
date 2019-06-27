<template>
  <b-modal id="basicModal">
    <template slot="modal-header">
      <h5>编辑{{edit_name}}</h5>
    </template>
    <b-form novalidate>
      <b-form-group v-for="field in text_fields" :key="field.key" :label-for="field.label" :label="field.label">
        <b-form-input type="text" class="form-control-success" :id="field.label" v-model="selected_items[field.key]"></b-form-input>
      </b-form-group>
      <b-form-group
        v-for="field in select_fields"
        :key="field.key"
        :label="field.label"
        :label-for="field.label"
        :label-cols="3"
        :horizontal="true">
        <b-form-select :id="field.label"
                       :plain="true"
                       v-model="selected_items[field.key]"
                       :options="field.options"
                        >
        </b-form-select>
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
                       v-model="selected_items[field.key]"
                       @load-data="this.getList(field)"
        >
          <!--options 默认有text value分别代表文本 和 值-->
          <option v-for="choice in this.options(field)" :value="choice[field.key]" :text="choice[field.to]" :key="choice[field.key]">
          </option>
        </b-form-select>
      </b-form-group>
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
        name: "departmentModal",
        props: {
          //编辑项目名称 比如科室
          edit_name: {
            type: String,
            default: '项目'
          },
          selected_items: {
            type: Object,
            default: () => {},
            validator: function (value) {
              if (value == {} || !value){
                console.log("验证为空");
                return {};
              }
              else{
                console.log("验证不为空");
                return value;
              }
            }
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
          list: {},
        }
      },
      computed: {
        options(field){return this.list[field.to]},
      },
      methods:{
        getList(field){
          //挂载时，对话框中所有下拉框请求列表
          //请求api全部由父组件的父组件Info结尾的主界面传递而来
          console.log("请求列表");
          // for(var i=0; i < this.multi_fields.length; i++){
          //   this.$get('http://localhost:8080/hoso/' + this.multi_fields[i].listApi).then((res)=> {
          //     alert(res.status);
          //     console.log(res.data);
          //     if(res.status === 'OK'){
          //       this.list.push(res.data);
          //       console.log(this.list);
          //     }else{
          //       console.log("加载失败");
          //     }
          //   })
          // }
          this.$get('http://localhost:8080/hoso/' + field.listApi).then((res)=> {
            console.log(res.data);
            if(res.status === 'OK'){
              this.list[field.to] = res.data;
              console.log(this.list);
            }else{
              console.log("加载失败");
            }
          })
        },
      },
      mounted() {
          //挂载时触发事件，使得列表读取数据
          //至于为什么要这样做，如果
          this.$emit('load-data');
      }
    }
</script>

<style scoped>

</style>
