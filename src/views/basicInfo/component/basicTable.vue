<template>
  <b-card :header="caption">
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="2" label="查询" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="请输入..."></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">清空</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="2" label="排序" class="mb-0">
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
      <b-col md="9" class="my-1"></b-col>
      <b-col md="1" class="my-1">
        <b-button variant="success" @click="insertList">添加</b-button>
      </b-col>
      <b-col md="1" class="my-1">
        <b-button variant="danger" @click="deleteList">删除</b-button>
      </b-col>
      <b-col md="1" class="my-1">
        <b-button variant="info" @click="updateList">编辑</b-button>
      </b-col>
    </b-row>
    <b-table selectable select-mode="single" @row-selected="selectItem" show-empty :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" :busy="isBusy" responsive="sm" :items="items" :fields="captions" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered"
             :current-page="currentPage" :per-page="perPage">
      <template :slot="selectField.key" slot-scope="data" v-for="selectField in selectFields">
        {{convertType(data.item, selectField)}}
      </template>
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>


    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons></b-pagination>
    </nav>
    <BasicModal :usedData="usedData" :edit_name="itemType" :selected_items="this.selected_items" :text_fields="textFields" :select_fields="selectFields" :multi_fields="multiFields">
      <template slot="submit" slot-scope="">
        <b-button variant="success" class="btn-pill" @click="submit">提交</b-button>
      </template>
      <template slot="reset" slot-scope="">
        <b-button variant="warning" class="btn-pill" @click="reset">重置</b-button>
      </template>
      <template slot="cancel">
        <b-button variant="danger" class="btn-pill" @click="cancel">取消</b-button>
      </template>
    </BasicModal>
  </b-card>
</template>

<script>
  import BasicModal from "./basicModal";
  export default {
    name: "basicTable",
    components: {BasicModal},
    inheritAttrs: false,
    props: {
      caption: {
        type: String,
        default: 'Table'
      },
      hover: {
        type: Boolean,
        default: true
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
      textFields: {
        type: [Array, Object],
        default: () => []
      },
      selectFields: {
        type: [Array, Object],
        default: () => []
      },
      multiFields: {
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
      itemType: {
        type:String,
        default: ""
      },
      usedData: {
        type: Object,
        default: () =>{},
      },
    },
    data: () => {
      return {
        currentPage: 1,
        sortBy: null,
        sortDesc: false,
        filter: null,
        selected_items: {},
        reserve_items: {},
        modal_status: "",
      }
    },
    computed: {
      items: function() {
        const items =  this.tableData;
        return Array.isArray(items) ? items : items()
      },
      totalRows: function () { return this.getRowCount() },
      captions: function() { return this.textFields.concat(this.selectFields, this.multiFields) },
      sortOptions() {
        // Create an options list from our fields
        return this.captions
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted(){
      // console.log("table处输出开始");
      // console.log(this.usedData);
      // console.log(this.usedData.department);
      // console.log(this.usedData.amount);
      // console.log("table处输出结束");
    },
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : status === 'Inactive' ? 'secondary'
            : status === 'Pending' ? 'warning'
              : status === 'Banned' ? 'danger' : 'primary'
      },
      getRowCount: function () {
        return this.items.length
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1
      },
      convertType(item, field){
        //将选择性属性 从数值value转换为对应文字
        console.log("转换的是" + field.label);
        let value = item[field.key];
        let ds = field.options.filter(option => {if(option.value == value) return true;});
        if(ds.length > 0) return ds[0].text;
        else return "未知";

        //forEach方法 不知道为什么行不通，明明相等却无法进入if内部
        // field.options.forEach(function (option) {
        //   if (option["value"] === value) {
        //     return option.text;
        //   }
        // })

        //只适用于 从1开始的options
        // return field.options[value-1].text;
      },
      convertFromId(item, field){
        //将根据ID选择的属性，把ID转换为对应属性，并以此属性为列名显示
        console.log(field.key + "请求转换" + item[field.key]);
        this.$get('' + field.api, {id: item[field.key]}).then((res)=> {
          // console.log(res.data);
          if(res.status === 'OK'){
            console.log(res.data[field.to]);
            return res.data[field.to];
          }else{
            console.log("加载失败");
          }
        })
      },
      selectItem(items){
        if (items.length > 0){
          this.selected_items = JSON.parse(JSON.stringify(items[0]));
          // this.selected_items = JSON.parse(JSON.stringify(items));
          this.reserve_items = JSON.parse(JSON.stringify(items[0]));
        }
        else {
          this.selected_items = {};
        }
      },
      deleteList(){
        // alert("删除按钮");
        if (JSON.stringify(this.selected_items) === "{}"){
          alert("您还未选择希望删除的条目！");
        }
        else{
          this.$emit('deleteList', this.selected_items);
        }
      },
      updateList(){
        // alert("更新按钮");
        if (JSON.stringify(this.selected_items) === "{}"){
            alert("您还未选择希望编辑的条目！");
        }
        else {
          // alert("您已选择更新");
          this.modal_status = "update";
          this.$bvModal.show('basicModal');
        }
      },
      insertList(){
        //重置 选择项 回归默认状态
        this.selected_items = {};
        //重置时，将各个框置为空
        this.reserve_items = {};
        //添加时，为了清空弹窗中输入框的值，且将其对应到属性上去，需要将selected_items赋值为所有属性存在但为空的状态。
        //相当于this.selected_items = {departmentName: '',departmentCode: ''};
        //this赋给变量 防止foreach中的this与vue实例的this冲突
        var that = this;
        this.textFields.forEach(function (field) {
          that.selected_items[field.key] = '';
        });
        this.selectFields.forEach(function (field) {
          that.selected_items[field.key] = '';
        });
        this.multiFields.forEach(function (field) {
          that.selected_items[field.key] = '';
        });
        this.modal_status = "insert";
        this.$bvModal.show('basicModal');
      },
      submit(){
        if (this.modal_status === "insert"){
          this.$emit('insertList', this.selected_items);
          this.$bvModal.hide('basicModal');
          this.selected_items = {};
        }
        else if (this.modal_status === "update"){
          this.$emit('updateList', this.selected_items);
          this.$bvModal.hide('basicModal');
          this.selected_items = {};
        }
        else{
          alert("模态框状态发生错误！");
          this.$bvModal.hide('basicModal');
          this.selected_items = {};
        }
      },
      reset(){
        //利用预留字段 保留最初的值,并通过深拷贝赋值，直接赋值的话，两者引用同一对象，无法多次重置。
        this.selected_items = JSON.parse(JSON.stringify(this.reserve_items));
      },
      cancel(){
        this.$bvModal.hide('basicModal');
        // this.selected_items = {};
      },
    }
  }
</script>

<style scoped>

</style>
