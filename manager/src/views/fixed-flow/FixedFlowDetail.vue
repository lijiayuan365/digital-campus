<!--  -->
<template>
  <div>
    <bread-crumb>
      <template>
        <el-breadcrumb-item :to="{ path: '/fixed-flow' }">固定流程</el-breadcrumb-item>
        <el-breadcrumb-item>新建流程</el-breadcrumb-item>
      </template>
    </bread-crumb>
    <div class="flow-form">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="流程名称" prop="pass">
          <el-input v-model="flowName"></el-input>
        </el-form-item>
        <el-form-item label="流程分组" prop="checkPass">
          <el-select
            v-model="flowGroup"
            placeholder="请选择/输入新分组"
            filterable
            allow-create>
            <el-option
              v-for="item in flowGroups"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="flowDesc">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-alert title="" type="info" :closable="false"></el-alert>
    <div class="flow-design">
      <div class="flow-draw">
        <div class="node-wrapper">
          <div class="node-item">
            <el-button class="node-btn" size="small" round disabled>填写/提交表单</el-button>
            <i class="icon el-icon-circle-plus" @click="addNode"></i>
          </div>
        </div>
        <div class="node-wrapper" v-for="(node, index) in nodes">
          <i class="el-icon-back"></i>
          <div class="node-item">
            <el-button size="small" class="node-btn" @click="editNode(index)">{{node.nodeName}}</el-button>
            <i class="icon el-icon-remove" @click="removeNode(index)"></i>
          </div>
        </div>
      </div>
      <div class="flow-setting" v-if="activeIndex">
        <div class="node-title">节点属性</div>
        <el-form label-position="left" label-width="60px">
          <el-form-item label="步骤">{{activeIndex}}</el-form-item>
          <el-form-item label="名称">
            <el-input v-model="activeNode.nodeName"></el-input>
          </el-form-item>
          <el-form-item label="处理人">
            <el-select v-model="activeNode.nodePersonType" placeholder="请选择节点处理人">
              <el-option label="提单人" value=1></el-option>
              <el-option label="部门负责人" value=3></el-option>
              <el-option label="自由选择" value=2></el-option>
              <el-option label="选定处理人" value=0></el-option>
            </el-select>
          </el-form-item>
          <div class="nodePerson" v-if="activeNode.nodePersonType == '0'">
            <el-form-item>
              <el-button size="mini" @click="SET_USER_DIALOG_SHOW(true)">添加</el-button>
              已选 1 标签，2 成员
              <template>
                <div class="node-person-list" v-if="activeNode.nodePersons && activeNode.nodePersons.length > 0">
                  <el-tag
                    class="selected-user"
                    size="mini"
                    v-for="user in activeNode.nodePersons"
                    :key="user.userId"
                    closable
                    @close="removeUser(user)">{{user.userName}}
                  </el-tag>
                </div>
              </template>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <el-button @click="saveDraft">存为草稿</el-button>
    <el-button @click="addFixedFlow">发布</el-button>
    <!--<el-button v-else @click="updateFixedFlow">更新</el-button>-->
    <select-user :selectedUserProp.sync="activeNode.nodePersons"></select-user>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import BreadCrumb from '../../components/BreadCrumb.vue';
import SelectUser from '../../components/select-user/SelectUser.vue';
import {mapMutations} from 'vuex';

export default {
  data() {
    return {
      type: '',

      flowGroups: [],
      flowId: '',
      flowName: '',
      flowGroup: '',
      flowDesc: '',
      nodes: [{nodeName: '节点1'}],
      activeNode: {},
      activeIndex: '1',
      nodeLength: '1',
    };
  },
  components: {
    BreadCrumb,
    SelectUser,
  },

  computed: {},

  created() {
    this.activeNode = this.nodes[0];
    this.flowId = this.$route.query.flowId;
    this.type = this.$route.query.type;
    this.flowId && this.initData(this.flowId);
    this.getFlowGroup();
  },

  mounted() {
  },

  methods: {
    initData(flowId) {
      this.$http.get('/api/fixed-flow/getFixedFLow', {params: {flowId}}).then((res) => {
        let data = res.data.data;
        this.flowGroup = data.flowGroup;
        this.flowName = data.flowName;
        this.flowDesc = data.desc;
        this.nodes = data.nodes;
      });
    },
    getFlowGroup() {
      this.$http.get('/api/fixed-flow/getFlowGroup').then((res) => {
        let data = res.data.data;
        this.flowGroups = data;
      });
    },
    saveFlowData() {
      let flowNodes = {};
//      for(let i=0;i<this.nodes.length-1;i++){
//
//        this.nodes[i].childNode = this.nodes[i+1];
//      }
      flowNodes = this.nodes.ToList();
      let date = new Date();
      date = date.Format('yyyy-MM-dd');
//      let flow = this.nodes[0];
      let flow = {
        flowId: this.flowId,
        flowName: this.flowName,
        flowGroup: this.flowGroup,
        createTime: new Date().Format('yyyy-MM-dd'),
        desc: this.flowDesc,
        flow: flowNodes,
      };
      return flow;
    },
    saveDraft() {
      let flow = this.saveFlowData();
      let url = this.type === 'add' ? '/api/fixed-flow/addFixedFlow' : '/api/fixed-flow/updateFixedFlow';
      flow.status = 0;
      this.$http.post(url, {flowData: flow}).then((res) => {
        this.$message({
          message: '保存草稿成功',
          duration: 1500,
          type: 'success',
        });
        this.$router.push({
          path: '/fixed-flow'
        });
      });
    },
    addFixedFlow() {
      let flow = this.saveFlowData();
      let url = this.type === 'add' ? '/api/fixed-flow/addFixedFlow' : '/api/fixed-flow/updateFixedFlow';
      flow.status = 1;
      this.$http.post(url, {flowData: flow}).then((res) => {
        this.$message({
          message: '发布流程成功',
          duration: 1500,
          type: 'success',
        });
        this.$router.push({
          path: '/fixed-flow'
        });
      });
    },
    addNode() {
      this.nodeLength++;
      this.nodes.push({
        nodeName: `节点${this.nodeLength}`,
        nodeId: `00${this.nodeLength}`,
        nodePersonType: '',
        nodePersons: [],
      });
    },
    removeNode(index) {
      this.nodes.splice(index, 1);
    },
    editNode(index) {
      this.activeNode = this.nodes[index];
      this.activeIndex = index + 1;
    },
    ...mapMutations({
      SET_USER_DIALOG_SHOW: 'SET_USER_DIALOG_SHOW'
    })
  }
};
</script>

<style scoped>
  .flow-form {
    width: 30rem;
  }

  .flow-design {
    display: flex;
    margin-top: 1.5rem;
  }

  .flow-draw {
    padding: .5rem 0;
    min-height: 20rem;
    background: #FBFCFD;
    flex: 0 0 30rem;

  }

  .node-wrapper {
    margin: auto;
    align-items: center;
    /*justify-content: center;*/
    display: flex;
    flex-direction: column;
  }

  .node-item {
    display: flex;
    align-items: center;
  }

  .node-btn {
    width: 8rem;
    margin-right: .5rem;
  }

  .icon:hover {
    color: #409EFF;
  }

  .el-icon-circle-plus {
    color: #67C23A;
  }

  .el-icon-remove {
    color: #F56C6C;
  }

  .el-icon-back {
    transform: rotate(-90deg);
    /*height: 4rem;*/
  }

  .node-title {
    height: 40px;
    padding-left: 10px;
    margin-bottom: 1rem;
    border-top: 1px solid #dce3e8;
    border-bottom: 1px solid #dce3e8;
    border-left: 1px solid #dce3e8;
    background: rgb(235, 238, 242);
    line-height: 40px;
  }

  .flow-setting {
    flex: 0 0 25rem;
  }

  .nodePersonPick {
    display: flex;
    flex-direction: column;
    /*background: #E4E7ED;*/
  }

  .node-person-list {
    text-align: left;
    padding: 6px;
    min-height: 2rem;
    border: solid 1px #909399;
    border-radius: 2px;
  }

  .el-form-item {
    text-align: left;
  }
</style>
