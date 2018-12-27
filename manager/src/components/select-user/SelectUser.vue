<!--  -->
<template>
  <div>
    <el-dialog
      title="选择对象"
      :visible="showUserDialog"
      width="600px"
      @open="openDialog"
      @close="closeDialog">
      <div class="user-box">
        <el-tag
          class="selected-user"
          v-for="user in selectedUserTmp"
          :key="user.userId"
          closable
          @close="removeUser(user)">
          {{user.userName}}
        </el-tag>
      </div>
      <el-tabs
        v-model="activeName"
        :stretch=true
        class=""
        @tab-click="switchTab">
        <el-tab-pane label="全部" name="all">
          <div class="user-list">
            <ul>
              <li class="user-item">
                <div class="user-name">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </div>
                <el-checkbox></el-checkbox>
              </li>
              <li v-for="(user,index) in userList" class="user-item">
                <img :src="user.avatar" width="24" height="24" class="user-avatar">
                <p class="user-name">{{user.userName}}</p>
                <el-checkbox v-model="user.checked" @change="addUser(user)"></el-checkbox>
              </li>
            </ul>
          </div>
          <!--<el-table-->
          <!--:data="tableData"-->
          <!--@toggleRowSelection="selectionChange"-->
          <!--:max-height="300"-->
          <!--style="width: 100%">-->
          <!--<el-table-column-->
          <!--type="selection"-->
          <!--label="全选"-->
          <!--width="55">-->
          <!--</el-table-column>-->
          <!--<el-table-column min-width="20%" label="姓名">-->
          <!--&lt;!&ndash;<template slot="header" slot-scope="slot">&ndash;&gt;-->
          <!--&lt;!&ndash;{{ slot }}&ndash;&gt;-->
          <!--&lt;!&ndash;</template>&ndash;&gt;-->
          <!--<template slot-scope="scope">-->
          <!--<div class="user-item">-->
          <!--<img :src="scope.row.avatar" width="24" height="24"/>-->
          <!--<p class="user-name">{{scope.row.userName}}</p>-->
          <!--</div>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--</el-table>-->
        </el-tab-pane>
        <el-tab-pane label="部门" name="dept">
          <div class="dept-filter">
            <div class="dept-list">
              <!--<ul>-->
              <!--<li class="dept-item" v-for="(dept, index) in deptList">-->
              <!--{{dept.deptName}}-->
              <!--</li>-->
              <!--</ul>-->
              <el-tree :data="deptList" :props="deptTreeProps" @node-click="deptNodeClick"></el-tree>
            </div>
            <div class="user-list" :class="{ 'no-data':userList.length === 0}">
              <ul>
                <li class="user-item">
                  <div class="user-name">
                    <el-input
                      v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索"/>
                  </div>
                  <el-checkbox></el-checkbox>
                </li>
                <li v-for="(user,index) in userList" class="user-item">
                  <img :src="user.avatar" width="24" height="24" class="user-avatar">
                  <p class="user-name">{{user.userName}}</p>
                  <el-checkbox v-model="user.checked" @change="addUser(user)"></el-checkbox>
                </li>
              </ul>
              <div>
                <!--<el-table-->
                <!--:data="tableData"-->
                <!--@selection-change="selectionChange"-->
                <!--:max-height="300"-->
                <!--style="width: 600px">-->
                <!--<el-table-column-->
                <!--type="selection"-->
                <!--label="全选"-->
                <!--width="55">-->
                <!--</el-table-column>-->
                <!--<el-table-column min-width="20%" label="姓名">-->
                <!--&lt;!&ndash;<template slot="header" slot-scope="slot">&ndash;&gt;-->
                <!--&lt;!&ndash;{{ slot }}&ndash;&gt;-->
                <!--&lt;!&ndash;</template>&ndash;&gt;-->
                <!--<template slot-scope="scope">-->
                <!--<div class="user-item">-->
                <!--<img :src="scope.row.avatar" width="24" height="24"/>-->
                <!--<p class="user-name">{{scope.row.userName}}</p>-->
                <!--</div>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--</el-table>-->
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="组织" name="org" class="tab-container">
          <div class="org-filter">
            <div class="org-list">
              <ul>
                <li class="org-item" v-for="(org, index) in orgList" @click="getUserList('org',org.orgId)">
                  {{org.orgName}}
                </li>
              </ul>
            </div>
            <div class="user-list" :class="{'no-data':userList.length === 0}">
              <div class="user-list">
                <ul>
                  <li class="user-item">
                    <div class="user-name">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </div>
                    <el-checkbox></el-checkbox>
                  </li>
                  <li v-for="(user,index) in userList" class="user-item">
                    <img :src="user.avatar" width="24" height="24" class="user-avatar">
                    <p class="user-name">{{user.userName}}</p>
                    <el-checkbox v-model="user.checked" @change="addUser(user)"></el-checkbox>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--<el-table :data="gridData">-->
      <!--<el-table-column property="date" label="日期" width="150"></el-table-column>-->
      <!--<el-table-column property="name" label="姓名" width="200"></el-table-column>-->
      <!--<el-table-column property="address" label="地址"></el-table-column>-->
      <!--</el-table>-->
      <div class="btn-wrapper">
        <el-button @click="commitUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  /* eslint-disable indent,semi */
  import {mapState, mapMutations} from "vuex";

  export default {
    props: {
      selectedUser: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        //      showUserDialog:this.$store.state.SelectUser.isShow
        activeName: "all",
        deptList: [],
        deptTreeProps: {
          children: "childDept",
          label: "deptName",
        },
        orgList: [],
        userList: [],
        search: "",
//        selectedUserTmp:this.selectedUser
      };
    },
    components: {},

    computed: {
      selectedUserIds(){
        let selectedUserIds = this.selectedUserTmp.map(user => {return user._id});
        return selectedUserIds;
      },
      userIds(){
        let userIds = this.userList.map(user => {return user._id});
        return userIds;
      },
      selectedUserTmp:{
        get: function () {
          if(this.selectedUser){
//            return [...this.selectedUser];
            return [];
          }
//          debugger
//          let newList = this.selectedUser.map(user => user);
//          return newList;
//          let newList =[...this.selectedUser];
//          return newList;
//          return JSON.parse(JSON.stringify(this.selectedUser));
        },
        set:function (user) {
//          let checked = user.checked;
//          this.checked = checked;
          this.selectedUser = user
        }
      },
      // vuex 操作
      ...mapState({
        showUserDialog: state => state.SelectUser.isShow
      })
    },

    created() {
    },

    mounted() {
      this.selectedUserTmp = this.selectedUser;
    },

    methods: {
      // 关闭模态框
      closeDialog() {
        this.SET_USER_DIALOG_SHOW(false);
      },
      // 打开模态框
      openDialog() {
        this.getUserList();
      },
      /**
       * 切换tab
       * @param tab
       * @param event
       */
      switchTab(tab) {
        let _this = this;
        let tabName = tab.name;
        if (tabName === 'dept') {
          this.$http.get('/api/user/getDeptTree').then(res => {
            res = res.data;
            _this.deptList = res.data;
          });
          this.getUserList();
        } else if (tabName === 'org') {
          this.$http.get('/api/user/getOrgList').then(res => {
            res = res.data;
            _this.orgList = res.data;
          });
          this.getUserList();
        } else {
          this.getUserList();
        }
      },
      deptNodeClick(nodeObj) {
        let deptId = nodeObj.deptId;
        this.getUserList('dept', deptId);
      },
      /**
       * 获取用户列表
       * @param type
       * @param key
       */
      getUserList(type, id) {
        let _this = this;
        this.$http.get("/api/user/getUserList", {params: {type: type, id: id}}).then(res => {
          res = res.data;
          _this.userList = res.data;
          // 处理已选的用户
          _this.userList.forEach(user =>{
            if(_this.selectedUserIds.includes(user.userId)){
              user.checked = true;
            }
          });
        });
      },
      /**
       * 添加选定用户
       * @param user
       */
      addUser(user) {
        if (user.checked) {
          this.selectedUserTmp.push(user);
        } else {
          this.selectedUserTmp.splice(this.selectedUserIds.indexOf(user._id), 1);
        }
      },
      /**
       * 从已选用户中移除用户
       * @param user
       */
      removeUser(user) {
        this.selectedUserTmp.splice(this.selectedUserTmp.indexOf(user), 1);
        this.userList[this.userIds.indexOf(user.userId)].checked = false;
      },
      /**
       * 提交选定用户
       */
      commitUser() {
        this.SET_USER_LIST(this.selectedUserTmp);
        this.$emit("update:selectedUser", this.selectedUserTmp);
        this.closeDialog();
      },
      /**
       * vuex 操作
       */
      ...mapMutations({
        SET_USER_LIST: "SET_USER_LIST",
        SET_USER_DIALOG_SHOW: "SET_USER_DIALOG_SHOW"
      })
    },
//    watch:{
//      selectedUser(val){
//        this.selectedUserTmp = val;
//      }
//    }
  };
</script>

<style scoped>
  .user-box {
    text-align: left;
    padding: 6px;
    min-height: 2rem;
    border: solid 1px #909399;
    border-radius: 2px;
  }

  .selected-user {
    margin: 6px 6px 0 0;
  }

  .org-filter,
  .dept-filter {
    display: flex;
  }

  .org-list,
  .dept-list {
    height: 300px;
    width: 40%;
    border-right: solid 1px rgba(125, 125, 125, 0.5);
    overflow: auto;
  }

  .org-item,
  .dept-item {
    padding: .5rem;
    border-bottom: solid 1px #ebeef5;
    font-size: 1rem;
    text-align: left;
    cursor: pointer;
  }

  .user-list {
    flex: 1;
    /*width: 60%;*/
    height: 300px;
    overflow: auto;
  }

  .user-item {
    padding: .5rem;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #ebeef5;
  }

  .user-avatar {
    margin-right: 10px;
  }

  .user-name {
    margin-right: auto;
    font-size: 1rem;
  }

  .btn-wrapper {
    padding-top: 1rem;
    border-top: 1px solid #c0c4cc;
  }
  .no-data{
    background: url("../../assets/no-data.png") no-repeat center;
  }
</style>
