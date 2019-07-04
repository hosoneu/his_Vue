<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
        <label>{{curr_user.userName}}</label>
      <img
        src="img/avatars/avatars.png"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>个人信息</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" /> 姓名
        <b-badge variant="info">{{curr_user.userName}}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-user" /> 科室
        <b-badge variant="info">{{curr_dept.departmentName}}</b-badge>
      </b-dropdown-item>

      <b-dropdown-item><i class="fa fa-user" /> 角色
        <b-badge variant="info">{{curr_role.roleName}}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center"><strong>操作</strong></b-dropdown-header>
      <b-dropdown-item @click="logout"><i class="fa fa-lock" /> 登出</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {}
  },
  computed:{
    ...mapState("common",['curr_user']),
    ...mapState("common",['curr_dept']),
    ...mapState("common",['curr_role']),
  },
  methods:{
    logout(){
      this.set_curr_user(null);
      this.set_curr_user_id(null);
      this.set_curr_user_type(null);
      this.$router.push("/");
    },
    ...mapMutations('common',['set_curr_user_type']),
    ...mapMutations('common',['set_curr_user']),
    ...mapMutations('common',['set_curr_user_id']),
  }
}
</script>
