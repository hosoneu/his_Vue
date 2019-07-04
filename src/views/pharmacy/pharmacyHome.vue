<template>
  <div class="animated fadeIn">
<!--    <b-row>-->
<!--      <b-col lg="12">-->
<!--        <patient-info :initial-user="selected_items" ></patient-info>-->
<!--      </b-col>-->
<!--    </b-row>-->
    <b-row>
      <b-col lg="12">
        <patient-info :initial-user="selected_items" ></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3">
        <b-row lg="2">
          <b-col lg="12">
<!-- 发药检索-->
            <b-card header="发药检索">
              <div slot="header">
                发药检索
                <div class="card-header-actions">
                  <b-button-group class="pull-right">
                    <b-button size="sm" class="d-sm-down-none" variant="secondary"><i class="fa fa-search"></i> 搜索</b-button>
                    <b-button size="sm" class="d-sm-down-none" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                  </b-button-group>
                </div>
              </div>
              <b-form-group
                label="发药药房"
                label-for="pharmacySelect"
                :label-cols="3"
                :horizontal="true">
                <b-form-select id="pharmacySelect"
                               size="lg"
                               :plain="true"
                               :options="['Please select','盛京医院药房', '沈阳医大一院药房', '陆军总院药房']"
                               value="Please select">
                </b-form-select>
              </b-form-group>
                  <b-form-group
                    label="病历发票号"
                    label-for="mediInvoice"
                    :label-cols="3"
                    :horizontal="true">
                    <b-form-input id="mediInvoice" type="text" autocomplete="name"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="收费日期"
                    label-for="date"
                    :label-cols="3"
                    :horizontal="true">
                    <b-form-input type="date" id="date"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-for="mediState"
                    :label-cols="2"
                    :horizontal="true">
                    <b-form-radio-group id="mediState"
                                        :plain="falses"
                                        :options="[
                    {text: '未发 ',value: '1'},
                    {text: '已发 ',value: '2'},
                    {text: '已退 ',value: '3'}
              ]"
                                    :checked="1">

                    </b-form-radio-group>
                </b-form-group>
            </b-card>
<!-- 发药列表  -->
            <patient-table
              @select_user="selectUser"
              :initial-fields="fields"
              :per-page="4"
              :tabs="tabs"
            ></patient-table>

          </b-col>
        </b-row>

      </b-col>

<!--门诊发药单-->
      <b-col lg="9">
        <b-row lg="12">
          <b-col lg="12">
            <b-card header="门诊发药单">
              <div slot="header">
                门诊发药单
                <div class="card-header-actions">
                  <b-button-group class="pull-right">
                    <b-button size="sm" variant="success"><i class="fa fa-print"></i> 自动打印</b-button>
                    <b-dropdown id="ddown2" text="发药" size="sm" variant="info" class="3">
                      <b-dropdown-item>发药</b-dropdown-item>
                      <b-dropdown-item>退药</b-dropdown-item>
                    </b-dropdown>
                    <b-button size="sm" class="d-sm-down-none" variant="secondary"><i class="fa fa-file"></i> 发药打印单</b-button>
                    <b-button size="sm" class="d-sm-down-none" variant="dark"><i class="fa fa-print"></i> 处方打印</b-button>
                  </b-button-group>
                </div>
              </div>
              <tr>
                <td><span class="h1">门诊发药单</span></td>
                <td><span class="h3">（未打印）</span></td>
              </tr>
            </b-card>
<!--发药明细信息-->
            <b-card header="发药明细信息">
              <div slot="header">
                发药明细信息
                <div class="card-header-actions">

                </div>
              </div>

<!--              <dispensing-table>-->
<!--                @select_drug="selectDrug"-->
<!--                :initial-fields="fields"-->
<!--                :per-page="6"-->
<!--              </dispensing-table>-->
<!--              getExample(){-->
<!--              let url="/dispening/abc";//路由-->
<!--              let para = {};//参数-->
<!--              para.medicalId = 1;//设置参数-->
<!--              this.$get(url,para).then(res=>{//get请求格式(固定格式) res为后台返回的结果-->
<!--              if(res.state === 'OK'){-->
<!--              console.log(res.data);-->
<!--              }else{-->
<!--              console.log("未知错误");-->
<!--              }-->
<!--              });-->
<!--              }-->
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import dispensingTable from "../../views/pharmacy/component/dispensingTable";
  import patientTable from "../../views/pharmacy/component/patientTable";
  export default {
    name: "pharmacyHome",
    components: {patientTable,dispensingTable},
    data: () => {
      return {

        fields: [
          {key: 'Medical_record_IDs', label: '病历号'},
          {key: 'user_name', label: '姓名'},
          {key: 'invoice_ID', label: '发票号'},
          {key: 'status', label: '开药状态'}
        ],
        // fields:[
        //   {key: 'Prescription_IDs', label:'处方号', sortable:true},
        //   {key: 'Doctor', label:'开单医生',sortable:true},
        //
        // ]
        selected_items: {status: "secondary", sex: "未选择", id: '未选择', user_name: '未选择', pay_way: '未选择'},
      }
    },
    methods: {
      selectUser(user) {
        this.selected_items = JSON.parse(JSON.stringify(user));
      },
    }
  }
</script>

<style scoped>

</style>
