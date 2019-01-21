/**
 * 书写接口返回格式
 * @param {*} response 
 * @param {*} code 状态码
 * @param {*} msg 提示信息
 * @param {*} data 数据
 */
function writeApi(response,code,msg,data){
  response.json({
    code,
    msg,
    data
  })
}

module.exports = {
  // writeApi
}