<template>
  <b-card :header="caption">
    <b-row>
      <b-col md="12" class="my-1">
        <b-form-group label-cols-sm="1" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="my-1">
        <b-form-group label-cols-sm="1" label="Sort" class="mb-0">
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
      <b-col md="10" class="my-1"></b-col>
      <b-col md="1" class="my-1">
        <b-button variant="outline-danger" class="" @click="balanceForRefund">退费</b-button>
      </b-col>
      <b-col md="1" class="my-1">
        <b-button variant="outline-success" class="" @click="balance">缴费</b-button>
      </b-col>
    </b-row>
    <b-table selectable select-mode="multi" @row-selected="selectItems" show-empty :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" :busy="isBusy" responsive="sm" :items="items" :fields="captions" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage">
      <template slot="expenseItemsName" slot-scope="row">
        {{getExpenseItemsName(row.item)}}
      </template>
      <template slot="quantity" slot-scope="row">
        {{getQuantity(row.item)}}
      </template>
      <template slot="actualQuantity" slot-scope="row">
        {{getActualQuantity(row.item)}}
      </template>
      <template slot="payStatus" slot-scope="row">
        {{getPayStatus(row.item)}}
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons></b-pagination>
    </nav>
    <RegisterModal   @register="charge" :total-cost="totalCost">
    </RegisterModal>
    <RefundModal @refund="refund" :total-cost="totalCost"></RefundModal>
  </b-card>
</template>

<script>
    import RegisterModal from "./registerModal"
    import RefundModal from "./refundModal";
    export default {
        name: "ChargeTable",
        components:{RefundModal, RegisterModal},
        props:{
          caption: {
            type: String,
            default: 'Table'
          },
          hover: {
            type: Boolean,
            default: false
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
          initialFields: {
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
          expenseItemsListForPatient:{
            type: [Array, Object],
            default: () => []
          },
        },
        data: () => {
          return {
            currentPage: 1,
            sortBy: null,
            sortDesc: false,
            filter: null,
            selected_items: [],
            selected_items_Id: [],
            totalCost: 0,
          }
        },
        computed: {
          items: function() {
            const items =  this.expenseItemsListForPatient;
            return Array.isArray(items) ? items : items()
          },
          totalRows: function () { return this.getRowCount() },
          captions: function() { return this.initialFields },
          sortOptions() {
            // Create an options list from our fields
            return this.initialFields
              .filter(f => f.sortable)
              .map(f => {
                return { text: f.label, value: f.key }
              })
          }
        },
        methods: {
          getBadge(status) {
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
          getExpenseItemsName(item) {
            if (item["drugs"] != null) {
              return item["drugs"]["drugsName"];
            } else if (item["exDrugs"] != null) {
              return item["exDrugs"]["drugsName"];
            } else if (item["fmedicalItems"] != null) {
              return item["fmedicalItems"]["fmedicalItemsName"];
            } else if (item["exFmedicalItems"] != null) {
              return item["exFmedicalItems"]["fmedicalItemsName"];
            } else {
              return "未知项目"
            }
          },
          getQuantity(item) {
            if (item["prescriptionItems"] != null) {
              return item["prescriptionItems"]["quantity"];
            } else if (item["examinationDrugsItems"] != null) {
              return item["examinationDrugsItems"]["quantity"];
            } else if (item["treatmentItems"] != null) {
              return item["treatmentItems"]["quantity"];
            } else if (item["examinationFmedicalItems"] != null) {
              return item["examinationFmedicalItems"]["quantity"];
            } else {
              return "未知数量"
            }
          },
          getActualQuantity(item) {
            if (item["prescriptionItems"] != null) {
              return item["prescriptionItems"]["actualQuantity"];
            } else if (item["examinationDrugsItems"] != null) {
              return item["examinationDrugsItems"]["actualQuantity"];
            } else if (item["treatmentItems"] != null) {
              return item["treatmentItems"]["actualQuantity"];
            } else if (item["examinationFmedicalItems"] != null) {
              return item["examinationFmedicalItems"]["actualQuantity"];
            } else {
              return "未知数量"
            }
          },
          getPayStatus(item) {
            if (item["payStatus"] === "1") {
              return "未缴费";
            } else if (item["payStatus"] === "2") {
              return "已缴费";
            } else if (item["payStatus"] === "3") {
              return "退费";
            } else if (item["payStatus"] === "4") {
              return "无效";
            } else if (item["payStatus"] === "5") {
              return "部分退费";
            } else {
              return "未知状态"
            }
          },
          selectItems(items) {
            this.selected_items = items;
          },
          checkCharge() {
            try {
              this.selected_items.forEach(function (item) {
                console.log(item.payStatus);
                if (item.payStatus !== "1") {
                  throw new Error("error");
                }
              });
            }catch (e) {
              return false;
            }
            return true;
          },
          checkRefund(){
            try {
              this.selected_items.forEach(function (item) {
                console.log(item.payStatus);
                if (item.payStatus !== "2") {
                  throw new Error("error");
                }
              });
            }catch (e) {
              return false;
            }
            return true;
          },
          balance:(async function () {
            //检查希望缴费的项目是否均为未缴费
            if (this.checkCharge()) {
              this.selected_items_Id = [];
              if (JSON.stringify(this.selected_items) === "[]") {
                alert("您还未选择希望缴费的条目！");
              } else {
                alert("您已选择缴费");
                //得到希望缴费项目的IdList
                let that = this;
                this.selected_items.forEach(function (item) {
                  that.selected_items_Id.push(item.expenseItemsId);
                });
                //计算缴费项目的总费用
                await this.getChargeCost();
                //展示支付窗口
                this.$bvModal.show('registerModal');
              }
            }
            else{
              alert("请选择缴费状态均为未缴费的项目！");
            }
          }),
          getChargeCost(){
            this.totalCost = 0;
            let that = this;
            this.selected_items.forEach(function (item) {
              that.totalCost += item.totalCost;
            });
          },
          charge(payModeId) {
            //registerModal对话框提交后触发事件 执行此方法 并从对话框处得到支付方式
            this.$post('registration/charge', {"expenseItemsIdList": this.selected_items_Id, "userId": this.$store.state.register.cashier.userId,"payModeId": payModeId}).then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                alert("缴费成功");
                //更改前端表面上的值
                this.selected_items.forEach(function (item) {
                  item.payStatus = "2";
                });
                //重新请求费用项目
                this.$emit('refresh');
              }else{
                console.log("缴费失败");
              }
            })
          },
          balanceForRefund:(async function () {
            //检查希望缴费的项目是否均为已缴费
            if (this.checkRefund()) {
              this.selected_items_Id = [];
              if (JSON.stringify(this.selected_items) === "[]") {
                alert("您还未选择希望退费的条目！");
              } else {
                alert("您已选择退费");

                //计算退费项目的总费用
                await this.getRefundCost();
                //展示支付窗口
                this.$bvModal.show('refundModal');
              }
            }
            else{
             alert("请选择缴费状态均为已缴费的项目！");
            }
          }),
          getRefundCost(){
            this.totalCost = 0;
            let that = this;
            this.selected_items.forEach(function (item) {
              that.totalCost += item.totalCost * (that.getQuantity(item) - that.getActualQuantity(item)) / that.getQuantity(item);
            });
          },
          //退费的逻辑中 牵扯到 药品的部分退费 需与退药一同考虑
          refund() {
            let replace = {expenseItemsList: this.selected_items, userId: this.$store.state.register.cashier.userId};
            //registerModal对话框提交后触发事件 执行此方法
            this.$post('registration/refund', replace).then((res)=> {
              console.log(res.data);
              if(res.status === 'OK'){
                alert("退费成功");
                this.selected_items.forEach(function (item) {
                  item.payStatus = "3";
                });
                this.$emit('refresh');
              }else{
                console.log("退费失败");
              }
            })
          },
        }
    }
</script>

<style scoped>

</style>
