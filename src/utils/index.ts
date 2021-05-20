import { useEffect, useRef, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
// 在一个函数里，改变传入的对象是不好的
// export const cleanObject = (object: object) => {
export const cleanObject = (object?: { [key: string]: unknown }) => {
  let result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    // if(!value) { // 当value为0的时候，不应该进入到判断里面
    if(isVoid(value)) { // 当value是null或者undefined，空值的时候，不传
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback和useMemo有关系
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

export const useDocumentTitle = (title: string, keepOnUmount: boolean = true) => {
  // 使用useRef是的一开始读到的oldTitle不被改变
  const oldTitle = useRef(document.title).current
  // 页面加载时，oldTitle === 旧title 'React App'
  // 加载后，oldTitle === 新title

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if(!keepOnUmount) {
        // 如果不指定依赖，读到的就是一开始执行的旧title
        document.title = oldTitle
      }
    }
  }, [keepOnUmount, oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin

// 返回组件的挂载状态， 如果还没有挂载或者已经卸载，返回false，反之，返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}