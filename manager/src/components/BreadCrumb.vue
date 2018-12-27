<!--  -->
<template>
  <div class="bread-crumb-wrapper">
    <el-button size="small" @click.native="$router.go(-1)">返回</el-button>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
      <slot></slot>
    </el-breadcrumb>
  </div>
</template>
<script>/* eslint-disable indent,semi */
export default {
  data() {
    return {};
  },
  components: {},

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {}
}
</script>

<style scoped>
  .bread-crumb-wrapper {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
  }

  .bread-crumb {
    margin-left: 1rem;
  }
</style>
