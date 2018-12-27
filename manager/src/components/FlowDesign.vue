<template>
  <div class="flow-design">
    <div class="operating">
      <div class="operating-btn-group">
        <!-- <div
          class="btn"
          :class="{'active-btn':activeButton === 'addCircle'}"
          @click="addCircle"
          title="起始节点"
        >
          <i class="iconfont icon-xingzhuang-tuoyuanxing"></i>
        </div>-->
        <div
          class="btn"
          :class="{'active-btn':activeButton === 'addRect'}"
          @click="addRect"
          title="常规节点"
        >
          <i class="iconfont icon-border"></i>
        </div>
        <div
          class="btn"
          :class="{'active-btn':activeButton === 'addRhombus'}"
          @click="addRhombus"
          title="条件节点"
        >
          <i class="iconfont icon-lingxing"></i>
        </div>
      </div>
      <div class="operating-btn-group">
        <!--<div class="btn" @click="addLine" title="直线">-->
        <!--<i class="el-icon-back"></i>-->
        <!--</div>-->
        <!--<div class="btn" @click="addSmooth" title="曲线">-->
        <!--<i class="el-icon-back"></i>-->
        <!--</div>-->
        <!--<div class="btn" @click="addArrowLine" title="箭头直线">-->
        <!--<i class="el-icon-back"></i>-->
        <!--</div>-->
        <div
          class="btn"
          :class="{'active-btn':activeButton === 'addArrowSmooth'}"
          @click="addArrowSmooth"
          title="箭头曲线"
        >
          <i class="iconfont icon-xian"></i>
        </div>
      </div>
      <div class="operating-btn-group">
        <div
          class="btn"
          :class="{'active-btn':activeButton === 'editMode'}"
          @click="changeMode('edit')"
          title="选择模式"
        >
          <i class="iconfont icon-choose"></i>
        </div>
        <div
          class="btn"
          :class="{'active-btn':activeButton === 'dragMode'}"
          @click="changeMode('drag')"
          title="拖拽模式"
        >
          <i class="iconfont el-icon-rank"></i>
        </div>
      </div>
      <div class="operating-btn-group">
        <div class="btn" @click="delNode" style="margin-top: 5px;" title="删除">
          <i class="iconfont el-icon-delete"></i>
        </div>
        <div class="btn" @click="save" title="保存">
          <i class="iconfont icon-baocun"></i>
        </div>
      </div>
    </div>
    <div id="flowChart" class="flow-chart"></div>
    <div class="node-attribute">
      <div class="node-title">
        <span>{{infoTitle}}属性</span>
      </div>
      <div class="content">
        <div v-if="isBlank === true">
          <el-checkbox v-model="checked">网格对齐</el-checkbox>
        </div>
        <div v-else>
          <el-form label-position="left" label-width="60px">
            <el-form-item label="名称">
              <el-input size="mini" v-model="nodeName"></el-input>
            </el-form-item>
            <!--<el-form-item label="类型">-->
            <!--<el-select v-model="nodeType" size="mini" filterable placeholder="请选择类型" value="">-->
            <!--<el-option-->
            <!--v-for="item in nodeTypeList"-->
            <!--:key="item.id"-->
            <!--:label="item.label"-->
            <!--:value="item.id">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="处理人">
              <el-select v-model="nodePersonType" placeholder="请选择节点处理人">
                <el-option label="提单人" value="1"></el-option>
                <el-option label="部门负责人" value="3"></el-option>
                <el-option label="自由选择" value="2"></el-option>
                <el-option label="选定处理人" value="0"></el-option>
              </el-select>
            </el-form-item>
            <!-- 自由选择先不写 -->
            <!-- <div class="nodePersonPick" v-if="nodePersonType == '2'">
              <el-form-item label>
                <el-radio-group v-model="nodePersonPick" size="medium">
                  <el-radio border label="由提单人选择"></el-radio>
                  <el-radio border label="由上一节点选择"></el-radio>
                </el-radio-group>
              </el-form-item>
            </div>-->
            <div class="nodePerson" v-if="nodePersonType == '0'">
              <el-form-item>
                <el-button size="mini" @click="SET_USER_DIALOG_SHOW(true)">添加</el-button>已选 1 标签，2 成员
                <template>
                  <div class="node-person-list" v-if="nodePersons.length > 0">
                    <el-tag
                      class="selected-user"
                      size="mini"
                      v-for="user in nodePersons"
                      :key="user.userId"
                      closable
                      @close="removeUser(user)"
                    >{{user.userName}}</el-tag>
                  </div>
                </template>
              </el-form-item>
            </div>

            <!--<el-form-item label="处理人">-->
            <!--<el-radio-group v-model="nodePerson" size="small">-->
            <!--<el-radio border label="选定处理人"></el-radio>-->
            <!--<el-radio border label="部门负责人"></el-radio>-->
            <!--<el-radio border label="自由选择"></el-radio>-->
            <!--&lt;!&ndash;<el-radio border label="选定处理人"></el-radio>&ndash;&gt;-->
            <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <el-form-item label="颜色">
              <el-color-picker v-model="color"></el-color-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <select-user :selectedUser.sync="nodePersons"></select-user>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import SelectUser from "./select-user/SelectUser.vue";
import { mapMutations } from "vuex";
export default {
  name: "flowDesign",
  components: {
    SelectUser
  },
  mounted() {
    this.initG6();
  },
  props: {
    nodeTypeList: {
      type: Array,
      default: () => {
        return [
          { id: 0, label: "起止节点" },
          { id: 1, label: "常规节点" },
          { id: 2, label: "条件节点" }
        ];
      }
    },
    fixedFlows: {
      type: Array,
      default: () => []
    },
    formFlow: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      //
      folwData: {},
      fixedFlowData: [],
      //流程图
      flowGraph: {
        nodes: [
          {
            color: "#00D042",
            id: "7fd55741",
            label: "开始节点",
            nodeName: "开始节点",
            nodeType: 0,
            shape: "circle",
            rootNode: true,
            x: 320,
            y: 50
          },
          {
            color: "#F70000",
            id: "b37e8bf5",
            label: "结束节点",
            nodeName: "结束节点",
            nodeType: 0,
            shape: "circle",
            x: 320,
            y: 450
          }
        ]
        // edges: [
        //   {
        //     color: undefined,
        //     id: "c511045a",
        //     shape: "smoothArrow",
        //     source: "7fd55741",
        //     target: "b37e8bf5"
        //   }
        // ]
      },

      // 节点属性值
      nodeName: "",
      nodeType: "",
      nodePersons: [],
      nodePersonType: "", // 节点处理人类型 提单人 1 ，上节点 2，部门负责人 3，指定人 0
      nodePersonPick: "",
      nodeType: 0,
      nodeCondition: [],
      childNode: [],
      color: "",

      net: "",
      Util: "",
      activation: "", //当前激活的节点
      activeButton: "addCircle",
      isNode: false, //当前是节点
      isBlank: true, //当前是空白区
      checked: true, //网格对齐
      infoTitle: "画布", //属性标题
      oldColor: "", //获取节点本身颜色
      type: "" //有值为编辑状态
    };
  },
  methods: {
    /*
     *初始化审批图
     * */
    initG6() {
      let _this = this;
      _this.Util = G6.Util;

      // 表格插件
      let grid = _this.checked
        ? {
            forceAlign: true, // 是否支持网格对齐
            cell: 15 // 网格大小
          }
        : null;

      //创建图
      _this.net = new G6.Net({
        id: "flowChart", // 容器ID
        mode: "edit",
        grid: grid,
        width: 800, // 画布宽
        height: 800 // 画布高
      });

      /**
       *点击空白处
       */
      _this.net.on("click", ev => {
        _this.activeButton === "addCircle" && _this.addCircle();
        _this.activeButton === "addRect" && _this.addRect();
        _this.activeButton === "addRhombus" && _this.addRhombus();
        if (!_this.Util.isNull(ev.item)) {
          _this.isBlank = false;
        } else {
          _this.isBlank = true;
          _this.infoTitle = "画布";
        }
      });
      /**
       *点击节点
       */
      _this.net.on("itemclick", function(ev) {
        _this.activeButton === "addArrowSmooth" && _this.addArrowSmooth();
        _this.isNode = _this.Util.isNode(ev.item); //是否为Node
        _this.activation = ev.item;
        if (_this.isNode) {
          /* 激活节点后节点名称input聚焦*/
          //            _this.$nextTick(() => {
          //              debugger
          //              _this.$refs.inputFocus.$el.querySelector('input').focus();
          //            });
          // _this.changeMode('edit');
          _this.infoTitle = "节点";
          _this.nodeName = ev.item.get("model").nodeName;
        } else {
          _this.infoTitle = "边";
        }
        _this.color = _this.oldColor;
      });
      /**
       * 鼠标移入移出事件改变颜色
       */
      _this.net.on("itemmouseenter", ev => {
        const item = ev.item;
        _this.oldColor = item.get("model").color; //获取节点颜色
        _this.net.update(item, {
          color: "#108EE9"
        });
        _this.net.refresh();
      });
      _this.net.on("itemmouseleave", ev => {
        const item = ev.item;
        _this.net.update(item, {
          color: _this.oldColor
        });
        _this.net.refresh();
      });
      /**
       * 鼠标滚轮事件
       * */
      _this.net.on("mousewheel", ev => {
        return;
      }); //加载资源数据

      /**
       * 提示信息
       */
      /* _this.net.node().tooltip(['label', 'func', 'role', 'color']);
         _this.net.edge().tooltip(['label', 'color']);*/
      /**
       * 渲染
       */
      _this.net.source(_this.flowGraph.nodes, _this.flowGraph.edges);
      _this.net.render();
    },
    /*
     * 添加圆形（起始）节点
     * */
    addCircle() {
      this.activeButton = "addCircle";
      this.net.beginAdd("node", {
        shape: "circle",
        nodeType: 0
      });
    },
    /*
     * 添加常规节点
     * */
    addRect() {
      this.activeButton = "addRect";
      this.net.beginAdd("node", {
        shape: "rect",
        nodeType: 0
      });
    },
    /*
     * 添加条件节点
     * */
    addRhombus() {
      this.activeButton = "addRhombus";
      this.net.beginAdd("node", {
        shape: "rhombus",
        nodeType: 0
      });
    },
    /*添加直线*/
    addLine() {
      this.net.beginAdd("edge", {
        shape: "line"
      });
    },
    /*添加曲线*/
    addSmooth() {
      this.net.beginAdd("edge", {
        shape: "smooth"
      });
    },
    /*添加箭头曲线*/
    addArrowSmooth() {
      this.activeButton = "addArrowSmooth";
      this.net.beginAdd("edge", {
        shape: "smoothArrow"
      });
    },
    /*添加箭头直线*/
    addArrowLine() {
      this.net.beginAdd("edge", {
        shape: "arrow"
      });
    },
    /*添加折线*/
    addPolyLine() {
      this.net.beginAdd("edge", {
        shape: "polyLineFlow"
      });
    },
    /*拖拽与编辑模式的切换*/
    changeMode(mode) {
      this.activeButton = mode === "edit" ? "editMode" : "dragMode";
      this.net.changeMode(mode);
    },
    /*删除节点*/
    delNode() {
      this.activeButton = "";
      this.net.del();
    },
    /*保存节点*/
    save() {
      this.activeButton = "";
      let data = this.net.save();
      debugger
      console.log(data.source.nodes);
      console.log(data.source.edges);
      if (data.source.nodes.length === 0) {
        this.$message({ type: "error", message: "流图内容不能为空" });
        return false;
      }
      /* 验证节点名称*/
      for (let item of data.source.nodes) {
        if (
          item.label === "" ||
          item.label === null ||
          item.label === undefined
        ) {
          this.$message({ type: "error", message: "节点名称不能为空" });
          return false;
        }
      }
      data.source["name"] = this.workflowName;

      let flowData = data.source;
      flowData.edges.forEach(edge => {
        let sourceNode = flowData.nodes.find(node => node.id === edge.source);
        let targetNode = flowData.nodes.find(node => node.id === edge.target);
        sourceNode.childNode = targetNode;
      });
      let rootNode = flowData.nodes.find(node => node.rootNode);
      this.$emit('update:formFlow', rootNode);
      /*let json = JSON.stringify(data, null, 2);*/
      // this.$emit("saveData", data.source, this.type);
    },

    /*更新审批图*/
    updateGraph() {
      if (this.activation.get("type") === "node") {
        this.net.update(this.activation, {
          label: this.nodeName,
          color: this.color,
          nodePersonType: this.nodePersonType,
          nodePersons: this.nodePersons
        });
      } else {
        /* 根据ID取出label*/
        this.net.update(this.activation, {
          label: label,
          color: this.color,
          action: this.action
        });
      }
    },
    //清空视图
    clearView() {
      this.type = "";
      this.workflowName = "";
      this.net.changeData();
    },
    //更新数据
    source(nodes, edges, name, type) {
      this.type = type;
      this.workflowName = name;
      this.net.changeData(nodes, edges);
    },

    /**/
    addChooseClass() {},
    removeUser(user) {
      this.nodePersons.splice(this.nodePersons.indexOf(user), 1);
    },
    ...mapMutations({
      SET_USER_DIALOG_SHOW: "SET_USER_DIALOG_SHOW"
    })
  },
  watch: {
    /**
     * 监听输入框
     */
    nodeName() {
      this.updateGraph();
    },
    color() {
      this.updateGraph();
    },
    nodePersons() {},
    nodePersonType() {},
    /**
     * 网格切换
     */
    checked: function() {
      let _saveData = this.net.save();
      this.net.destroy(); //销毁画布
      this.initG6();
      this.net.read(_saveData);
      this.net.render();
    }
  }
};
</script>

<style scoped>
.flow-design {
  display: flex;
  height: 500px;
}

.operating {
  flex: 0 0 50px;
  background-color: #ffffff;
  padding: 0 10px;
  box-shadow: 1px 1px 4px 0 #0a0a0a2e;
}

.operating-btn-group {
  border-bottom: 1px solid #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 14px;
}

.operating-btn-group:last-of-type {
  border-right: 0;
}

.operating-btn-group .btn {
  margin-top: 6px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.iconfont {
  font-size: 20px;
}

.operating-btn-group .btn:hover {
  border: 1px solid #409eff;
  border-radius: 2px;
}

.active-btn {
  margin-top: 6px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #409eff;
  color: #fafafe;
}

.flow-chart {
  flex: 1;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  overflow: hidden;
}

.node-attribute {
  flex: 0 0 400px;
  box-shadow: 1px 1px 4px 0 #0a0a0a2e;
  background: rgba(247, 249, 251, 0.45);
}

.node-title {
  height: 40px;
  padding-left: 10px;
  border-top: 1px solid #dce3e8;
  border-bottom: 1px solid #dce3e8;
  border-left: 1px solid #dce3e8;
  background: rgb(235, 238, 242);
  line-height: 40px;
}

.node-attribute .content {
  background: rgba(247, 249, 251, 0.45);
  border-left: 1px solid #e6e9ed;
  padding: 10px;
}
.nodePersonPick {
  display: flex;
  flex-direction: column;
  /*background: #E4E7ED;*/
}
.node-person-list {
  text-align: left;
  /*align-items: center;*/
  /*justify-content: center;*/
  padding: 6px;
  min-height: 2rem;
  border: solid 1px #909399;
  border-radius: 2px;
}
.el-form-item {
  text-align: left;
}
</style>

