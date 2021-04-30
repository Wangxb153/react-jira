import { useAuth } from 'context/auth-context'
import qs from 'qs'
import * as auth from '../auth-provider'
const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  data?: object,
  token?: string
}
// axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2XX的时候抛出异常
export const http = async (endPoint: string, {data, token, headers, ...customConfig} : Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if(config.method.toUpperCase() === 'GET') {
    endPoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${apiUrl}/${endPoint}`,config)
    .then(async response => {
      if(response.status === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({message: '请重新登录！'})
      }
      const data = await response.json()
      if(response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
    // fetch中这段代码在服务端返回400或者500时不会执行，只是在网络出现问题时，会出现。
    // .catch(err => {
    //   alert('err happen')
    // })
}

// JS中的typeof，是在runtime时运行的
// return typeof 1 === 'number'
// TS中的typeof，是在静态环境中运行的
// return (...[endPoint, config]: Parameters<typeof http>) => http(endPoint, {...config, token: user?.token})
export const useHttp = () => {
  const { user } = useAuth()
  // TODO 讲解ts操作符
  // utility type 的用法： 用泛型给它传入一个类型，然后utility type对这个类型进行某种的操作
  return (...[endPoint, config]: Parameters<typeof http>) => http(endPoint, {...config, token: user?.token})
  // return ([endPoint, config]: [string, Config]) => http(endPoint, {...config, token: user?.token})
}

type Person = {
  name: string,
  age: number
}
// const xiaoming: Person = {name: 'xiaoming'}
const xiaoming: Partial<Person> = {name: 'xiaoming'}
const shenmiren: Omit<Person, 'name' | 'age'> = {}
const shenmiren1: Pick<Person, 'age'> = {age: 7}
console.log(xiaoming, shenmiren,shenmiren1)
// Partial的实现  
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Utility Types
// Parameters
// 联合类型
// let myFavoriteNumber: FavoriteNumber
// myFavoriteNumber = 'seven'
// myFavoriteNumber = 7
// myFavoriteNumber = {}  // 错误

// let jackFavoriteNumber: FavoriteNumber


// let roseFavoriteNumber: FavoriteNumber = '6'
// interface Person {
//   name: string
// }
// 等价于
// type Person = { name: string }

// 类型别名在很多情况下可以和interface互换
// 但是在两种情况下interface没法替代type

// 类型别名
// type FavoriteNumber = string | number
// interface也没法实现Utility Type