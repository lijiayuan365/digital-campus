import wepy from 'wepy';
let QQMapWX = require('../assets/js/qqmap-wx-jssdk');

 // 实例化API核心类
 var qqmapsdk = new QQMapWX({
   key: 'NK6BZ-SCAKJ-JB2FO-KFQMS-G6UNQ-CJFJR' // 必填
 });
export default class QQMapMixin extends wepy.mixin {

  data = {};

  components = {};

  methods = {};

  events = {};

  watch = {};

  computed = {};

  onLoad() {
  };

  onShow() {
  };

  async getCurrentLocation(){
    let local = await wepy.getLocation();
    return new Promise((resolve,reject)=>{
      qqmapsdk.reverseGeocoder({
        local:local,
        //位置坐标，默认获取当前位置，非必须参数
        success: function(res) {//成功后的回调
          console.log(res.result);
          resolve(res.result);

        },
        fail: function(error) {
          console.error(error);
          reject(error);
        }
      });
    })
  }
}
