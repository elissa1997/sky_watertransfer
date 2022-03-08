export function listToTree(oldArr, idName, pidName, rootPid) {
  oldArr.forEach(element => {
    let parentId = element[pidName];
    if(parentId !== rootPid){
      oldArr.forEach(ele => {
        // console.log(ele[idName], parentId)
        if(ele[idName] === parentId){ //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
          if(!ele.children){
              ele.children = [];
          }
          ele.children.push(element);
        }
      });
    }
  });
  // console.log(oldArr)  //此时的数组是在原基础上补充了children;
  oldArr = oldArr.filter(ele => ele[pidName] === rootPid); //这一步是过滤，按树展开，将多余的数组剔除；
  // console.log(oldArr)
  return oldArr;
}