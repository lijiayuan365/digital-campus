<!--  -->
<template>
  <div>
    <div class="operate-wrapper">
      <el-button type="success" size="small" round @click="$router.push({path:'fixed-flow/detail'})">新增固定流程</el-button>
      <!-- <el-button type="danger" size="small" round @click="batchDeleteUser">删除</el-button> -->
    </div>
    <data-table :dataList="flows" :columnData="columnData">
      <template slot-scope="props">
        <el-dropdown-item @click.native="editForm(props.index, props.rowData)">编辑</el-dropdown-item>
        <el-dropdown-item @click.native="delForm(props.index, props.rowData)">删除</el-dropdown-item>
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
        {data: "formGroup", label: "分组"},
        {data: "createTime", label: "创建时间"},
        {data: "status", label: "状态"}
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
  },

  mounted() {
  },

  methods: {}
}
</script>

<style scoped>
  .operate-wrapper {
    margin-bottom: 1.5rem;
    display: flex;
  }
</style>
