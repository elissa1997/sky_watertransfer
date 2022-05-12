export function listToTree(oldArr, idName, pidName) {
  let result = []
  let map = {}
  if (!Array.isArray(oldArr)) {//验证data是不是数组类型
      return []
  }
  oldArr.forEach(item => {//建立每个数组元素id和该对象的关系
      map[item[idName]] = item //这里可以理解为浅拷贝，共享引用
  })
  oldArr.forEach(item => {
      let parent = map[item[pidName]] //找到data中每一项item的爸爸
      if (parent) {//说明元素有爸爸，把元素放在爸爸的children下面
          (parent.children || (parent.children = [])).push(item)
      } else {//说明元素没有爸爸，是根节点，把节点push到最终结果中
          result.push(item) //item是对象的引用
      }
  })
  return result //数组里的对象和data是共享的
}