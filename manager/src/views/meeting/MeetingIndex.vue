<!--  -->
<template>
  <div>
    <div class="table-btn-wrapper">
      <el-button type="info" size="small" round>删除</el-button>
    </div>
    <data-table :dataList="meetings" :columnData="columnData" :expandColumn="expandColumn">
      <template slot-scope="props">
        <el-dropdown-item @click.native="removeMeeting(props.index, props.rowData)">删除</el-dropdown-item>
        <!--<el-dropdown-item @click.native="exportMeeting(props.index, props.rowData)">导出</el-dropdown-item>-->
      </template>
    </data-table>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import DataTable from '../../components/DataTable.vue';

export default {
  data() {
    return {
      meetings: [],
      columnData: [
        {data: 'title', label: '标题'},
        {data: 'creator.userName', label: '创建人'},
        {data: 'createTime', label: '创建时间'},
        {data: 'meetingRoom', label: '会议室'},
        {data: 'startTime', label: '开始时间'},
        {data: 'endTime', label: '结束时间'},
        {data: 'status', label: '状态', formatter: (row, col) => row.status === 1 ? '发布' : '草稿'},
      ],
      expandColumn: [
        {data: 'title', label: '标题'},
        {data: 'creator.userName', label: '创建人'},
        {data: 'createTime', label: '创建时间'},
        {data: 'meetingRoom', label: '会议室'},
        {data: 'startTime', label: '开始时间'},
        {data: 'endTime', label: '结束时间'},
        {data: 'desc', label: '会议内容'},
        {data: 'status', label: '状态', formatter: (row, col) => row.status === 1 ? '发布' : '草稿'},
      ]
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
      this.$http.get('/api/meeting/getMeetingList').then((res) => {
        let data = res.data;
        this.meetings = data.data;

      });
    },
//    getMeeting() {
//
//    },
//    exportMeeting() {
//
//    },
    removeMeeting(index, rowData) {
      let _this = this;
      let meetingId = rowData._id;
      this.$confirm('删除该会议记录', '删除记录').then(() => {
        this.$http.post('/api/meeting/removeMeeting', {meetingId: meetingId}).then(res => {
          this.$message({
            message: '删除成功',
            duration: 1500,
            type: 'success',
          });
          _this.initData();
        });
      }).catch(() => {
      });
    }
  }
};
</script>

<style scoped>

</style>
