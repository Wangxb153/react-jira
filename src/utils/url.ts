/**
 * 返回页面URL中，指定键的参数值
 */

import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

// useMemo 把创建函数和依赖项数组作为参数传入useMemo，它仅会在某个依赖项改变时才重新计算memoized值。这种优化有助于避免在每次渲染时都进行高开销的计算。
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [ searchParmas, setSearchParam ] = useSearchParams()
  return [
    useMemo(() => 
      keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParmas.get(key) || ''}
      }, {} as {[key in K]: string}),
    // 这里不能加入keys的依赖项，keys是一个数组，每次传入的都不是同一个，因此会不断地触发useMemo生产一个新的对象，不断刷新页面
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParmas]),
    (params: Partial<{ [key in K]: unknown}>) => {
      // iterator [], {} , map
      // Object.fromEntries接收一个键值对的列表参数，并返回一个带有这些键值对的新对象
      const o = cleanObject({...Object.fromEntries(searchParmas), ...params}) as URLSearchParamsInit
      return setSearchParam(o)
    }
  ] as const 
}

// let a = ['12', 12, {a:'d'}] as const

// const obj = {
//   data: ['hellow', 'world'],
//   [Symbol.iterator]() {
//     const self = this
//     let index= 0
//     return {
//       next() {
//         if(index < self.data.length) {
//           return {
//             value: self.data[index++],
//             done: false
//           }
//         } else {
//           return {
//             value: undefined,
//             done: true
//           }
//         }
//       }
//     }
//   }
// }

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};