<!--  -->
<template>
  <div class="setting-wrapper">
    <div class="setting-item">
      <div class="setting-content">
        <div class="setting-title">{{setting.title}}</div>
        <div class="setting-desc">{{setting.desc}}</div>
      </div>
      <router-link v-if="setting.path" class="set-btn" :to="setting.path">设置</router-link>
      <a v-else class="set-btn" @click="changeSetting(setting.title)">设置</a>
    </div>
  </div>
</template>
<script>/* eslint-disable indent,semi */

export default {
  props: {
    setting: {
      type: Object,
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
    changeSetting(item){
      this.$emit('update',item);
    }
  }
}
</script>

<style scoped>
  .setting-item {
    display: flex;
    /*margin: 0 3rem 0 0;*/
    padding: .5rem 1rem;
    height: 2.5rem;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    align-items: center;
  }

  .setting-content {
    margin-right: auto;
    text-align: left;
  }

  .setting-title {

  }

  .setting-desc {
    font-size: .9rem;
    color: #9B9B9B;

  }

  .set-btn {
    color: #409EFF;
    cursor:pointer;
  }
</style>
