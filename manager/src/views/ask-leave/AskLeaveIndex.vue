<!--  -->
<template>
  <div>
    <div class="table-btn-wrapper">
      <el-button size="small" type="info">删除</el-button>
    </div>
    <data-table :dataList="leaves" :columnData="columnData">
      <template slot-scope="props">
        <el-dropdown-item @click.native="getLeave(props.index, props.rowData)">详情</el-dropdown-item>
        <!--<el-dropdown-item @click.native="exportLeave(props.index, props.rowData)">导出</el-dropdown-item>-->
        <el-dropdown-item @click.native="removeLeave(props.index, props.rowData)">删除</el-dropdown-item>
      </template>
    </data-table>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import DataTable from '../../components/DataTable.vue';

export default {
  data() {
    return {
      leaves: [],
      columnData: [
        {data: 'creator.userName', label: '发起人'},
        {data: 'leaveType', label: '类型'},
        {data: 'leaveTitle', label: '标题'},
        {data: 'leaveTime', label: '时长'},
        {data: 'status', label: '状态', formatter: (row, col) => row.status === 0 ? '审批中' : '成功批假'},
        {data: 'startTime', label: '开始时间'},
        {data: 'endTime', label: '结束时间'},
      ],
    };
  },
  components: {
    DataTable,
  },

  computed: {},

  created() {
    this.initData();
  },

  mounted() {
  },

  methods: {
    initData() {
      this.$http.get('/api/ask-leave/getAskLeaveList').then((res) => {
        let data = res.data;
        this.leaves = data.data;
      });
    },
    getLeave(index, rowData) {
      this.$router.push({
        path: '/ask-leave/detail',
        query: {
          leaveId: rowData._id,
          type: 'detail'
        }
      });
    },
    removeLeave(index, rowData) {
      let _this = this;
      let leaveId = rowData._id;
      this.$confirm('删除该请假记录', '删除记录').then(() => {
        this.$http.post('/api/ask-leave/removeAskLeave', {leaveId}).then(res => {
          this.$message({
            message: '删除成功',
            duration: 1500,
            type: 'success',
          });
          _this.initData();
        });
      }).catch(() => {
      });
    },
    exportLeave(index, rowData) {

    },
  }
};
</script>

<style scoped>

</style>
