<!--  -->
<template>
  <div>
    <bread-crumb>
      <el-breadcrumb-item :to="{ path: '/form-flow' }">表单流程</el-breadcrumb-item>
      <el-breadcrumb-item>新建表单</el-breadcrumb-item>
    </bread-crumb>
    <el-tabs type="card" class="tab-container">
      <el-tab-pane label="表单设置">
        <div class="form-setting">
          <div class="form-setting-item">
            <div class="setting-name">表单名称：</div>
            <el-input size="smalll" v-model="formName" class="setting-content" placeholder="请输入表单名"></el-input>
          </div>
          <div class="form-setting-item">
            <div class="setting-name">表单分组：</div>
            <el-select v-model="selectedGroup" placeholder="请选择" class="setting-content">
              <el-option
                v-for="item in formGroups"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <i class="el-icon-plus add-group"></i>
          </div>
          <div class="form-setting-item">
            <div class="setting-name">表单类型：</div>
            <el-select v-model="formType" placeholder="请选择" class="setting-content">
              <el-option
                v-for="item in formTypes"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表单设计">
        <div class="from-design-wrapper">
          <div class="design-name">表单标题:</div>
          <el-input size="small" v-model="formTitle" class="design-content"></el-input>
        </div>
        <div class="from-design-wrapper">
          <div class="design-name">表单内容:</div>
          <el-input type="textarea" v-model="formDesc" class="design-content"></el-input>
        </div>
        <!--<div class="">设计表单</div>-->
        <el-alert title="设计表单字段" type="info" :closable="false"></el-alert>
        <div class="form-field">
          <component
            v-for="(item,index) in fieldList"
            :key="index"
            :is="item"
            :fieldIndex="index"
            :fieldItemData.sync="fieldDataList[index]"
            @copyField="copyField"
            @removeField="removeField"
          ></component>
        </div>
        <div class="add-field">
          <el-button
            v-if="!showFieldMenu"
            @click="showFieldMenu=!showFieldMenu"
            type="info"
            plain
            icon="el-icon-plus"
            class="add-btn"
          >添加字段</el-button>
          <div v-if="showFieldMenu" class="field-menu">
            <div class="field-item" v-for="(item,index) in fieldMenu" :key="index">
              <el-tooltip class="item" effect="dark" :content="item.tip" placement="top">
                <el-button
                  :icon="item.icon"
                  @click="addFormField(item.name)"
                  class="field-menu-btn"
                >{{item.title}}</el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="填单设置">角色管理</el-tab-pane>
      <el-tab-pane label="流程设置">
        <div class="design-wrapper">
          <flow-design :fixedFlows.sync="fixedFlows" :formFlow.sync="formFlow"></flow-design>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-button @click="saveForm">保存</el-button>
  </div>
</template>
<script>
/* eslint-disable indent,semi */
import FlowDesign from "../../components/FlowDesign.vue";
import BreadCrumb from "../../components/BreadCrumb.vue";
// 表单字段
import TextField from "../../components/form-design/TextField.vue";
import TextAreaField from "../../components/form-design/TextAreaField.vue";
import RadioField from "../../components/form-design/RadioField.vue";
import CheckboxField from "../../components/form-design/CheckboxField.vue";
import TimeField from "../../components/form-design/TimeField.vue";
import DateField from "../../components/form-design/DateField.vue";
import TelField from "../../components/form-design/TelField.vue";
import ImgField from "../../components/form-design/ImgField.vue";
import FileField from "../../components/form-design/FileField.vue";
// 表单字段end
export default {
  data() {
    return {
      activeIndex: 1,
      // 表单设置
      formName: '',
      formGroups: [ 'a','b','c'],
      selectedGroup: '',
      formTypes: [
        { typeId: 0, typeName: '普通单' },
        { typeId: 1, typeName: '审批单' },
        { typeId: 2, typeName: '任务单' }
      ],
      formType: 0,
      // 表单设计
      formTitle: '',
      formDesc:'',
      showFieldMenu: false,
      fieldMenu: [
        {
          icon: "el-icon-upload",
          name: "RadioField",
          title: "单项选择",
          tip: "单项选择"
        },
        {
          icon: "el-icon-upload",
          name: "CheckboxField",
          title: "多项选择",
          tip: "单项选择"
        },
        {
          icon: "el-icon-upload",
          name: "TextField",
          title: "单行文本",
          tip: "单项选择"
        },
        {
          icon: "el-icon-upload",
          name: "TextAreaField",
          title: "多行文本",
          tip: "单项选择"
        },
        {
          icon: "el-icon-upload",
          name: "TimeField",
          title: "时间选择",
          tip: "时间选择"
        },
        {
          icon: "el-icon-upload",
          name: "DateField",
          title: "日期选择",
          tip: "日期选择"
        },
        {
          icon: "el-icon-upload",
          name: "TelField",
          title: "电话",
          tip: "电话"
        },
        {
          icon: "el-icon-upload",
          name: "ImgField",
          title: "图片",
          tip: "图片"
        },
        {
          icon: "el-icon-upload",
          name: "FileField",
          title: "附件",
          tip: "附件"
        }
      ],
      fieldList: [],
      fieldDataList: [],
      // 填单设置
      formSetting:{},
      // 流程设置
      formFlow:{},
      fixedFlows:[],
    };
  },
  components: {
    FlowDesign,
    BreadCrumb,
    TextField,
    TextAreaField,
    RadioField,
    CheckboxField,
    TimeField,
    DateField,
    ImgField,
    FileField,
    TelField
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    copyField(index) {
      let newFieldData = JSON.parse(JSON.stringify(this.fieldDataList[index]));
      this.fieldList.splice(index, 0, this.fieldList[index]);
      this.fieldDataList.splice(index, 0, newFieldData);
    },
    removeField(index) {
      this.fieldList.splice(index, 1);
      this.fieldDataList.splice(index, 1);
    },
    addFormField(field) {
      this.fieldList.push(field);
      this.showFieldMenu = false;
    },
    saveForm(){
      let formData = {};
      formData.creator = '李佳远';
      formData.formName = this.formName;
      formData.formGroup = this.selectedGroup;
      formData.formType = this.formType;
      formData.formTitle = this.formTitle;
      formData.formDesc = this.formDesc;
      formData.fieldList = this.fieldDataList;
      formData.formSetting = this.formSetting;
      formData.formFlow= this.formFlow;
      // formData.fixedFlows = this.fixedFlows;
      debugger
      this.$http.post('/api/form/addForm',{formData}).then((res)=>{
        console.log(res);
      })
    }
  }
};
</script>

<style scoped>
.tab-container {
  min-height: 10rem;
  margin-bottom: 2rem;
  /*border-bottom: solid 1px rgba(120,120,120,0.4);*/
}

.design-wrapper {
  margin: 0 50px;
}

.form-setting-item,
.from-design-wrapper {
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1rem 4rem;
}

.setting-name,
.design-name {
  padding-right: 0.5rem;
  /* flex: 1 1 6rem; */
}
.setting-content,
.design-content {
  flex: 0 1 25rem;
}
.add-group{
  margin-left: .5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color:#409EFF;
}
.form-field {
  /*width: 38rem;*/
  /*padding-right: 8rem;*/
}

.add-field {
  margin-top: 1rem;
  width: 38rem;

  /*height: 3rem;*/
  /*background: #909399;*/
}

.add-btn {
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  /*background: #FFF;*/
}
.field-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /*text-align: left;*/
  /*text-align: left;*/
  width: 100%;
  /*height: 20rem;*/
  border: dashed 1px;
}
.field-item {
  width: 25%;
  padding: 0.5rem 0;
  /*height: 20px;*/
  /*background: greenyellow;*/
}
.field-menu-btn {
  width: 8rem;
  text-align: left;
}
</style>
