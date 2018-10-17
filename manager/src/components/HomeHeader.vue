<!--  -->
<template>
  <div class="home-header">
    <div class="enterprise">
      ZHKU University
    </div>
    <el-dropdown trigger="hover">
      <div class="manager">
        <p>李佳远</p>
        <img src="../assets/logo.png" class="avatar" alt="头像" >
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="settingMsg">设置</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>/* eslint-disable indent,semi */
export default {
  data() {
    return {};
  },
  components: {},

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {
    settingMsg(){
      console.log('设置');
    },
    logout(){
      console.log('注销')
    }

  }
}
</script>

<style scoped>
  .home-header {
    display: flex;
    color: white;
  }

  .enterprise {
    font-size: 20px;
    margin-right: auto;
  }

  .manager {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .avatar {
    margin-left: 4px;
    height: 40px;
    width: 40px;
    background: white;
    background-size: 100%;
    border-radius: 100%;
  }
</style>
