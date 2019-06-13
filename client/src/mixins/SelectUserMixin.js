/*
* 选人组件 mixin
* */
import wepy from 'wepy';

export default class SelectUserMixin extends wepy.mixin {

  data = {
    showSelectDialog: false, // 显示选人面板
    selectedUser:[],
  };

  components = {};

  methods = {
    chooseUser(person,key) {
      this.showSelectDialog = true;
      this.$invoke('selectUser', 'getSelectedUser',person,key);
    },
    // getSelectedUser(){
    //   return this.selectedUser;
    // }
  };

  events = {
    // exportUser(users){
    //   this.selectedUser = users;
    // }
  };

  watch = {};

  computed = {};

  onLoad() {
  };

  onShow() {
  };

}
