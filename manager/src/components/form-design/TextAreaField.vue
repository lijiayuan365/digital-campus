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
        <el-input
          type="textarea"
          :placeholder="fieldData.fieldTip"
          readonly
          size="mini"
        ></el-input>
      </a>
      <div class="field-setting">
        <p class="setting-title">标题</p>
        <div class="setting-content">
          <el-input v-model="fieldData.fieldTitle" size="small"></el-input>
        </div>
        <p class="setting-title">默认值</p>
        <div class="setting-content">
          <el-input
            type="textarea"
            v-model="fieldData.defaultValue"
            size="small"></el-input>
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
          <div class="verification">
            <span class="verification-name">只读</span>
            <el-switch
              v-model="fieldData.readOnly"
              active-color="#13ce66">
            </el-switch>
          </div>
          <div class="verification">
            <span class="verification-name">最少输入</span>
            <el-input
              v-model="fieldData.min"
              size="mini" type="number"
              min="0"
              class="verification-input"></el-input>
            字符
          </div>
          <div class="verification">
            <span class="verification-name">最多输入</span>
            <el-input
              v-model="fieldData.max"
              size="mini" type="number"
              :min="fieldData.min"
              class="verification-input"></el-input>
            字符
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
  props: {
    fieldItemData: {
      type: Object,
      default: () => {
        return {
          fieldName:'TextAreaField',
          fieldTitle: '多行文本',
          defaultValue: '',
          fieldTip: '请输入',
          isMust: false,
          readOnly: false,
          min: '',
          max: ''
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

</style>
