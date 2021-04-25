import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

// 在一个函数里，改变传入的对象是不好的
export const cleanObject = (object: object) => {
  let result = {...object}
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    // if(!value) { // 当value为0的时候，不应该进入到判断里面
    if(isFalsy(value)) { // 当value是null或者undefined，空值的时候，不传
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// const debounce = (func, delay) => {
//   let timeout
//   return () => {
//     if(timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       func()
//     }, delay)
//   }
// }
// const log = debounce(() => console.log('assa'), 5000)
// log()
// log()

// 后面用泛型来规范类型
export const useDebounce = <T>(value: T, delay?: number) => {
  const [ debouncedValue, setDebouncedValue ] = useState(value)
  console.log('value', value)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [ value, setValue ] = useState(initialArray)
  // let result = [...persons]
  // let add = (person: any) => {
  //   return result.push(person)
  // }
  // let  
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value,item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      console.log(index)
      const copy = [...value]
      console.log('copy', copy)
      copy.splice(index, 1)
      setValue(copy)
    }
  }
}