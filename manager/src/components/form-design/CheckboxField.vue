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
      trigger="manual"
      width="400">
      <a slot="reference" class="field-content">
        <div class="field-name">
          <span>{{fieldData.fieldTitle}}</span>
          <i class="icon el-icon-circle-plus" @click.stop="copyField"></i>
          <i class="icon el-icon-remove" @click.stop="removeField"></i>
        </div>
        <el-checkbox-group size="medium" class="field-item-list-wrapper">
          <el-checkbox
            v-for="(item ,index) in fieldData.checkboxList" :key="index"
            :label="item"
          ></el-checkbox>
        </el-checkbox-group>
      </a>
      <div class="field-setting">
        <p class="setting-title">标题</p>
        <div class="setting-content">
          <el-input v-model="fieldData.fieldTitle" size="small"></el-input>
        </div>
        <p class="setting-title">选项</p>
        <div class="setting-content">
          <div v-for="(item, index) in fieldData.checkboxList" :key="index" style="display: flex;align-items: center">
            <el-checkbox></el-checkbox>
            <el-input
              v-model="fieldData.checkboxList[index]"
              size="small"
              style="padding: .2rem 0;margin-left: 6px;">
            </el-input>
            <!--<div class="icon-wrapper">-->
            <i @click="addCheckbox(index)" class="el-icon-circle-plus-outline icon"></i>
            <i @click="removeCheckbox(index)" class="el-icon-remove-outline icon"></i>
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
          <div class="verification">
            <span class="verification-name">最少选</span>
            <el-input
              v-model="fieldData.min"
              size="mini" type="number"
              min="0" :max="fieldData.checkboxList.length"
              class="verification-input"></el-input>
            项
          </div>
          <div class="verification">
            <span class="verification-name">最多选</span>
            <el-input
              v-model="fieldData.max"
              size="mini" type="number"
              :min="fieldData.min" :max="fieldData.checkboxList.length"
              class="verification-input"></el-input>
            项
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
          fieldTitle: '多项选择',
          fieldName:'CheckboxField',
          checkboxList: ['选项1', '选项2', '选项3', '选项4'],
          isMust: false,
          readOnly: false,
        }
      }
    }
  },
  data() {
    return {
      visible: false,
    };
  },
  components: {},

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {
    addCheckbox(index) {
      this.fieldData.checkboxList.splice(index, 0, this.fieldData.checkboxList[index]);
    },
    removeCheckbox(index) {
      this.fieldData.checkboxList.splice(index, 1);
    }
  },
}
</script>

<style scoped>
  @import "./form-field.css";

  .el-checkbox + .el-checkbox {
    /*padding: 0 .5rem;*/
    margin: 0;
  }

</style>
