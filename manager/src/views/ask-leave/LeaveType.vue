<!--  -->
<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item :to="{ path: '/ask-leave/setting' }">请假设置</el-breadcrumb-item>
      <el-breadcrumb-item>请假类型设置</el-breadcrumb-item>
    </bread-crumb>
    <div class="table-btn-wrapper">
      <el-button size="small" type="success" round @click="addType">新增请假类型</el-button>
    </div>
    <data-table :dataList="types" :columnData="columnData">
      <template slot-scope="props">
        <el-dropdown-item @click.native="editType(props.index, props.rowData)">编辑</el-dropdown-item>
        <el-dropdown-item @click.native="delType(props.index, props.rowData)">删除</el-dropdown-item>
      </template>
    </data-table>
  </div>

</template>
<script>/* eslint-disable indent,semi */
import DataTable from '../../components/DataTable.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';

export default {
  data() {
    return {
      types: [],
      columnData: [
        {data: 'typeName', label: '名称'},
        {data: 'typeTitle', label: '标题'},
        {data: 'createTime', label: '创建时间'},
        {data: 'status', label: '状态', formatter: (row, col) => row.status === 0 ? '草稿' : '发布'},
      ],
    };
  },
  components: {
    DataTable,
    BreadCrumb,
  },

  computed: {},

  created() {
    this.initData();
  },

  mounted() {
  },

  methods: {
    initData() {
      this.$http.get('/api/ask-leave/getLeaveTypeList').then((res) => {
        let data = res.data;
        this.types = data.data;
      });
    },
    addType(){
      this.$router.push({
        path: 'type/detail',
        query: {
          type: 'add'
        }
      });
    },
    editType(index, rowData) {
      this.$router.push({
        path: 'type/detail',
        query: {
          typeId: rowData._id,
          type: 'edit'
        }
      });
    },
    delType(index, rowData) {
      this.$confirm('删除该请假类型', '提示').then(() => {
        let typeId = rowData._id;
        this.$http.post('/api/ask-leave/removeLeaveType', {typeId}).then((res) => {
          this.$message({
            message: '删除请假类型成功',
            duration: 1500,
            type: 'success',
          });
          this.initData();
        });
      }).catch(() => {

      });
    },
  }
};
</script>

<style scoped>

</style>
