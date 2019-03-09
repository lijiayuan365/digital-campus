<!--  -->
<template>
  <div>
    <!--<div class="setting-wrapper">-->
      <!--<div class="setting-item">-->
        <!--<div class="setting-content">职位设置</div>-->
        <!--<router-link to="post">设置</router-link>-->
      <!--</div>-->
    <!--</div>-->
    <div  v-for="(setting,index) in settings">
      <setting-item :setting="setting" @update="updateSetting"></setting-item>
    </div>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import SettingItem from '../../components/SettingItem.vue';

export default {
  data() {
    return {
      that:this,
      settings: [
        {title: '职位设置', desc: '设置职位信息', path:'post'},

      ]
    };
  },
  components: {
    SettingItem,
  },

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {
    updateSetting(title){
      debugger
    },
    demo() {
      debugger
    }
  }
}
</script>

<style scoped>

</style>
