<!--  -->
<template>
  <div>
    <bread-crumb>
      <template>
        <el-breadcrumb-item :to="{ path: '/ask-leave' }">请假首页</el-breadcrumb-item>
        <el-breadcrumb-item>请假详情</el-breadcrumb-item>
      </template>
    </bread-crumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>假条</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div>
        <div class="info-item">
          <div class="info-label">请假人：</div>
          <div class="info-val">{{leave.creator.userName}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">类型：</div>
          <div class="info-val">{{leave.leaveType}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">请假标题：</div>
          <div class="info-val">{{leave.leaveTitle}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">请假内容：</div>
          <div class="info-val">{{leave.leaveContent}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">开始时间：</div>
          <div class="info-val">{{leave.startTime}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">结束时间：</div>
          <div class="info-val">{{leave.endTime}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">当前状态：</div>
          <div class="info-val">{{leave.currentNode.nodeName}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import BreadCrumb from '../../components/BreadCrumb.vue';


export default {
  data() {
    return {
      leave: {
        creator: {},
        currentNode: {},
      },
    };
  },
  components: {
    BreadCrumb,
  },

  computed: {},

  created() {
    let id = this.$route.query.leaveId;
    this.initData(id);
  },

  mounted() {
  },

  methods: {
    initData(id) {
      this.$http.get('/api/ask-leave/getAskLeave', {params: {leaveId: id}}).then((res) => {
        let data = res.data;
        this.leave = data.data;
        debugger;
      });
    }
  }
};
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .info-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    font-size: 16px;
  }

  .info-label {
    margin-right: 1rem;
    text-align: left;
  }

  .info-val {
    margin-right: auto;
    text-align: left;
  }
</style>
