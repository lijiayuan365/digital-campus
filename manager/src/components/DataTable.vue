<!-- 数据表格组件
 传入
 -->
<template>
  <el-table
    class="data-table"
    :data="dataList"
    @selection-change="selectionChange"
    border="border">
    <el-table-column type="expand" v-if="expandColumn.length > 0">
      <template slot-scope="props">
        <el-form v-for="(item,index) in expandColumn" :key="index"
                 label-position="left" inline class="demo-table-expand">
          <el-form-item :label="item.label">
            <span>{{props.row[item.data]}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column v-if="showSelect"
                     type="selection"
                     width="70">
    </el-table-column>
    <el-table-column
      v-for="(item,index) in columnData" :key="index"
      :prop="item.data" :label="item.label" :formatter="item.formatter">

    </el-table-column>
    <!--<el-table-column prop="name" label="姓名"></el-table-column>-->
    <!--<el-table-column prop="address" label="地址"></el-table-column>-->
    <el-table-column prop="" fixed="right" label="操作" width="50" v-if="showOpa">
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
    expandColumn: {
      type: Array,
      default: () => {
        return [];
      }

    },
    border:{
      type:Boolean,
      default:true,
    },
    showSelect: {
      type: Boolean,
      default: true,
    },
    showOpa: {
      type: Boolean,
      default: true,
    },
    selections: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {},

  computed: {
    selected() {
      return this.selections;
    }
  },

  created() {
  },

  mounted() {

  },

  methods: {
    selectionChange(val) {
//      this.selections = val;
      this.$emit('update:selections', val);
    }
  }
};
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
