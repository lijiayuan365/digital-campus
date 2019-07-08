/**
 * 从链表中查找对应id的节点
 * @param {*} list 
 * @param {*} nodeId 
 */
function linkFindNode(list, nodeId) {
  let p = list;
  while (p) {
    let node = p.data;
    if (node.nodeId === nodeId) {
      return p;
    }
    p = p.childNode;
  }
  return null;
}
/**
 * 从链表中查找对应id的父节点
 * @param {*} list 
 * @param {*} nodeId 
 */
function linkFindParentNode(list, nodeId) {
  let p = list;
  while (p.childNode) {
    let childNode = p.childNode.data;
    if (childNode.nodeId === nodeId) {
      return p;
    }
    p = p.childNode;
  }
  return null;
}
/**
 * 从树中找到对应id的节点
 * @param {*} tree 
 * @param {*} nodeId 
 */
function treeFindNode(tree, nodeId) {
  if (!tree) {
    // 传入节点为空，直接返回 null
    return null;
  } else {
    let data = tree.data;
    if (data.nodeId === nodeId) {
      // 当前节点为要找的节点，返回节点
      return tree;
    } else {
      // 递归遍历当前节点的子节点
      for (let i = 0; i < tree.childNode.length; i++) {
        let node = treeFindNode(tree.childNode[i], nodeId);
        if (node) {
          // 找到节点了，一层一层返回
          return node;
        }
      }
      // 递归子节点还是没结果，返回null
      return null;
    }
  }
}
/**
 * 从书中查找对应id的父节点
 * @param {*} tree 
 * @param {*} nodeId 
 */
function treeFindParentNode(tree, nodeId) {
  if (!tree) {
    // 传入节点为空，直接返回 null
    return null;
  } else {
    // let data = tree.data;
    let flag = tree.childNode.some((item) => {
      // console.log(item);
      // console.log('item');
      return item.data.nodeId === nodeId;
    });
    // console.log(`falg: ${flag}`)
    if (flag) {
      // 当前节点为要找的节点，返回节点
      return tree;
    } else {
      // 递归遍历当前节点的子节点
      for (let i = 0; i < tree.childNode.length; i++) {
        let node = treeFindParentNode(tree.childNode[i], nodeId);
        if (node) {
          // 找到节点了，一层一层返回
          return node;
        }
      }
      // 递归子节点还是没结果，返回null
      return null;
    }
  }
}
/**
 * 当前节点是否审批通过
 * @param {*} currentNode 
 */
function isApprove(currentNode){
  let approveFlag = currentNode.nodePersons.every((item) => {
    return item.approve === 1
  });
  return approveFlag;
}

module.exports = {
  linkFindNode,
  linkFindParentNode,
  treeFindNode,
  treeFindParentNode,
  isApprove,
}