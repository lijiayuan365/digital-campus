<!--  -->
<template>
  <div>
    <bread-crumb>
      <template>
        <el-breadcrumb-item :to="{ path: '/fixed-flow' }">固定流程</el-breadcrumb-item>
        <el-breadcrumb-item>新建流程</el-breadcrumb-item>
      </template>
    </bread-crumb>
    <div class="flow-form">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="流程名称" prop="pass">
          <el-input :model="flowName"></el-input>
        </el-form-item>
        <el-form-item label="流程分组" prop="checkPass">
          <el-select v-model="flowGroup" placeholder="请选择">
            <el-option
              v-for="item in flowGroups"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="flowDesc">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addFixedFlow('ruleForm2')">提交</el-button>
          <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import BreadCrumb from '../../components/BreadCrumb.vue'

export default {
  data() {
    return {
      flowGroups:[],
      fixedFlow: {},
      flowName:'',
      flowGroup:'',
      flowDesc:'',
    };
  },
  components: {
    BreadCrumb,
  },

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {
    addFixedFlow() {

    }
  }
}
</script>

<style scoped>
  .flow-form {
    width: 30rem;
  }
</style>
