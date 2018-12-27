<!--  -->
<template>
  <div>
    <!--<div class="bread-crumb-wrapper">-->
    <!--<el-button size="small" @click.native="$router.go(-1)">返回</el-button>-->
    <!--<el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">-->
    <!--<el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>-->
    <!--<el-breadcrumb-item>用户信息</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <!--</div>-->
    <bread-crumb>
      <template>
        <el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </template>
    </bread-crumb>
    <p class="page-title">{{title}}</p>
    <div v-if="pageType === 'detail'">
      <div class="user-info">
        <div class="info-item">
          <div class="info-label">姓名：</div>
          <div class="info-val">{{userInfo.userName}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">部门：</div>
          <div class="info-val">{{userInfo.dept}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">职位：</div>
          <div class="info-val">{{userInfo.post}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">组织：</div>
          <div class="info-val">{{userInfo.org}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">微信ID：</div>
          <div class="info-val">{{userInfo.openid}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">电话：</div>
          <div class="info-val">{{userInfo.tel}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">邮箱：</div>
          <div class="info-val">{{userInfo.email}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">备注：</div>
          <div class="info-val">{{userInfo.remark}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <el-form ref="form" :model="userInfo" label-width="80px" class="user-form">
        <el-form-item label="姓名">
          <el-input v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="userInfo.dept" filterable placeholder="请选择">
            <el-option
              v-for="item in deptList"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="userInfo.post" filterable placeholder="请选择">
            <el-option v-for="item in postList"
                       :key="item.postId"
                       :label="item.postName"
                       :value="item.postId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织">
          <el-select v-model="userInfo.org" filterable placeholder="请选择">
            <el-option v-for="item in orgList"
                       :key="item.orgId"
                       :label="item.orgName"
                       :value="item.orgId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="userInfo.remark"> </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-if="pageType === 'edit'" @click="updateUser">保存</el-button>
          <el-button type="primary" v-if="pageType === 'add'" @click="addUser">添加</el-button>
          <!--<el-button @click="userDialogVisible=false">取消</el-button>-->
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import BreadCrumb from '../../components/BreadCrumb.vue'

export default {
  data() {
    return {
      form: {},
      userInfo: {},
      userId: '',
      pageType: '',
      title: '',
      deptList: '',
      orgList: '',
      postList: ''
    };
  },
  components: {
    BreadCrumb
  },

  computed: {},

  created() {
    this.userId = this.$route.query.userId;
    this.pageType = this.$route.query.type;
    this.initData();
    if (this.userId) {
      this.title = this.pageType === 'detail' ? '用户详情' : '编辑用户'
      this.getUser(this.userId);
    } else {
      this.title = '新增用户';
    }
  },

  mounted() {
  },

  methods: {
    initData() {
      this.$http.get('/api/user/getDeptList')
        .then((res) => {
          this.deptList = res.data.data;
        })
      this.$http.get('/api/user/getOrgList')
        .then((res) => {
          this.orgList = res.data.data;
        })
      this.$http.get('/api/user/getPostList')
        .then((res) => {
          this.postList = res.data.data;
        })
    },
    getUser(userId) {
      this.$http.get('/api/user/getUser', {params: {userId: userId}})
        .then((res) => {
          this.userInfo = res.data.data;
          if (this.pageType === 'detail') {
            this.userInfo.dept = this.userInfo.dept.deptName;
            this.userInfo.org = this.userInfo.org.orgName;
            this.userInfo.post = this.userInfo.post.postName;
          } else {
            this.userInfo.dept = this.userInfo.dept._id;
            this.userInfo.org = this.userInfo.org._id;
            this.userInfo.post = this.userInfo.post._id;
          }
        });
    },
    addUser() {
      this.$http.post('/api/user/addUser', {})
    },
    updateUser() {
      // {user: this.userInfo}
      
      this.$http.post('/api/user/updateUser', {user: this.userInfo}).then((res) => {
        this.$notify({
          title: '提示',
          message: '更新用戶信息成功',
          type: 'success',
          duration: 2000
        })
      });
    },
  }
}
</script>

<style scoped>
  .page-title {
    text-align: left;
    font-size: 18px;
    margin-bottom: 1rem;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .info-item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .info-label {
    margin-right: 1rem;
    text-align: left;
    color: #00B7FF;
  }

  .info-val {
    margin-right: auto;
    text-align: left;
  }

  .user-form {
    width: 30rem;
  }

  .user-form .el-select {
    width: 100%;
  }
</style>
