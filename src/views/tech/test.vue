<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12">
        <p>test</p>
        <p>this{{getTT}}</p>
        <p>{{this.$store.state.tech.ttt}}</p>
        <p>num{{num}}</p>
<!--        <p>AAA{{this.$store.getters.getTTT}}</p>-->
<!--        <p>{{this.$store.tech.getters.getTTT}}</p>-->
        <p>{{this.bbb}}</p>
        <p>mapState{{this.num}}</p>
        <p>gett{{this.gett}}</p>
        <p>getU{{this.getU}}</p>
        <p>
          <b-button size="sm" class="mr-1 btn-brand" variant="facebook" v-on:click="jump(bbb)">点击进行跳转</b-button>
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {mapGetters} from 'vuex'
  import Page404 from "../common/Page404";
  export default {
      name: "test",
    components: {Page404},
    data: () =>{
        return {
          bbb:'it is a test ',
        }
      },
      computed:{
        getTT:function () {
          alert(this.$store.state.tech.ttt);
          return this.$store.state.tech.ttt;
        },
        getNum:function(){
          return this.$store.state.tech.getters;
        },
        ...mapState("tech",['num']),
        ...mapGetters('tech',{
          gett:'getVVV',
          getU:'getUUU'
        })
      },
      methods:{
          trans:function () {
            
          },
        setPatientInfo:function () {
          
        },
        // testt:function () {
        //   alert(this.$store.dispatch('change'));
        //
        // },
        jump:function (bbb) {
          alert('a');
          this.$router.push({
            path:'/tech/tech_result',
            query:{
              fff:'abc'
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
