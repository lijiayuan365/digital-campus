<!--  -->
<template>
  <div>
    <div v-for="(setting,index) in settings">
      <setting-item :setting="setting"></setting-item>
    </div>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import SettingItem from '../../components/SettingItem.vue';
export default {
  data() {
    return {
      settings:[
        {title:'类型管理',desc:'可设置“假期/出差/加班”的类型、模板内容、审批流程',path:'setting/type'},
        {title:'假期管理',desc:'可设置“假期/出差/加班”的类型、模板内容、审批流程',path:''},
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

  methods: {}
}
</script>

<style scoped>

</style>
