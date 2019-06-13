<!--  -->
<template>
  <div>
    <bread-crumb>
      <template>
        <el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>导入数据</el-breadcrumb-item>
      </template>
    </bread-crumb>
    <div class="up-btn-area">
      <el-upload
        class="upload-demo"
        ref="upload"
        accept=".xls,.xlsx"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="upload"
        :show-file-list="false"
        :auto-upload="false">
        <el-button size="small" type="primary">导入用户</el-button>
        <div slot="tip" class="el-upload__tip">只能选择xls/xlsx文件</div>
      </el-upload>
    </div>
    <div>
      <div class="table-title">人员信息</div>
      <data-table :dataList="outData"
                  :columnData="columnData" :expandColumn="expandColumn"
                  :showOpa="false" :showSelect="false">

      </data-table>
      <div class="import-btn-area">
        <el-button type="success" @click="importUser">导入联系人</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </div>

    <div class="up-btn-area">
      <el-upload
        class="upload-demo"
        ref="upload"
        accept=".xls,.xlsx"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="uploadDept"
        :show-file-list="false"
        :auto-upload="false">
        <el-button size="small" type="primary">导入部门</el-button>
        <div slot="tip" class="el-upload__tip">只能选择xls/xlsx文件</div>
      </el-upload>
    </div>
    <div>
      <div class="table-title">部门信息</div>
      <data-table :dataList="deptOutData"
                  :columnData="deptColumnData"
                  :showOpa="false" :showSelect="false">

      </data-table>
      <div class="import-btn-area">
        <el-button type="success" @click="importDept">导入部门</el-button>
        <el-button type="info" @click="resetDept">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>/* eslint-disable indent,semi */
import XLSX from 'xlsx';
import BreadCrumb from '../../components/BreadCrumb.vue';
import DataTable from '../../components/DataTable.vue';

export default {
  data() {
    return {
      minValue: '', // v-model绑定的最小值
      oldMinValue: '', // 最小值备份，当用户取消的时候，把这个值赋值给minValue

      outData: [],
      deptOutData: [],
      columnData: [
        {data: 'userName', label: '姓名'},
        {data: 'deptName', label: '部门'},
        {data: 'orgName', label: '组织'},
        {data: 'postName', label: '职位'},
        {data: 'tel', label: '电话'},
        {data: 'pwd', label: '密码'},
        {data: 'email', label: '邮箱'},
        {data: 'remark', label: '备注'},
      ],
      expandColumn: [
        {data: 'userName', label: '姓名'},
        {data: 'dept', label: '部门代码'},
        {data: 'org', label: '组织代码'},
        {data: 'post', label: '职位代码'},
        {data: 'tel', label: '电话'},
        {data: 'pwd', label: '密码'},
        {data: 'email', label: '邮箱'},
        {data: 'remark', label: '备注'},
      ],
      deptColumnData: [
        {data: 'deptName', label: '部门名称'},
        {data: 'deptNo', label: '部门编号'},
        {data: 'parentDeptName', label: '上级部门'},
        {data: 'desc', label: '备注'},
      ],
    };
  },
  components: {
    BreadCrumb,
    DataTable,
  },

  computed: {},

  created() {
  },

  mounted() {
  },

  methods: {
    importUser() {
      this.$confirm('确定用户信息无误？', '导入用户').then(() => {
        return this.$http.post(`/api/user/importUser`, {users: this.outData});
      }).then((res) => {
      });

    },
    importDept() {
      this.$confirm('确定部门信息无误？', '导入部门').then(() => {
        return this.$http.post(`/api/user/importDept`, {depts: this.deptOutData});
      }).then((res) => {
      });

    },
    reset() {
      this.outData = [];
    },
    resetDept() {
      this.deptOutData = [];
    },
    upload(file, fileList) {
      console.log('file', file);
      console.log('fileList', fileList);
      let files = {0: file.raw};
      this.readExcel1(files, 'user');
    },
    uploadDept(file, fileList) {
      console.log('file', file);
      console.log('fileList', fileList);
      let files = {0: file.raw};
      this.readExcel1(files, 'dept');
    },
    readExcel1(files, type) {
      let _this = this;
      //表格导入
      console.log(files, type);
      if (files.length <= 0) {//如果没有文件名
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message({
          message: '上传的文件不符合格式',
          type: 'warning'
        });
        return false;
      }
      let f = files[0];
      const reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = '';
        let wb; // 读取完成的数据
        let outdata; // 你需要的数据
        let reader = new FileReader();
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          let bytes = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: 'binary'
          });
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          if (type === 'user') {

            _this.outData = outdata.slice(1);
            // 处理部门职位组织的代码问题
//          let nameReg =  /^\(.+?$\)/g;
            _this.outData.forEach((item) => {
              if (item.dept) {
                let data = item.dept.split(' | ');
                item.deptName = data[1];
                item.dept = data[0];
              }
              if (item.org) {
                let data = item.org.split(' | ');
                item.orgName = data[1];
                item.org = data[0];
              }
              if (item.post) {
                let data = item.post.split(' | ');
                item.postName = data[1];
                item.post = data[0];
              }
            });
          }else{
            _this.deptOutData = outdata.slice(1);
            _this.deptOutData.forEach((item) => {
              if (item.parentDept) {
                let data = item.parentDept.split(' | ');
                item.parentDeptName = data[1];
                item.parentDept = data[0];
              }
            });
          }
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(f);
    },

  }
};
</script>

<style scoped>
  .table-title {
    font-size: 20px;
    padding: 10px;
  }

  .up-btn-area {
    text-align: left;
  }

  .import-btn-area {
    padding: 20px;
  }

  .upload-demo {
    margin-top: 10px;
  }
</style>
