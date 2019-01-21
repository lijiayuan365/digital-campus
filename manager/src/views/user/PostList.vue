<!--  -->
<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="operate-wrapper">
      <el-button type="success" size="small" round @click="showDialog('add')">新增职位</el-button>
      <el-button type="danger" size="small" round @click="batchDeletePost">删除</el-button>
    </div>
    <data-table :dataList="postList" :columnData="columnData">
      <template slot-scope="props">
        <!--<el-dropdown-item @click.native="">查看</el-dropdown-item>-->
        <el-dropdown-item @click.native="showDialog('edit',props.rowData)">编辑</el-dropdown-item>
        <el-dropdown-item @click.native="removePost(props.rowData.postId)">删除</el-dropdown-item>
      </template>
      <!--<el-dropdown-item>编辑</el-dropdown-item>-->
      <!--<el-dropdown-item>删除</el-dropdown-item>-->
    </data-table>
    <el-dialog :title="formTitle" width="30rem" center :visible.sync="isShow">
      <el-form :model="post" label-width="80px" class="post-form">
        <el-form-item label="职位名称">
          <el-input v-model="post.postName"></el-input>
        </el-form-item>
        <el-form-item label="职位类型">
          <el-select v-model="post.postType" placeholder="请选择" filterable allow-create>
            <el-option
              v-for="postType in postTypeList"
              :key="postType"
              :label="postType"
              :value="postType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="post.desc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="addPost" v-if="dialogType === 'add'">确 定</el-button>
        <el-button type="primary" @click="updatePost" v-else>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import DataTable from '../../components/DataTable.vue'
import BreadCrumb from '../../components/BreadCrumb.vue'

export default {
  data() {
    return {
      postList: [],
      post: {},
      columnData: [
        {data: "postName", label: "职位"},
        {data: "postId", label: "职位Id"},
        {data: "postType", label: "类型"},
        {data: "desc", label: "描述"},
      ],
      isShow: false,
      dialogType: '',
      formTitle: '新增职位',
      postTypeList: []
    };
  },
  components: {
    DataTable,
    BreadCrumb
  },

  computed: {},

  created() {
    this.initData();
  },

  mounted() {
  },

  methods: {
    initData() {
      this.$http('/api/user/getPostList')
        .then((res) => {
          this.postList = res.data.data;
        });
    },
    showDialog(type, post) {
      this.dialogType = type;
      this.$http('/api/user/getPostTypeList')
        .then((res) => {
          this.postTypeList = res.data.data;
        });
      if (type === 'edit') {
        this.formTitle = '编辑职位';
        this.post = post;
      } else {
        this.formTitle = '新增职位';
        this.post = {};
      }
      this.isShow = true;
    },
    addPost() {
      this.$http.post('/api/user/addPost', this.post)
        .then((res) => {
          this.$notify({
            title: '提示',
            message: '新增职位信息成功',
            type: 'success',
            duration: 2000
          })
        })
    },
    updatePost() {
      let post = this.post;
      this.$http.post('/api/user/updatePost', post)
        .then((res) => {
          this.$notify({
            title: '提示',
            message: '更新职位信息成功',
            type: 'success',
            duration: 2000
          })
        });
    },
    removePost(postId) {
      this.$http.post('/api/user/deletePost', {postId: postId})
        .then((res) => {
          this.$notify({
            title: '提示',
            message: '删除职位信息成功',
            type: 'success',
            duration: 2000
          })
        })
    },
    batchDeletePost() {

    }
  }
}
</script>

<style scoped>
  .operate-wrapper {
    margin: 1.5rem 0;
    display: flex;
  }

  .post-form {
    /*width: 30rem;*/
  }

  .post-form .el-select {
    width: 100%;
  }
  .add-type{
    /*margin-left: .5rem;*/
    font-size: .5rem;
    font-weight: 700;
    color:#409EFF;
  }
</style>
