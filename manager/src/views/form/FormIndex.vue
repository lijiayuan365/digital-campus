<!--  -->
<template>
  <div>表单流
    <div class="operate-wrapper">
      <el-button type="success" size="small" round @click="$router.push({path:'/form-flow/design'})">新增表单</el-button>
      <!-- <el-button type="danger" size="small" round @click="batchDeleteUser">删除</el-button> -->
    </div>
    <data-table :dataList="dataList" :columnData="columnData">
      <template slot-scope="props">
        <el-dropdown-item @click.native="editForm(props.index, props.rowData)">编辑</el-dropdown-item>
        <el-dropdown-item @click.native="delForm(props.index, props.rowData)">删除</el-dropdown-item>
      </template>
      <!--<el-dropdown-item>编辑</el-dropdown-item>-->
      <!--<el-dropdown-item>删除</el-dropdown-item>-->
    </data-table>
  </div>
</template>
<script>
/* eslint-disable indent,semi */
import DataTable from "../../components/DataTable.vue";

export default {
  data() {
    return {
      rowData: [],
      dataList: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      columnData: [
        { data: "formName", label: "姓名" },
        { data: "creator", label: "创建者" },
        { data: "group", label: "分组" },
        { data: "type", label: "类型" },
        { data: "data", label: "明细" },
        { data: "status", label: "状态" }
      ]
    };
  },
  components: {
    DataTable
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    editForm(index, rowData) {
      this.$router.push({
        path: "/form-flow/design",
        query: {
          formId: rowData.formId,
          type: "edit"
        }
      });
    },
    delForm(index, rowData) {}
  }
};
</script>

<style scoped>
.operate-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
}
.more-handle {
  text-align: center;
}

.icon-more-handle {
  font-size: 20px;
  text-align: center;
  color: #969896;
}

.icon-more-handle:hover {
  color: #00b7ff;
}
</style>
