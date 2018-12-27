const defaultState = {
  isShow: false, // 显示选人弹窗
  userList: [], // 已选用户列表
};
const SET_USER_LIST = 'SET_USER_LIST';
const SET_USER_DIALOG_SHOW = 'SET_USER_DIALOG_SHOW';

const state = {
  ...defaultState
};

const actions = {};

const mutations = {
  [SET_USER_DIALOG_SHOW](state, payload) {
    state.isShow = payload;
  },

  [SET_USER_LIST](state, payload) {
    state.userList = payload;
  }
};

export default {
  state,
  actions,
  mutations
}
