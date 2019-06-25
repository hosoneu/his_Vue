<template>
  <b-card>
    <div slot="header">
      挂号表单
    </div>
    <div>
      <span style="font-style: italic"><strong>患者信息</strong></span>
      <b-button class="pull-right" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
      <b-button class="pull-right" type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
    </div>
    <br/>
    <div style="background:linear-gradient(to left,#efefef,#b6b6b6);height:1px;"></div>
    <br/>

    <b-form>
      <b-row>
        <b-col md="6">
          <b-form-group
            description=""
            label="患者姓名"
            label-for="patientName"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="patientName" type="text" autocomplete="name"></b-form-input>
          </b-form-group>
          <b-form-group
            label="患者性别"
            label-for="patientGender"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              id="patientGender"
              name="customRadioInline1">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="male" name="customRadioInline1" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="male">男</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="female" name="customRadioInline1" class="custom-control-input" value="2">
                <label class="custom-control-label" for="female">女</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group
            label="患者生日" label-for="patientBirth"
            :label-cols="3"
            :horizontal="true">
            <b-form-input type="date" id="patientBirth"></b-form-input>
          </b-form-group>
          <b-form-group
            description=""
            label="患者身份证号"
            label-for="patientIdentity"
            :label-cols="3"
            :horizontal="true">
            <b-form-input id="patientIdentity" type="text"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <div>
        <span style="font-style: italic"><strong>挂号信息</strong></span>
      </div>
      <br/>
      <div style="background:linear-gradient(to left,#efefef,#b6b6b6);height:1px;"></div>
      <br/>

      <b-row>
        <b-col md="6">
          <b-form-group
            label="选择科室"
            label-for="selectDepartment"
            :label-cols="3"
            :horizontal="true">
            <b-form-select id="selectDepartment"
                           size="lg"
                           :plain="true"
                           :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                           value="Please select">
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="选择医生"
            label-for="selectDoctor"
            :label-cols="3"
            :horizontal="true">
            <b-form-select id="selectDoctor"
                           size="lg"
                           :plain="true"
                           :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                           value="Please select">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group
            label="结算类别"
            label-for="calculationType"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              id="calculationType"
              name="customRadioInline2">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="ownExpense" name="customRadioInline1" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="ownExpense">自费</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="medicalInsurance" name="customRadioInline1" class="custom-control-input" value="2">
                <label class="custom-control-label" for="medicalInsurance">医保</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="nrcms" name="customRadioInline1" class="custom-control-input" value="2">
                <label class="custom-control-label" for="nrcms">新农合</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            label="挂号级别"
            label-for="registrationLevel"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              id="registrationLevel"
              name="customRadioInline1">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="general" name="customRadioInline1" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="general">普通</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="expert" name="customRadioInline1" class="custom-control-input" value="2">
                <label class="custom-control-label" for="expert">专家</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="emergency" name="customRadioInline1" class="custom-control-input" value="2">
                <label class="custom-control-label" for="emergency">急诊</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group
            label="是否购买病历本?"
            label-for="buyMedical"
            :label-cols="3"
            :horizontal="true">
            <b-form-radio-group
              id="buyMedical"
              name="customRadioInline1">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="yes" name="customRadioInline1" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="yes">是</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="no" name="customRadioInline1" class="custom-control-input" value="2">
                <label class="custom-control-label" for="no">否</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

<!--      <div slot="footer">-->
<!--        <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>-->
<!--        <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>-->
<!--      </div>-->
    </b-form>
  </b-card>
</template>

<script>
    export default {
        name: "registerForm"
    }
</script>

<style scoped>

</style>
