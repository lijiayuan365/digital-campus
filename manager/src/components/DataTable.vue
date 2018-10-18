<!--  -->
<template>
  <el-table
    class="data-table"
    :data="dataList"
    border>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column prop="date" label="日期"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column  prop="" fixed="right" label="操作" width="50">
      <template slot-scope="scope">
        <el-dropdown placement="">
        <span class="more-handle">
          <i class="icon-more-handle el-icon-more"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <slot :index="scope.$index" :rowData="scope.row"></slot>
            <!--<el-dropdown-item @click.native="test(scope.$index, scope.row)">编辑</el-dropdown-item>-->
            <!--<el-dropdown-item>删除</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>/* eslint-disable indent,semi */
export default {
  props: {
    dataList: {
      type: Array
    },
    handleConfig: {
      type: Array
    }
  },
  data() {
    return {};
  },
  components: {},

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {
    test(index, row) {
      console.log(index);
      console.log(row);
    }
  }
}
</script>

<style scoped>
  .data-table {
    line-height: 16px;
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
    color: #00B7FF;
  }
</style>
