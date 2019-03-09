<!--  -->
<template>
  <div>
    <div class="operate-wrapper">
      <el-button type="success" size="small" round @click="$router.push({path:'fixed-flow/detail',query:{type:'add'}})">新增固定流程</el-button>
      <!-- <el-button type="danger" size="small" round @click="batchDeleteUser">删除</el-button> -->
    </div>
    <data-table :dataList="flows" :columnData="columnData">
      <template slot-scope="props">
        <el-dropdown-item v-if="props.rowData.status === 0" @click.native="addFlow(props.index, props.rowData)">发布</el-dropdown-item>
        <el-dropdown-item v-else @click.native="saveDraft(props.index, props.rowData)">取消发布</el-dropdown-item>
        <el-dropdown-item @click.native="editFlow(props.index, props.rowData)">编辑</el-dropdown-item>
        <el-dropdown-item @click.native="delFlow(props.index, props.rowData)">删除</el-dropdown-item>
      </template>
    </data-table>
  </div>
</template>
<script>/* eslint-disable indent,semi */
//import BreadCrumb from '../../components/BreadCrumb.vue'
import DataTable from '../../components/DataTable.vue'

export default {
  data() {
    return {
      columnData: [
        {data: "flowName", label: "名称"},
        {data: "flowGroup", label: "分组"},
        {data: "createTime", label: "创建时间"},
        {data: "status", label: "状态",formatter:(row,col)=> row.status === 1 ? '发布':'草稿'}
      ],
      flows: [],
    };
  },
  components: {
//    BreadCrumb,
    DataTable,
  },

  computed: {},

  created() {
    this.initData();
  },

  mounted() {
  },

  methods: {
    initData(){
      this.$http.get('/api/fixed-flow/getFixedFlowList').then((res)=>{
        let data = res.data.data;
        this.flows = data;
      })
    },
    saveDraft(index,data){
      data.status = 0;
      this.$http.post('/api/fixed-flow/updateFixedFlow', {flowData: data}).then((res) => {
        this.$message({
          message: '取消发布成功',
          duration: 1500,
          type: 'success',
        });
        this.initData();
      });
    },
    addFlow(index,data){
      data.status = 1;
      this.$http.post('/api/fixed-flow/updateFixedFlow', {flowData: data}).then((res) => {
        this.$message({
          message: '发布成功',
          duration: 1500,
          type: 'success',
        });
        this.initData();
      });
    },
    editFlow(index,data){
      let flowId = data._id;
      this.$router.push({
        path:'fixed-flow/detail',
        query:{
          flowId:flowId,
          type:'edit'
        }
      });
    },
    delFlow(index,data){
      this.$confirm('删除该流程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let flowId = data._id;
        this.$http.post('/api/fixed-flow/removeFixedFlow',{flowId}).then((res)=>{
          this.$message({
            message: '删除流程成功',
            duration:1500,
            type: 'success',
          });
          this.initData();
        });
      }).catch(() => {
//        this.$message({
//          type: 'info',
//          duration:1500,
//          message: '已取消删除'
//        });
      });

    }
  }
}
</script>

<style scoped>
  .operate-wrapper {
    margin-bottom: 1.5rem;
    display: flex;
  }
</style>
