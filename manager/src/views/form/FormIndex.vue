<!--  -->
<template>
  <div>
    <div class="operate-wrapper">
      <el-button type="success" size="small" round @click="$router.push({path:'/form-flow/design',query:{type:'add'}})">新增表单</el-button>
      <!-- <el-button type="danger" size="small" round @click="batchDeleteUser">删除</el-button> -->
    </div>
    <data-table :dataList="forms" :columnData="columnData">
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
        forms: [],
        columnData: [
          {data: "formName", label: "姓名"},
          {data: "creator", label: "创建者"},
          {data: "formGroup", label: "分组"},
          {
            data: "formType",
            label: "类型",
            formatter: (row, col) => row.formType === 0 ? '普通单' : row.formType === 1 ? '审批单' : '任务单'
          },
          {data: "data", label: "明细"},
          {data: "status", label: "状态", formatter: (row, col) => row.status === 0 ? '草稿' : '发布'}
        ]
      };
    },
    components: {
      DataTable
    },

    computed: {},

    created() {
      this.initData();
    },

    mounted() {
    },

    methods: {
      initData() {
        this.$http.get('/api/form/getFormList').then((res) => {
          let data = res.data.data;
          this.forms = data;
        });
      },
      editForm(index, rowData) {
        this.$router.push({
          path: "/form-flow/design",
          query: {
            formId: rowData._id,
            type: "edit"
          }
        });
      },
      delForm(index, rowData) {
        this.$confirm('删除该表单', '提示').then(() => {
          let formId = rowData._id;
          this.$http.post('/api/form/removeForm', {formId}).then((res) => {
            this.$message({
              message: '删除表单成功',
              duration: 1500,
              type: 'success',
            });
            this.initData();
          });
        }).catch(() => {

        });
      }
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
