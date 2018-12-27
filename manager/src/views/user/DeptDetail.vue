<!--  -->
<template>
  <div>
    <div class="bread-crumb-wrapper">
      <el-button size="small">返回</el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>部门信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--<div v-if="pageType === 'detail'">-->
    <!--详情-->
    <!--</div>-->
    <p class="page-title">{{title}}</p>
    <div>
      <el-form ref="form" :model="deptInfo" label-width="100px" style="width: 35rem">
        <el-form-item label="部门名">
          <el-input v-model="deptInfo.deptName"></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="deptInfo.deptNo"></el-input>
        </el-form-item>
        <!--<hr>-->
        <el-form-item label="部门负责人">
          <div class="user-box">
            <el-tag
              class="selected-user"
              v-for="user in deptHead"
              :key="user.userId"
              closable
              @close="removeUser(user)">
              {{user.userName}}
            </el-tag>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" v-if="pageType === 'edit'" @click="updateDept">保存</el-button>
          <el-button type="primary" v-if="pageType === 'add'" @click="addDept">添加</el-button>
          <el-button type="primary" @click="SET_USER_DIALOG_SHOW(true)">添加部门负责人</el-button>
          <!--<el-button @click="deptDialogVisible=false">取消</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <user-select :selectedUser.sync="deptHead"></user-select>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import UserSelect from '../../components/select-user/SelectUser.vue'
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      deptId: '',
      pageType: 'detail',
      title: '新增部门',
      deptInfo: {},
      deptHead: []
    };
  },
  components: {
    UserSelect
  },

  computed: {
    deptHeadUser(){
      let deptHead = [];
      this.deptHead.forEach(user =>{
        deptHead.push(user.userId);
      });
      return deptHead;
    }
  },

  created() {
    this.pageType = this.$route.query.type;
    this.deptId = this.$route.query.deptId;
    if (this.pageType === 'add') {
      this.deptInfo.parentDept = this.deptId
    } else {
      this.getDept(this.deptId);
    }
//    this.deptId && this.getDept(this.deptId);

  },

  mounted() {
  },

  methods: {
    initData() {

    },
    getDept(deptId) {
      let _this = this;
      this.$http.get('/api/user/getDept', {params: {deptId: deptId}})
        .then((result) => {
          let res = result.data;
          _this.deptInfo = res.data;
          _this.deptHead = _this.deptInfo.deptHead;
          _this.deptHead.forEach(user =>{
            user.userId = user._id;
          });
        })
    },
    addDept() {
      this.deptInfo.deptHead = this.deptHeadUser;
      this.$http.post('/api/user/addDept', {dept: this.deptInfo}).then((res) => {
        this.$notify({
          title: '提示',
          message: '新增部门信息成功',
          type: 'success',
          duration: 2000
        })
      });
    },
    updateDept() {
      this.deptInfo.deptHead = this.deptHeadUser;
      this.$http.post('/api/user/updateDept', {dept: this.deptInfo}).then((res) => {
        this.$notify({
          title: '提示',
          message: '更新部门信息成功',
          type: 'success',
          duration: 2000
        })
      });
    },
    removeUser(user) {
      this.deptHead.splice(this.deptHead.indexOf(user), 1);
    },
    ...mapMutations({
      SET_USER_DIALOG_SHOW: 'SET_USER_DIALOG_SHOW'
    }),
  }
}
</script>

<style scoped>
  .bread-crumb-wrapper {
    display: flex;
    align-items: center;
    padding-bottom: .5rem;
  }

  .bread-crumb {
    margin-left: 1rem;
  }

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
