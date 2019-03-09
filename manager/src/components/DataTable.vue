<!-- 数据表格组件
 传入
 -->
<template>
  <el-table
    class="data-table"
    :data="dataList"
    @selection-change="selectionChange"
    border>
    <el-table-column
      type="selection"
      width="70">
    </el-table-column>
    <el-table-column
      v-for="(item,index) in columnData" :key="index"
      :prop="item.data" :label="item.label" :formatter="item.formatter">

    </el-table-column>
    <!--<el-table-column prop="name" label="姓名"></el-table-column>-->
    <!--<el-table-column prop="address" label="地址"></el-table-column>-->
    <el-table-column prop="" fixed="right" label="操作" width="50">
      <template slot-scope="scope">
        <el-dropdown placement="">
        <span class="more-handle">
          <i class="icon-more-handle el-icon-more"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <slot :index="scope.$index" :rowData="scope.row"></slot>
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
    columnData: {
      type: Array
    },
    selections: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {};
  },
  components: {},

  computed: {
    selected() {
      return this.selections
    }
  },

  created() {
  },

  mounted() {

  },

  methods: {
    selectionChange(val) {
//      this.selections = val;
      this.$emit('update:selections', val)
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
