<!--  -->
<template>
  <el-container style="height: 100%">
    <el-header class="header">
      <home-header></home-header>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <home-side></home-side>
      </el-aside>
      <el-main class="container">
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>
<script>/* eslint-disable indent,semi */
import HomeHeader from '../components/HomeHeader.vue'
import HomeSide from '../components/HomeSide.vue'


export default {
  data() {
    return {};
  },
  components: {
    HomeSide,
    HomeHeader,

  },

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {}
}
</script>

<style scoped>
  .el-container {
    /*min-height: 600px;*/
    min-width: 900px;
  }

  .header {
    background-color: #409EFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .aside {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .container {
    background-color: white;
    color: #333;
    text-align: center;
    padding: 2rem 4rem;
    /*line-height: 160px;*/
  }

  /**/
  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
  /*line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
  /*line-height: 320px;*/
  /*}*/
</style>
