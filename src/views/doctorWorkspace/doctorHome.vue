<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col-6>
        <b-table class="mb-0 table-outline" responsive="sm" hover :items="tableItems" :fields="tableFields" head-variant="light">
          <div slot="avatar" class="avatar" slot-scope="item">
            <img :src="item.value.url" class="img-avatar" alt="">
            <span class="avatar-status" v-bind:class="{ 'bg-success': item.value.status == 'success',  'bg-warning': item.value.status == 'warning', 'bg-danger': item.value.status == 'danger', 'bg-secondary': item.value.status == '' }"></span>
          </div>
          <div slot="user" slot-scope="item">
            <div>{{item.value.name}}</div>
            <div class="small text-muted">
                <span>
                  <template v-if="item.value.new">New</template>
                  <template v-else>Recurring</template>
                </span> | Registered: {{item.value.registered}}
            </div>
          </div>
          <i slot="country" class="h4 mb-0" :class="flag(item.value.flag)" slot-scope="item" :title="item.value.flag" :id="item.value.flag"></i>
          <i class="flag-icon flag-icon-pw h1" title="pw" id="pw"></i>
          <div slot="usage" slot-scope="item">
            <div class="clearfix">
              <div class="float-left">
                <strong>{{item.value.value}}%</strong>
              </div>
              <div class="float-right">
                <small class="text-muted">{{item.value.period}}</small>
              </div>
            </div>
            <b-progress height={} class="progress-xs" v-model="item.value.value" :variant="variant(item.value.value)"></b-progress>
          </div>
          <i slot="payment" slot-scope="item" :class="item.value.icon" style="font-size:24px"></i>
          <div slot="activity" slot-scope="item">
            <div class="small text-muted">Last login</div>
            <strong>{{item.value}}</strong>
          </div>
        </b-table>
      </b-col-6>
    </b-row>
  </div>
    
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "doctorHome",
        data:function() {
          return {
            tableItems: [
              {
                avatar: { url: 'img/avatars/1.jpg', status: 'success' },
                user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
                country: { name: 'USA', flag: 'us' },
                usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
                payment: { name: 'Mastercard', icon: 'fa fa-cc-mastercard' },
                activity: '10 sec ago'
              },
              {
                avatar: { url: 'img/avatars/2.jpg', status: 'danger' },
                user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
                country: { name: 'Brazil', flag: 'br' },
                usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
                payment: { name: 'Visa', icon: 'fa fa-cc-visa' },
                activity: '5 minutes ago'
              },
              {
                avatar: { url: 'img/avatars/3.jpg', status: 'warning' },
                user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
                country: { name: 'India', flag: 'in' },
                usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
                payment: { name: 'Stripe', icon: 'fa fa-cc-stripe' },
                activity: '1 hour ago'
              },
              {
                avatar: { url: 'img/avatars/4.jpg', status: '' },
                user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
                country: { name: 'France', flag: 'fr' },
                usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
                payment: { name: 'PayPal', icon: 'fa fa-paypal' },
                activity: 'Last month'
              },
              {
                avatar: { url: 'img/avatars/5.jpg', status: 'success' },
                user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
                country: { name: 'Spain', flag: 'es' },
                usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
                payment: { name: 'Google Wallet', icon: 'fa fa-google-wallet' },
                activity: 'Last week'
              },
              {
                avatar: { url: 'img/avatars/6.jpg', status: 'danger' },
                user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
                country: { name: 'Poland', flag: 'pl' },
                usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
                payment: { name: 'Amex', icon: 'fa fa-cc-amex' },
                activity: 'Last week'
              }
            ],
            tableFields: {
              avatar: {
                label: '<i class="icon-people"></i>',
                class: 'text-center'
              },
              user: {
                label: 'User'
              },
              country: {
                label: 'Country',
                class: 'text-center'
              },
              usage: {
                label: 'Usage'
              },
              payment: {
                label: 'Payment method',
                class: 'text-center'
              },
              activity: {
                label: 'Activity'
              }
            }
          };
        },
      computed:{
          ...mapState('doctor', ['count'])
      },
      methods: {
        variant (value) {
          let $variant
          if (value <= 25) {
            $variant = 'info'
          } else if (value > 25 && value <= 50) {
            $variant = 'success'
          } else if (value > 50 && value <= 75) {
            $variant = 'warning'
          } else if (value > 75 && value <= 100) {
            $variant = 'danger'
          }
          return $variant
        },
        flag (value) {
          return 'flag-icon flag-icon-' + value
        }
      }
    }

</script>

<style scoped>

</style>
