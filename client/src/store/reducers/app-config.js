import { handleActions } from 'redux-actions'

const defaultState = {
  window: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '在仲园',
    // navigationStyle:'',
    backgroundColor: '#f8f8f8',
    // backgroundTextStyle:'',
    // backgroundColorTop:'',
    // backgroundColorBottom:'',
    // enablePullDownRefresh:'',
    // onReachBottomDistance:'',
    // pageOrientation:'',
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home',
        text: '首页'
      },
      {
        pagePath: 'pages/dept-framework',
        text: '通讯录'
      },
      {
        pagePath: 'pages/mine',
        text: '我的'
      },
      {
        pagePath: 'example/index',
        text: 'weui'
      }
    ]
  },
  networkTimeout: {
    request: 10000,
    connectSocket: 10000,
    uploadFile: 10000,
    downloadFile: 10000
  },
  openid: '',
  isLogin: false,
};

let appConfig = handleActions({

}, defaultState)
export default appConfig;