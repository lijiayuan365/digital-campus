<!--  -->
<template>
  <div>
    <div class="setting-wrapper">
      <div class="setting-item">
        <div class="setting-content">职位设置</div>
        <router-link to="post">设置</router-link>
      </div>
    </div>
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
  .setting-item{
    display: flex;
    margin: 0 3rem;
    padding: 0 1rem;
    height: 2.5rem;
    border-bottom: solid 1px rgba(0,0,0,0.2);
    align-items: center;
  }
  .setting-content{
    margin-right: auto;
  }
</style>
