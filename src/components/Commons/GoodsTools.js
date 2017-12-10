
let obj = {} 
let store = window.localStorage

obj.addOrUpdata = function(newGoods) {
  // 获取本地存储数据
  let goodsObj =  this.getGoods()
  //判断添加的商品是否在GoodsObj中
  if(goodsObj[newGoods.id]) {
    // 追加
    goodsObj[newGoods.id] += newGoods.num
  }else{
    //建议给一个lkey，给一个值
    goodsObj[newGoods.id] = newGoods.num
  }
  this.saveGoods(goodsObj)
}
// 获取
// ||'{}'是代码健壮性判断
obj.getGoods = function() {
  return JSON.parse(store.getItem('goods')||'{}')
}
//储存
obj.saveGoods= function(obj) {
  //保存到本地，直接成对象[Object object]
  store.setItem('goods',JSON.stringify(obj))
}

//获取总数
obj.getTotalCount = function() {
  let goodsList = this.getGoods()
  let sum = 0
    let arr = Object.values(goodsList)
    arr.forEach(ele => sum += ele);
    return sum
}

// 保存数组对象
obj.saveArr = function(arr) {
  let obj = {}
  arr.forEach(ele => {
    obj[ele.id] = ele.pickNum
  });
  this.saveGoods(obj)
}

export default obj