<!--  -->
<template>
  <div>
    表单流
    <data-table :dataList="dataList">
      <template slot-scope="props">
        <el-dropdown-item @click.native="test(props.index, props.rowData)">编辑</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </template>
        <!--<el-dropdown-item>编辑</el-dropdown-item>-->
        <!--<el-dropdown-item>删除</el-dropdown-item>-->
    </data-table>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import DataTable from '../../components/DataTable.vue'

export default {
  data() {
    return {
      dataList: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      handleConfig: [
        {
          text: '复制'
        },
        {
          text: '编辑'
        }
      ]
    };
  },
  components: {
    DataTable,
  },

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {
    test(index, rowData) {
      console.log(index);
      console.log(rowData);
    }
  }
}
</script>

<style scoped>
  .more-handle {
    text-align: center;
  }

  .icon-more-handle {
    font-size: 20px;
    text-align: center;
    color: #969896;
  }

  .icon-more-handle:hover {
    color: #00B7FF;
  }
</style>
