<!--  -->
<template>
  <div
    @click="visible=true"
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
        <el-radio-group class="field-item-list-wrapper">
          <el-radio
            v-for="(item,index) in fieldData.radioList" :key="index"
            :label="item"></el-radio>
        </el-radio-group>
      </a>
      <div class="field-setting">
        <p class="setting-title">标题</p>
        <div class="setting-content">
          <el-input v-model="fieldData.fieldTitle" size="small"></el-input>
        </div>
        <p class="setting-title">选项</p>
        <div class="setting-content">
          <div v-for="(item, index) in fieldData.radioList" :key="index" style="display: flex;align-items: center">
            <el-radio false></el-radio>
            <el-input
              v-model="fieldData.radioList[index]"
              size="small"
              style="padding: .2rem 0;margin-left: 6px;">
            </el-input>
            <!--<div class="icon-wrapper">-->
            <i @click="addRadio(index)" class="el-icon-circle-plus-outline icon"></i>
            <i @click="removeRadio(index)" class="el-icon-remove-outline icon"></i>
            <!--</div>-->
          </div>
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
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import {fieldMixin} from '../../mixins/form-design-mixins'
export default {
  mixins:[fieldMixin],
  props:{
    fieldItemData: {
      type: Object,
      default: () => {
        return {
          fieldName:'RadioField',
          fieldTitle: '单项选择',
          radioList: ['选项1', '选项2', '选项3', '选项4'],
          isMust: false,
          readOnly: false,
        }
      }
    }
  },
  data() {
    return {

    };
  },
  components: {},

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {
    addRadio(index) {
      this.fieldData.radioList.splice(index, 0, this.fieldData.radioList[index]);
    },
    removeRadio(index) {
      this.fieldData.radioList.splice(index, 1);
    }
  }
}
</script>

<style scoped>
@import "./form-field.css";
.el-radio+.el-radio{
  margin: 0;
}
</style>
