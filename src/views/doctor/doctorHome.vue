<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <patient-info :initial-user="selected_items" ></patient-info>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="4">
        <patient-table
          @select_user="selectUser"
          :initial-fields="fields"
          :per-page="5"
          :tabs="tabs"
        ></patient-table>
      </b-col>
      <b-col lg="8">
        <b-row>
          <b-col lg="12">
          <b-card header="基本信息">
            <div slot="header">
              基本信息
              <div class="card-header-actions">
                <b-button-group class="pull-right">
                  <b-button size="sm" variant="danger"><i class="fa fa-undo"></i> 清空</b-button>
                  <b-button size="sm" class="d-sm-down-none" variant="primary"><i class="fa fa-save"></i> 暂存</b-button>
                  <b-button size="sm" class="d-sm-down-none" variant="success"><i class="fa fa-check"></i> 提交</b-button>
                </b-button-group>
              </div>
            </div>
            <b-tabs>
              <b-tab title = "病史内容">
                <b-form-group
                  description="Let us know your full name."
                  label="Enter your name"
                  label-for="basicName"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input id="basicName" type="text" autocomplete="name"></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Static"
                  label-for="basicStatic"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input plaintext id="basicStatic" type="text" value="Username"></b-form-input>
                </b-form-group>
                <b-form-group
                  description="This is a help text"
                  label="Text Input"
                  label-for="basicText"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input id="basicText" type="text" placeholder="Text"></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Date" label-for="date"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input type="date" id="date"></b-form-input>
                </b-form-group>
              </b-tab>
              <b-tab title="评估诊断">
                <b-form-group
                  description="Please enter your email"
                  label="Email Input"
                  label-for="basicEmail"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input id="basicEmail" type="email" placeholder="Enter your email" autocomplete="email"></b-form-input>
                </b-form-group>
                <b-form-group
                  description="Please enter a complex password"
                  label="Password Input"
                  label-for="basicPassword"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input id="basicPassword" type="password" placeholder="Enter your password" autocomplete="current-password"></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Disabled Input"
                  label-for="basicInputDisabled"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input id="basicInputDisabled" type="text" :disabled="true" placeholder="Disabled"></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Textarea"
                  label-for="basicTextarea"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-input id="basicTextarea" :textarea="true" :rows="9" placeholder="Content.."></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Select"
                  label-for="basicSelect"
                  :label-cols="3"
                  :horizontal="true">
                  <b-form-select id="basicSelect"
                                 :plain="true"
                                 :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                                 value="Please select">
                  </b-form-select>
                </b-form-group>
              </b-tab>
            </b-tabs>
          </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import PatientTable from "./component/patientTable";
    import PatientInfo from "./component/patientInfo";

    export default {
      name: "doctorHome",
      components: {PatientInfo, PatientTable},
      data: () => {
          return{
            tabs:[{
              title:"个人",
              getPatientApi:"getPatientList",
              countPatientApi:"countPatientList",
              getPatientParams:{},
              countPatientParams:{}
              },{
              title:"科室",
              getPatientApi:"getPatientList",
              countPatientApi:"countPatientList",
              getPatientParams:{},
              countPatientParams:{}
            }
            ],
            fields: [
              {key: 'id', label: 'id', sortable: true},
              {key: 'user_name', label: '姓名', sortable: true},
              {key: 'status', label:'状态', sortable: true},
            ],
            selected_items:{ status: "secondary", sex: "未选择", id: '未选择', user_name: '未选择', pay_way:'未选择'},
          }
      },
      methods:{
        selectUser(user){
          this.selected_items = JSON.parse(JSON.stringify(user));
        },
      }
    }
</script>

<style scoped>

</style>
