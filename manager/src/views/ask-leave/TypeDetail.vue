<!--  -->
<template>
  <div class="detail">
    <bread-crumb>
      <template>
        <el-breadcrumb-item :to="{ path: '/ask-leave/setting' }">请假设置</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ask-leave/setting/type' }">请假类型</el-breadcrumb-item>
        <el-breadcrumb-item>请假类型详情</el-breadcrumb-item>
      </template>
    </bread-crumb>
    <div v-if="pageType === 'detail'">
      <div class="type-info">
        <div class="info-item">
          <div class="info-label">名称：</div>
          <div class="info-val">{{typeInfo.typerName}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">标题：</div>
          <div class="info-val">{{typeInfo.typeTitle}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">内容：</div>
          <div class="info-val">{{typeInfo.typeContent}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <el-form ref="form" :model="typeInfo" label-width="80px" class="edit-form-width">
        <el-form-item label="名称">
          <el-input v-model="typeInfo.typeName"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="typeInfo.typeTitle"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="typeInfo.typeContent"></el-input>
        </el-form-item>
        <el-form-item label="可见性" class="form-item">
          <el-radio v-model="visitType" label='0'>所有人</el-radio>
          <!--<el-radio v-model="typeInfo.visitType" label='1'>选定人员</el-radio>-->
          <!--<el-switch v-model="typeInfo.visitType"-->
          <!--active-value = '1'-->
          <!--inactive-value = '0'-->
          <!--active-text="所有人可见"-->
          <!--inactive-text="部分可见">-->
          <!---->
          <!--</el-switch>-->
        </el-form-item>
        <el-form-item label="流程">
          <el-select v-model="typeInfo.flow" filterable placeholder="请选择">
            <el-option
              v-for="item in flowList"
              :key="item._id"
              :label="item.flowName"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相关人">
          <div class="user-box">
            <el-tag
              class="selected-user"
              v-for="user in ccPerson"
              :key="user.userId"
              closable
              @close="removeUser(user)">
              {{user.userName}}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="pageType === 'edit'" @click="updateType">保存</el-button>
          <el-button type="primary" v-if="pageType === 'add'" @click="addType">添加</el-button>
          <el-button type="primary" @click="SET_USER_DIALOG_SHOW(true)">添加相关人</el-button>
          <!--<el-button @click="userDialogVisible=false">取消</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <user-select :selectedUserProp.sync="ccPerson"></user-select>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import BreadCrumb from '../../components/BreadCrumb.vue';
import UserSelect from '../../components/select-user/SelectUser.vue';
import {mapMutations} from 'vuex';

export default {
  data() {
    return {
      pageType: 'add',
      flowList: [],
      typeInfo: {},
      ccPerson: [],
      visitType: '0',
    };
  },
  components: {
    BreadCrumb,
    UserSelect,
  },

  computed: {},

  created() {
    let typeId = this.$route.query.typeId;
    this.pageType = this.$route.query.type;
    this.pageType === 'edit' && this.initData(typeId);
  },

  mounted() {
  },

  methods: {
    initData(typeId) {
      this.$http.get('/api/ask-leave/getLeaveType', {params: {typeId: typeId}}).then((res) => {
        let data = res.data;
        this.typeInfo = data.data;
        this.ccPerson = data.data.ccPerson;
      });
      this.$http.get('/api/fixed-flow/getFixedFlowList').then((res) => {
        let data = res.data;
        this.flowList = data.data;
      });
    },
    updateType() {
      this.typeInfo.ccPerson = this.ccPerson;
      let typeData = this.typeInfo;
      this.$http.post('/api/ask-leave/updateLeaveType', {typeData: typeData}).then((res) => {
        this.$message({
          message: '更新请假类型信息成功',
          duration: 1500,
          type: 'success',
        });
        this.$router.go(-1);
      });

    },
    addType() {
      this.typeInfo.ccPerson = this.ccPerson;
      let typeData = this.typeInfo;
      this.$http.post('/api/ask-leave/addLeaveType', {typeData: typeData}).then((res) => {
        this.$message({
          message: '添加请假类型信息成功',
          duration: 1500,
          type: 'success',
        });
        this.$router.go(-1);
      });
    },
    ...mapMutations({
      SET_USER_DIALOG_SHOW: 'SET_USER_DIALOG_SHOW'
    }),
  }
};
</script>

<style scoped>
  .type-info {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .form-item {
    text-align: left;
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
