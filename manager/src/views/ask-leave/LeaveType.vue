<!--  -->
<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item :to="{ path: '/ask-leave/setting' }">请假设置</el-breadcrumb-item>
      <el-breadcrumb-item>请假类型设置</el-breadcrumb-item>
    </bread-crumb>
    <div class="table-btn-wrapper">
      <el-button size="small" type="success" round>操作</el-button>
    </div>
    <data-table :dataList="types" :columnData="columnData">

    </data-table>
  </div>

</template>
<script>/* eslint-disable indent,semi */
import DataTable from '../../components/DataTable.vue';
import BreadCrumb from '../../components/BreadCrumb.vue'
export default {
    data() {
        return {
          types:[],
          columnData:[
            {data:'typeName',label:'名称'},
            {data:'typeTitle',label:'标题'},
            {data:'createTime',label:'创建时间'},
            {data:'status',label:'状态'},
          ],
        };
    },
    components: {
      DataTable,
      BreadCrumb,
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

</style>
