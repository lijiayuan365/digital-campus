<!--  -->
<template>
  <div>
    <bread-crumb>
      <template>
        <el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织信息</el-breadcrumb-item>
      </template>
    </bread-crumb>
    <!--<div v-if="pageType === 'detail'">-->
    <!--详情-->
    <!--</div>-->
    <p class="page-title">{{title}}</p>
    <div>
      <el-form ref="form" :model="orgInfo" label-width="100px" style="width: 35rem">
        <el-form-item label="组织名">
          <el-input v-model="orgInfo.orgName"></el-input>
        </el-form-item>
        <!--<hr>-->
        <el-form-item label="组织负责人">
          <div class="user-box">
            <el-tag
              class="selected-user"
              v-for="user in orgHead"
              :key="user.userId"
              closable
              @close="removeUser(user)">
              {{user.userName}}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="组织说明">
          <el-input type="textarea" v-model="orgInfo.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="pageType === 'edit'" @click="updateOrg">保存</el-button>
          <el-button type="primary" v-if="pageType === 'add'" @click="addOrg">添加</el-button>
          <el-button type="primary" @click="SET_USER_DIALOG_SHOW(true)">添加组织人员</el-button>
          <!--<el-button @click="orgDialogVisible=false">取消</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <user-select :selectedUserProp.sync="orgHead"></user-select>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import BreadCrumb from '../../components/BreadCrumb.vue'
import UserSelect from '../../components/select-user/SelectUser.vue'
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      orgId: '',
      pageType: 'add',
      title: '新增组织',
      orgInfo: {},
      orgHead: []
    };
  },
  components: {
    BreadCrumb,
    UserSelect
  },

  computed: {
    orgHeadUser() {
      let orgHead = [];
      this.orgHead.forEach(user => {
        orgHead.push(user.userId);
      });
      return orgHead;
    }
  },

  created() {
    this.pageType = this.$route.query.type;
    this.orgId = this.$route.query.orgId;
    if (this.pageType === 'edit') {
      this.getOrg(this.orgId);
    }
//    this.orgId && this.getorg(this.orgId);

  },

  mounted() {
  },

  methods: {
    initData() {

    },
    getOrg(orgId) {
      let _this = this;
      this.$http.get('/api/user/getOrg', {params: {orgId: orgId}}).then((result) => {
        let res = result.data;
        _this.orgInfo = res.data;
        _this.orgHead = _this.orgInfo.orgHead;
        _this.orgHead.forEach(user => {
          user.userId = user._id;
        });
      })
    },
    addOrg() {
      this.orgInfo.orgHead = this.orgHeadUser;
      this.$http.post('/api/user/addOrg', {org: this.orgInfo}).then((res) => {
        this.$message({
          message: '添加组织信息成功',
          duration: 1500,
          type: 'success',
        });
        this.$router.push({
          path: '/user'
        });
      });
    },
    updateOrg() {
      debugger
      this.orgInfo.orgHead = this.orgHeadUser;
      this.$http.post('/api/user/updateOrg', {org: this.orgInfo}).then((res) => {
        this.$message({
          message: '更新部门信息成功',
          duration: 1500,
          type: 'success',
        });
        this.$router.push({
          path: '/user'
        });
      });
    },
    removeUser(user) {
      this.orgHead.splice(this.orgHead.indexOf(user), 1);
    },
    ...mapMutations({
      SET_USER_DIALOG_SHOW: 'SET_USER_DIALOG_SHOW'
    }),
  }
}
</script>

<style scoped>
  .page-title {
    text-align: left;
    font-size: 18px;
    margin-bottom: 1rem;
  }

  .user-box {
    text-align: left;
    /*align-items: center;*/
    /*justify-content: center;*/
    padding: 6px;
    min-height: 2rem;
    border: solid 1px #909399;
    border-radius: 2px;
  }

  .selected-user {
    margin: 6px 6px 0 0;
  }
</style>
