<template>
  <div>
    <bread-crumb>
      <template>
        <el-breadcrumb-item :to="{ path: '/user',query:{activeName:'org'} }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </template>
    </bread-crumb>
  </div>
</template>

<script>
import BreadCrumb from '../../components/BreadCrumb.vue'
export default {
  components:{
    BreadCrumb
  },
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<stylescoped>
</style>