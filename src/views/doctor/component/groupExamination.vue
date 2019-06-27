<template>
  <b-card header="病历模板" >
    <b-tabs @input="changeTab">
      <!-- changeTab更换tab 个人/科室挂号列表 -->
      <b-tab v-for="(tab, index) in medicalRecordTemplateTabs" :title="tab.title" :key="index" :active="index === currentTab" >
        <!-- 分别存放tab的内容-->
        <b-row>
          <b-col sm="8" class="my-1">
            <b-input-group>
              <b-form-input
                v-model="filter"
                placeholder="请输入..."
                size="sm"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="filter = ''"
                  size="sm"
                >清空</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col sm="4" class="my-1">
            <b-form-select
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-col>
        </b-row>
        <!-- Main table element -->
        <b-table
          show-empty
          hover
          :aria-busy="isBusy"
          :items="medicalRecordHistoryItems"
          :fields="medicalRecordTemplateFields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered">
          <!-- @filtered当本地筛选导致项目数发生变化时发出。-->

          <template slot="operate" slot-scope="row">
            <b-button @click="selectMedicalRecordTemplate(row.item, row.index)" variant="primary"  size="sm" >查看</b-button>
          </template>
        </b-table>
        <!--页码-->
        <b-row>
          <b-col md="12" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="total"
              :per-page="perPage"
              class="my-0"
              size="sm"
              align="center"
            ></b-pagination>
          </b-col>
        </b-row>

      </b-tab>
      <!-- 弹框-->
      <b-modal  ref="medical-record-template-modal" centered title="模板详情">
        <medical-record-template-info
          :medical-record-template-info-item=medicalRecordTemplateInfoItem
        >
        </medical-record-template-info>
      </b-modal>
    </b-tabs>
  </b-card>
</template>

<script>
    export default {
        name: "groupExamination"
    }
</script>

<style scoped>

</style>
