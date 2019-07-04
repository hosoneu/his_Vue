<template>
  <b-modal id="refundModal">
    <template slot="modal-header">
      <h5>退费</h5>
    </template>
    <b-form>
      <b-row>
        <b-col md="2"></b-col>
        <b-col md="8">
          <b-form-group label-for="totalCost" label="应退金额">
            <b-form-input id="totalCost" type="text" class="form-control-success" :value="totalCost" disabled></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!--成功按钮 提交添加或编辑 判断是否变化-->
    <template slot="modal-footer">
      <b-button variant="success" class="btn-pill" @click="refund">提交</b-button>
      <b-button variant="danger" class="btn-pill" @click="cancel">取消</b-button>
    </template>
  </b-modal>
</template>

<script>
    export default {
        name: "refundModal",
        props: {
          totalCost: {
            type: Number,
            default: 0,
          },
        },
        data: () => {
          return {
          }
        },
        methods: {
          refund(){
            this.$bvModal.hide('refundModal');
            this.$emit('refund');
          },
          cancel(){
            this.$bvModal.hide('refundModal');
          },
        }
    }
</script>

<style scoped>

</style>
