export const isFalsy = (value) => value === 0 ? false : !value

// 在一个函数里，改变传入的对象是不好的
export const cleanObject = (object) => {
  let result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    // if(!value) { // 当value为0的时候，不应该进入到判断里面
    if(isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = () => {
  
}