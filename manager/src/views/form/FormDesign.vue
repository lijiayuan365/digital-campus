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
            <el-select
              filterable
              allow-create
              v-model="formGroup"
              placeholder="请选择"
              class="setting-content">
              <el-option
                v-for="item in formGroups"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <!--<i class="el-icon-plus add-group"></i>-->
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
          <el-input type="textarea" v-model="desc" class="design-content"></el-input>
        </div>
        <!--<div class="">设计表单</div>-->
        <el-alert title="设计表单字段" type="info" :closable="false"></el-alert>
        <div class="form-field">
          <component
            v-for="(item,index) in fields"
            :key="index"
            :is="item"
            :fieldIndex="index"
            :fieldItemData.sync="fieldList[index]"
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
          >添加字段
          </el-button>
          <div v-if="showFieldMenu" class="field-menu">
            <div class="field-item" v-for="(item,index) in fieldMenu" :key="index">
              <el-tooltip class="item" effect="dark" :content="item.tip" placement="top">
                <el-button
                  :icon="item.icon"
                  @click="addFormField(item.name)"
                  class="field-menu-btn"
                >{{item.title}}
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="填单设置">
        <div class="from-design-wrapper">
          <div class="design-name">启用相关人: </div>
          <div class="design-content">
            <el-switch v-model="pickedCc" @change="clearCc"></el-switch>
          </div>
        </div>
        <div class="from-design-wrapper" v-show="pickedCc">
          <div class="design-name">相关人: </div>
          <div class="design-content">
            <div class="cc-person">
              <el-tag
                class="selected-user"
                v-for="user in ccPerson"
                :key="user.userId"
                closable
                @close="removeUser(user)">
                {{user.userName}}
              </el-tag>
            </div>
          </div>
          <el-button @click="SET_USER_DIALOG_SHOW(true)" class="add-cc">添加相关人</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流程设置">
        <div class="flow-type">
          <div style="font-size: 14px;padding-right: 20px;">流程设定</div>
          <div>
            <el-radio-group v-model="flowType">
              <el-radio :label="0">自由流程</el-radio>
              <el-radio :label="1">固定流程</el-radio>
              <el-radio :label="2">分支流程</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!--固定流程-->
        <div class="fixed-flow-area" v-show="flowType == '1'">
          <el-select v-model="fixedFlow" multiple filterable placeholder="请选择">
            <el-option-group
              v-for="group in fixedFlowGroups"
              :key="group.groupName"
              :label="group.groupName">
              <el-option
                v-for="item in group.flow"
                :key="item._id"
                :label="item.flowName"
                :value="item._id">
              </el-option>
            </el-option-group>
          </el-select>
        </div>
        <!--分支流程-->
        <div class="design-wrapper" v-show="flowType == '2'">
          <flow-design
            :formFlow.sync="branchFlow"
            :flowGraphProp.sync="flowGraph">
          </flow-design>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button @click="saveDraft">存为草稿</el-button>
    <el-button @click="exportForm">发布</el-button>
    <select-user :selectedUserProp.sync="ccPerson"></select-user>
  </div>
</template>
<script>
  /* eslint-disable indent,semi */
  import FlowDesign from '../../components/FlowDesign.vue';
  import BreadCrumb from '../../components/BreadCrumb.vue';
  import SelectUser from '../../components/select-user/SelectUser.vue';
  import {mapMutations} from 'vuex';
  // 表单字段
  import TextField from '../../components/form-design/TextField.vue';
  import TextAreaField from '../../components/form-design/TextAreaField.vue';
  import RadioField from '../../components/form-design/RadioField.vue';
  import CheckboxField from '../../components/form-design/CheckboxField.vue';
  import TimeField from '../../components/form-design/TimeField.vue';
  import DateField from '../../components/form-design/DateField.vue';
  import TelField from '../../components/form-design/TelField.vue';
  import ImgField from '../../components/form-design/ImgField.vue';
  import FileField from '../../components/form-design/FileField.vue';
  // 表单字段end
  export default {
    data() {
      return {
        activeIndex: 1,
        operaType: 'add',
        formId: '',
        // 表单设置
        formName: '',
        formGroups: ['a', 'b', 'c'],
        formGroup: '',
        formTypes: [
          {typeId: 0, typeName: '普通单'},
          {typeId: 1, typeName: '审批单'},
          {typeId: 2, typeName: '任务单'}
        ],
        formType: 0,
        // 表单设计
        formTitle: '',
        desc: '',
        showFieldMenu: false,
        fieldMenu: [
          {
            icon: 'el-icon-upload',
            name: 'RadioField',
            title: '单项选择',
            tip: '单项选择'
          },
          {
            icon: 'el-icon-upload',
            name: 'CheckboxField',
            title: '多项选择',
            tip: '单项选择'
          },
          {
            icon: 'el-icon-upload',
            name: 'TextField',
            title: '单行文本',
            tip: '单项选择'
          },
          {
            icon: 'el-icon-upload',
            name: 'TextAreaField',
            title: '多行文本',
            tip: '单项选择'
          },
          {
            icon: 'el-icon-upload',
            name: 'TimeField',
            title: '时间选择',
            tip: '时间选择'
          },
          {
            icon: 'el-icon-upload',
            name: 'DateField',
            title: '日期选择',
            tip: '日期选择'
          },
          {
            icon: 'el-icon-upload',
            name: 'TelField',
            title: '电话',
            tip: '电话'
          },
          {
            icon: 'el-icon-upload',
            name: 'ImgField',
            title: '图片',
            tip: '图片'
          },
          {
            icon: 'el-icon-upload',
            name: 'FileField',
            title: '附件',
            tip: '附件'
          }
        ],
        fieldList: [],
        fields: [],
        // 填单设置
        formSetting: {},
        ccPerson: [],
        pickedCc: false,
        // 流程设置
        flowType: 0,
        isFree: true,
        fixedFlow: [],
        branchFlow: {},
        formFlow: {
          flowType: 0,
          isFree: true,
          fixedFlow: [],
          branchFlow: {},
        },

        fixedFlowGroups: [
          {
            groupName: '行政',
            flow: [
              {_id: '222', flowName: '23'},
              {_id: '2222', flowName: '23'},
              {_id: '2221', flowName: '23'},
            ]
          },
          {
            groupName: '行政2',
            flow: [
              {_id: '122', flowName: '23'},
              {_id: '22', flowName: '23'},
              {_id: '21', flowName: '23'},
            ]
          },

        ],
        flowGraph: {
          nodes: [
            {
              color: '#00D042',
              id: '7fd55741',
              label: '开始节点',
              nodeName: '开始节点',
              nodeType: 0,
              shape: 'circle',
              rootNode: true,
              childNode: [],
              x: 320,
              y: 50
            },
            {
              color: '#F70000',
              id: 'b37e8bf5',
              label: '结束节点',
              nodeName: '结束节点',
              nodeType: 0,
              shape: 'circle',
              childNode: [],
              x: 320,
              y: 450
            }
          ],
          edges: []
        },
      };
    },
    components: {
      FlowDesign,
      SelectUser,
      BreadCrumb,
      TextField,
      TextAreaField,
      RadioField,
      CheckboxField,
      TimeField,
      DateField,
      ImgField,
      FileField,
      TelField,
    },

    computed: {},

    created() {
      this.formId = this.$route.query.formId;
      this.operaType = this.$route.query.type;
      this.formId && this.initData(this.formId);
    },

    mounted() {
    },

    methods: {
      initData(formId) {
        let _this = this;
        this.$http.get('/api/form/getForm', {params: {formId}}).then((res) => {
          let data = res.data;
//        data = data.data;
          _this.fromDataTrans(data.data, _this);
          this.fields = data.data.fields;
        });
        this.$http.get('/api/form/getFixedFlows').then((res) => {
          let data = res.data;
          this.fixedFlowGroups = data.data;
        });
      },
      copyField(index) {
        let newFieldData = JSON.parse(JSON.stringify(this.fieldList[index]));
        this.fields.splice(index, 0, this.fields[index]);
        this.fieldList.splice(index, 0, newFieldData);
      },
      removeField(index) {
        this.fields.splice(index, 1);
        this.fieldList.splice(index, 1);
      },
      addFormField(field) {
        this.fields.push(field);
        this.showFieldMenu = false;
      },
      clearCc(val) {
        if (!val) {
          this.ccPerson = [];
        }
      },
      removeUser(user) {
        this.ccPerson.splice(this.ccPerson.indexOf(user), 1);
      },
      exportForm() {
        let formData = {};
        this.fromDataTrans(this, formData);
        formData.status = 1;
        formData.formId = this.formId;
        let url = this.operaType === 'add' ? 'addForm' : 'updateForm';
        this.$http.post(`/api/form/${url}`, {formData}).then((res) => {
          this.$message({
            message: '发布表单成功',
            duration: 2000,
            type: 'success',
          });
          this.$router.push({
            path: '/form-flow',
          });
        });
      },
      saveDraft() {
        let formData = {};
        this.fromDataTrans(this, formData);
        formData.status = 1;
        formData.formId = this.formId;
        let url = this.operaType === 'add' ? 'addForm' : 'updateForm';
        this.$http.post(`/api/form/${url}`, {formData}).then((res) => {
          this.$message({
            message: '保存草稿成功',
            duration: 2000,
            type: 'success',
          });
          this.$router.push({
            path: '/form-flow',
          });
        });
      },
      fromDataTrans(source, target) {
        target.formName = source.formName;
        target.formGroup = source.formGroup;
        target.formType = source.formType;
        target.formTitle = source.formTitle;
        target.fieldList = source.fieldList;
        target.formSetting = source.formSetting;
        target.ccPerson = source.ccPerson;
        target.isFree = source.isFree;
        target.flowType = source.flowType;
        target.fixedFlow = source.fixedFlow;
        target.branchFlow = source.branchFlow;
        target.flowGraph = source.flowGraph;
        target.desc = source.desc;
        target.status = source.status;
      },
      ...mapMutations({
        SET_USER_DIALOG_SHOW: 'SET_USER_DIALOG_SHOW'
      }),
    },
    watch: {
      flowType: {
        handler(newVal) {
          if (newVal == 0) {
            this.isFree = true;
          } else {
            this.isFree = false;
          }
        }
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

  .flow-type,
  .form-setting-item,
  .fixed-flow-area,
  .from-design-wrapper {
    display: flex;
    text-align: left;
    align-items: center;
    padding: 1rem 4rem;
  }

  .fixed-flow-area {
    width: 36rem;
  }

  .flow-type {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .cc-person {
    text-align: left;
    /*align-items: center;*/
    /*justify-content: center;*/
    padding: 6px;
    min-height: 2rem;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
  }

  .selected-user {
    margin: 6px 6px 0 0;
  }

  .add-cc {
    margin-left: 10px;
  }

  .setting-name,
  .design-name {
    padding-right: 0.5rem;
    /*flex: 1 1 6rem;*/
  }

  .setting-content,
  .design-content {
    flex: 0 1 25rem;
  }

  .add-group {
    margin-left: .5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #409EFF;
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
