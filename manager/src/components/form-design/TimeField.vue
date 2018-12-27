<!--  -->
<template>
  <div @click="visible=true"
       class="field-wrapper" :class="{'field-active':visible}">
    <el-popover
      placement="right-end"
      title="字段设置"
      v-model="visible"
      v-clickoutside="handleClose"
      width="400"
      trigger="manual">
      <a slot="reference" class="field-content">
        <div class="field-name">
          <span>{{fieldData.fieldTitle}}</span>
          <i class="icon el-icon-circle-plus" @click.stop="copyField"></i>
          <i class="icon el-icon-remove" @click.stop="removeField"></i>
        </div>
        <el-time-picker
          v-model="fieldData.defaultValue"
          :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
          :placeholder="fieldData.fieldTip"
          value-format="HH:mm:ss"
          readonly>
        </el-time-picker>
      </a>
      <div class="field-setting">
        <p class="setting-title">标题</p>
        <div class="setting-content">
          <el-input v-model="fieldData.fieldTitle" size="small"></el-input>
        </div>
        <p class="setting-title">默认值</p>
        <div class="setting-content">
          <el-time-picker
            v-model="fieldData.defaultValue"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            value-format="HH:mm:ss">
          </el-time-picker>
        </div>
        <p class="setting-title">提示语</p>
        <div class="setting-content">
          <el-input v-model="fieldData.fieldTip" size="small"></el-input>
        </div>
        <p class="setting-title">校验</p>
        <div class="setting-content">
          <div class="verification">
            <span class="verification-name">必填</span>
            <el-switch
              v-model="fieldData.isMust"
              active-color="#13ce66">
            </el-switch>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import {fieldMixin} from '../../mixins/form-design-mixins'

export default {
  mixins: [fieldMixin],
//  Sat Nov 24 2018 23:18:10 GMT+0800 (中国标准时间)
  props: {
    fieldItemData: {
      type: Object,
      default: () => {
        return {
          fieldName:'TimeField',
          fieldTitle: '时间选择器',
          defaultValue: '',
          fieldTip:'选择时间',
          isMust: false,
        }
      }
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

  methods: {}
}
</script>

<style scoped>
  @import "./form-field.css";
  .el-date-editor.el-date-editor--time {
    width: 100%;
  }
</style>
