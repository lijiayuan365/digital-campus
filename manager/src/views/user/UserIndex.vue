<!--  -->
<template>
  <div class="manager-user">
    <div class="dept-tree">
      <el-tabs v-model="activeName" @tab-click="checkTab()" :stretch="true" class="dept-tab">
        <el-tab-pane label="部门" name="dept">
          <div class="search-box">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          </div>
          <el-tree
            class="filter-tree"
            :data="deptTree"
            :props="defaultProps"
            @node-click="getDeptUserList"
            :filter-node-method="filterNode"
            ref="deptTree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{node.label}}</span>
              <el-dropdown>
                <i class="el-icon-menu"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="toDeptDetail(node.data.deptId,'add')">新增子部门</el-dropdown-item>
                  <el-dropdown-item @click.native="toDeptDetail(node.data.deptId,'edit')">编辑</el-dropdown-item>
                  <!--<el-dropdown-item @click.native="toDeptDetail(node.data.deptId,'detail')">查看</el-dropdown-item>-->
                  <el-dropdown-item
                    @click.native="deleteOperate('dept',node.data.deptId)"
                    v-if="node.level !== 1"
                  >删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="组织" name="org">
          <div class="btn-wrapper" style="text-align:left">
            <el-button @click="toOrgDetail('add')" type="success" round size="mini">新增组织</el-button>
          </div>
          <ul class="org-list">
            <li class="org-item" v-for="(org,index) in orgList" :key="index">
              <!-- <el-button icon="el-icon-edit" type="info" plain size="mini"> -->
              <!-- <template> -->
              {{org.orgName}}
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-menu" style="z-index:10"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="toOrgDetail('edit',org.orgId)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteOperate('org',org.orgId)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- </template> -->
              <!-- </el-button> -->
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="user-table">
      <div class="operate-wrapper">
        <el-button type="success" size="small" round @click="addUser">新增成员</el-button>
        <el-button type="danger" size="small" round @click="batchDeleteUser">删除</el-button>
      </div>
      <data-table :dataList="userList" :columnData="columnData" :selections.sync="selectedUsers">
        <template slot-scope="props">
          <el-dropdown-item @click.native="toUserDetail(props.rowData.userId, 'detail')">查看</el-dropdown-item>
          <el-dropdown-item @click.native="toUserDetail(props.rowData.userId, 'edit')">编辑</el-dropdown-item>
          <el-dropdown-item @click.native="deleteUser(props.index, props.rowData)">删除</el-dropdown-item>
        </template>
      </data-table>
    </div>
  </div>
</template>
<script>
  /* eslint-disable indent,semi */
  import DataTable from "../../components/DataTable.vue";

  export default {
    components: {
      DataTable
    },

    data() {
      return {
        activeName: "dept",
        filterText: "",
        deptTree: [],
        orgList: [],
        defaultProps: {
          children: "childDept",
          label: "deptName",
          isLeaf: "isLeaf"
        },
        userList: [],
        columnData: [
          {data: "userName", label: "姓名"},
          {data: "_id", label: "用户Id"},
          {data: "post.postName", label: "职位"},
          {data: "tel", label: "电话"},
          {data: "email", label: "邮箱"}
        ],
        selectedUsers: []
      };
    },
    computed: {},

    created() {
      this.initData();
      // var ws = new WebSocket("wss://echo.websocket.org");
//    var ws = new WebSocket('ws://127.0.0.1:8000');
//    ws.onopen = function(evt) {
//      console.log("Connection open ...");
//      ws.send("Hello WebSockets!");
//    };
//
//    ws.onmessage = function(evt) {
//      console.log("Received Message: " + evt.data);
//      ws.close();
//    };
//
//    ws.onclose = function(evt) {
//      console.log("Connection closed.");
//    };
    },

    mounted() {
    },

    methods: {
      initData() {
        if (this.$route.query.activeName === "org") {
          this.activeName = "org";
          this.getOrgList();
        } else {
          this.getDeptTree();
          this.getUserList();
        }
      },
      // 过滤部门
      filterNode(value, data) {
        if (!value) return true;
        return data.deptName.indexOf(value) !== -1;
      },
      // 切换tab
      checkTab() {
        if (this.activeName === "dept") {
          this.getDeptTree();
          this.getUserList();
        } else {
          this.getOrgList();
        }
      },
      /**
       *
       */
      getDeptTree() {
        this.$http.get("/api/user/getDeptTree").then(res => {
          res = res.data;
          this.deptTree = res.data;
        });
      },
      getOrgList() {
        this.$http.get("/api/user/getOrgList").then(res => {
          this.orgList = res.data.data;
        });
      },
      getUserList(searchType, searchId) {
        this.$http.get("/api/user/getUserList", {
          params: {type: searchType, id: searchId}
        }).then(result => {
          let res = result.data;
          this.userList = res.data;
        });
      },
      getDeptUserList(data) {
        let deptId = data.deptId;
        this.$http.get("/api/user/getUserList", {params: {type: "dept", id: deptId}}).then(result => {
          let res = result.data;
          this.userList = res.data;
        });
      },
      addUser() {
        this.$router.push({
          path: "/user/detail",
          query: {
            type: "add"
          }
        });
      },
      toUserDetail(userId, type) {
        this.$router.push({
          path: "/user/detail",
          query: {
            userId: userId,
            type: type
          }
        });
      },
      toDeptDetail(deptId, type) {
        this.$router.push({
          path: "/user/dept-detail",
          query: {
            deptId: deptId,
            type: type
          }
        });
      },
      toOrgDetail(type, orgId) {
        this.$router.push({
          path: "/user/org-detail",
          query: {
            orgId: orgId,
            type: type
          }
        });
      },
      // 刪除用戶
      deleteUser(index, rowData) {
        let userId = rowData.userId;
        this.$confirm("删除该用户", "删除用户").then(() => {
          this.$http.post("/api/user/deleteUser", {userId: userId}).then(res => {
            this.$message({
              message: '删除成功',
              duration: 1500,
              type: 'success',
            });
          });
        }).catch(() => {
        });
      },
      // 批量刪除
      batchDeleteUser() {
        let userIds = [];
        this.selectedUsers.forEach(item => {
          userIds.push(item.userId);
        });
        this.$http.post("/api/user/batchDeleteUser", {userIds: userIds}).then(res => {
          this.$message({
            message: '删除成功',
            duration: 1500,
            type: 'success',
          });
        });
        console.log(this.selectedUsers);
      },
      deleteOperate(type, id) {
        let deleteTip = type === 'dept' ? '删除该部门及其所有的子部门' : '删除该组织';
        let url = type === 'dept' ? '/api/user/removeDept' : '/api/user/removeOrg';
        let param = type === 'dept' ? {deptId: id} : {orgId: id};
        this.$confirm(deleteTip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url, param).then((res) => {
            this.$message({
              message: '删除成功',
              duration: 1500,
              type: 'success',
            });
            type === 'dept' && this.initData();
            type === 'org' && this.getOrgList();
          });
        }).catch(() => {

        });
      },
    },
    watch: {
      filterText(val) {
        this.$refs.deptTree.filter(val);
      }
    }
  };
</script>

<style scoped>
  .manager-user {
    display: flex;
    height: 100%;
    min-height: 600px;
  }

  .dept-tree {
    flex: 0 0 180px;
    padding: 0 16px;
    background: #f2f6fc;
    /*border: solid 1px;*/
  }

  .org-item {
    padding: 5px 0;
    text-align: left;
  }

  .search-box {
    margin-bottom: 1rem;
  }

  .operate-wrapper {
    margin-bottom: 1.5rem;
    display: flex;
  }

  .user-table {
    margin-left: 1.5rem;
    flex: 1 0 31rem;
  }
</style>
