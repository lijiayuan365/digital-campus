<!--  -->
<template>
  <div>
    <el-button>表单设计</el-button>
    <div class="design-wrapper">
      <flow-design></flow-design>
    </div>
    <el-button>保存</el-button>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import FlowDesign from '../../components/FlowDesign.vue'
export default {
  data() {
    return {};
  },
  components: {
    FlowDesign
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
.design-wrapper{
  margin: 0 50px;
}
</style>
