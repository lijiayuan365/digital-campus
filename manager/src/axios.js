import axios from 'axios';

import {Message, Loading} from 'element-ui';
// /root/zzy/_database
// mongoimport --db campause --collection user --file /root/zzy/_database/user.json
// import Cookies from 'js-cookie';

// import router from '@/router/index'

let loading;        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

function endLoading() {    //使用Element loading-close 方法
  loading.close();
}

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // var token = ''
  // if(typeof Cookies.get('user') === 'undefined'){
  //   //此时为空
  // }else {
  //   token = JSON.parse(Cookies.get('user')).token
  // }//注意使用的时候需要引入cookie方法，推荐js-cookie
  // config.data = JSON.stringify(config.data);
  // config.headers = {
  //   'Content-Type':'application/json'
  // }
  // if(token != ''){
  //   config.headers.token = token;
  // }
  // debugger
  let timestam = +new Date();
  if (config.method === 'get') {
    config.params = {...config.params, timestam};
  } else if (config.method === 'post') {
    config.data = {...config.data, timestam};
  }
  // debugger;
  // config.url = config.url.replace('/api','/manager');
  showFullScreenLoading();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


//http response 拦截器
axios.interceptors.response.use(
  response => {
    //当返回信息为未登录或者登录失效的时候重定向为登录页面
    // if(response.data.code == 'W_100004' || response.data.message == '用户未登录或登录超时，请登录！'){
    //   router.push({
    //     path:"/",
    //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    //   })
    // }
    tryHideFullScreenLoading();
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
