<template>
  <AppHeaderDropdown left no-caret>
    <template slot="header">
      <b-button variant="outline-primary"><i class="fa fa-navicon"></i></b-button>
    </template>\
    <template slot="dropdown">
      <b-dropdown-item  v-for="(item, index) in nav" :key ="index">
        <b-nav-item class="px-3 text-left" :to="item.url" active-class="text-primary">
          {{item.name}}
        </b-nav-item>
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
  import nav from '../nav'
  import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
  import {mapState} from 'vuex'
  export default {
    name: 'DefaultHeaderDropdownNav',
    components: {
      AppHeaderDropdown
    },
    data: () => {
      return { itemsCount: 42 }
    },
    computed:{
      ...mapState('common', ['curr_user_type']),
      nav(){
        return nav.items[this.curr_user_type]
      }
    }
  }
</script>
