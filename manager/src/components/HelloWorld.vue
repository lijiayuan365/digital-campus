<template>
  <div>
    <select v-model="selectedProvice">
      <option value="">请选择</option>
      <option v-for="(city,index) in cityData" :key="index" value="city.key">{{city.name}}</option>
    </select>
    <select  v-show="selectedProvice" v-model="selectedCity">
      <option value="">请选择</option>
      <option v-for="(city, index) in childCity" :key="index" value="city.key">{{city.name}}</option>
    </select>
    <select v-show="selectedCity" v-model="selectedCounty">
      <option value="">请选择</option>
    </select>
  </div>
  <!-- <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Date"
      prop="date">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>-->
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      search: "",
      selectedProvice:'',
      selectedCity:'',
      selectedCounty:'',
      cityData:[{name:'广东',key:'guangdong'},{name:'北京',key:'guangdong'}],

      xiang:[{name:'广州',key:'gz'}]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  computed:{
    childCity(){
      let _this = this;
      let city = _this.cityData.find((city)=>{
        // debugger
        return city.key = _this.selectedProvice;
      })
      debugger
      if(!city){
        return [];
      }
      if(!city.child){
        city.child = _this.xiang;
      }
      return city.child;
    },
  },
  watch:{
    selectedProvice(){

    },
    selectedCity(){

    }
  }
};
</script>
