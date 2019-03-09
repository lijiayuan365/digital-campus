<!--  -->
<template>
  <div>
    <div class="table-btn-wrapper">
      <el-button  type="info" size="small" round>删除</el-button>
    </div>
    <data-table :dataList="meetings" :columnData="columnData">
      <template slot-scope="props">
        <el-dropdown-item @click.native="getMeeting(props.index, props.rowData)">详情</el-dropdown-item>
        <el-dropdown-item @click.native="exportMeeting(props.index, props.rowData)">导出</el-dropdown-item>
      </template>
    </data-table>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import DataTable from '../../components/DataTable.vue'

export default {
  data() {
    return {
      meetings: [],
      columnData: [
        {data: 'meetingTitle', label: '标题'},
        {data: 'creator', label: '创建人'},
        {data: 'createTime', label: '创建时间'},
        {data: 'meetingRoom', label: '会议室'},
        {data: 'startTime', label: '开始时间'},
        {data: 'endTime', label: '结束时间'},
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
    getMeeting() {

    },
    exportMeeting() {

    },
  }
}
</script>

<style scoped>

</style>
