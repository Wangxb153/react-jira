import { useEffect, useState } from "react"

const test = () => {
  let num = 0

  const effect = () => {
    num += 1
    const message = `现在的num值：${num}`
    return function umount() {
      console.log(message)
    }
  }
  return effect
}
// 执行test，返回effect函数
const add = test()
// 执行effect函数，返回引用了message1的umount函数
const umount = add()
// 执行effect函数，返回引用了message2的umount函数
add()
// 执行effect函数，返回引用了message3的umount函数
add()
umount() // 输出1

// 闭包陷阱 react hook与闭包，闭包经典的坑
export const Test = () => {
  const [ num, setNum ] = useState(0)

  const add = () => setNum(num + 1)

  // 无论num add到了多少，这边console出来的num都是0
  useEffect(() => {
    let id = setInterval(() => {
      console.log('num in setInerval', num)
      return clearInterval(id)
    }, 1000)
  }, [num])
  // 无论num add到了多少，这边console出来的num都是0， 原因是这个useEffect和useMount都只会在函数执行的时候执行一次
  useEffect(() => {
  }, [num])

  return <div>
    <button onClick={add}>add</button>
    <p>{num}</p>
  </div>
}