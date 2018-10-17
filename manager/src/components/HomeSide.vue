<!--  -->
<template>
  <div>
    <el-menu :router=true :unique-opened="true" :default-active="menuActive">
      <el-submenu index="1">
        <template slot="title"><i class="iconfont icon-user"></i>人事管理</template>
          <el-menu-item index="/user">人员管理</el-menu-item>
          <el-menu-item index="/user/setting">人事设置</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="iconfont icon-form"></i>表单流程</template>
          <el-menu-item index="/form-flow">表单列表</el-menu-item>
          <el-menu-item index="/form-flow/setting">表单设置</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="iconfont icon-audit"></i>审批请示</template>
          <el-menu-item index="/move-approve">审批列表</el-menu-item>
          <el-menu-item index="/move-approve/setting">审批设置</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="iconfont icon-qingjia1"></i>请假出差</template>
        <el-menu-item index="/ask-leave">请假列表</el-menu-item>
        <el-menu-item index="/ask-leave/setting">请假设置</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="iconfont icon-huiyi"></i>会议助手</template>
        <el-menu-item index="/meeting-assistant">会议记录</el-menu-item>
        <el-menu-item index="/meeting-assistant/summary">会议纪要</el-menu-item>
        <el-menu-item index="/meeting-assistant/setting">会议设置</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="iconfont icon-liucheng"></i>固定流程</template>
        <el-menu-item index="/fixed-flow">固定流程列表</el-menu-item>
        <el-menu-item index="/fixed-flow/setting">固定流程设置</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>/* eslint-disable indent,semi */
export default {
  data() {
    return {
      menuActive:'/user'
    };
  },
  components: {},

  computed: {},

  created() {
    let route = this.$route.path;
    this.menuActive = route;
  },

  mounted() {
  },

  methods: {
    toUser() {
    }
  }
}
</script>

<style scoped>
  .iconfont{
    font-size: 20px;
    margin-right: 5px;
    color: #00B7FF;
  }
  .el-submenu .el-menu-item{
    /*background: #E9EEF3;*/
  }
</style>
