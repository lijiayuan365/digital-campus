<!--  -->
<template>
  <el-container style="height: 100%">
    <el-header class="header">
      Header
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
import HomeSide from './../components/home-side.vue'

export default {
  data() {
    return {};
  },
  components: {
    HomeSide
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
    min-height: 600px;
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
    line-height: 160px;
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
