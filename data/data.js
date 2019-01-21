user = {
  "userId":"用户id",
  "userName":"李佳远",
  "pwd":"123456",
  "openid":"微信id",
  "avatar":"头像",
  "deptId":"部门id",
  "orgId":"组织id",
  "post":"职位",
  "tel":"11223344",
  "email":"123@123.com",
  "remark":'备注',
};
dept = {
  "deptNo":"001",
  "deptName":"仲恺农业工程学院",
  "deptHead":["程萍","宋垚臻"],
  "deptLevel":"0",
  "subDept":["002","003","004"]
};
org = {
  "orgId":"001",
  "orgName" : "组织1",
  "orgHead":["001","002","003"]
};
form = {
  'formId':'表单id',
  'creator':'创建人',
  'formName':'表单名称，用于展示',
  'formGroup':'表单分组',
  'formType':'表单类型 0 普通，1 审批，2 任务',
  'formTitle':'表单标题',
  'formDesc':'表单内容',
  'formField': [ // 表单字段
    {}
  ],
  'formSetting':{},
  'formFlow':'表单审批流程', 
  'formData':'填单结果',
  'fixedFlows':[] // 可选固定流程列表，填单时使用
};
flow = {
  'flowId':'流程id',
  'flowName':'流程名称',
  'flowType':'流程类型 0 自由，1 分支，2 固定',
  'nodes':[{}, {}], // '节点列表' ,
  'activeNode': { // 当前节点,
   ' nodeId':'节点id', 
    'nodeName':'节点名称',
    'nodeType':'节点类型 普通节点 1 ，开始结束节点 0，条件节点 2',
    'nodePersons':[], // 节点处理人
    'nodePersonType':'节点处理人类型 提单人 1 ，上节点 2，部门负责人 3，指定人 0',
    'nodeCondition':[ // 节点流传条件,只有分支流程有
      {}
    ], 
    'childNode':[], // 子节点 ids
  } 

}