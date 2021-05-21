import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "utils"

interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  status: 'idle'
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()

  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args): void 0), [dispatch, mountedRef])
}
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig ) => {
  const config = {...defaultConfig, ...initialConfig }
  // const [ state, setState ] = useState<State<D>>({
  //   ...defaultInitialState,
  //   ...initialState
  // })
  const [ state, dispatch ] = useReducer((state:State<D>, action: Partial<State<D>>) => ({...state, ...action}),{
    ...defaultInitialState,
    ...initialState
  })
  // useState中存储函数，会直接执行
  // 惰性初始state， initialState参数只会在组件的初始渲染中起作用，后续渲染会被忽略。此函数只会在初始渲染时被调用
  // useState直接传入函数的含义是：惰性初始化‘所以，要用useState保存函数，不能直接传入函数
  // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
  const [ retry, setRetry ] = useState(() => () => {})

  // const mountedRef = useMountedRef()
  const safeDispatch = useSafeDispatch(dispatch)
  const setData = useCallback((data: D) => safeDispatch({
    data,
    status: 'success',
    error: null
  }), [safeDispatch])

  const setError = useCallback((error: Error) => safeDispatch({
    data: null,
    status: 'error',
    error
  }), [safeDispatch])
  //使用useCallback返回同一个函数
  const run = useCallback((promise: Promise<D>, runConfig?:{ retry: () => Promise<D> }) => {
    if(!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setRetry(() => () => {
      if(runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    // 这边更新了state后，state改变了，导致useCallback执行，不断刷新
    // setState({...state, status: 'loading'})
    // setState(prevState => ({...prevState, status: 'loading'}))
    safeDispatch({status: 'loading'})
    return promise
      .then(data => {
        setData(data)
        return data
      })
      .catch(error => {
        // catch会消化异常，如果不主动抛出，外面是接收不到异常的
        setError(error)
        console.log('error', error)
        if (config.throwOnError) return Promise.reject(error);
        return error
      })
  }, [config.throwOnError, setData, setError, safeDispatch])

  return {
    isIdle: state.status === 'idle',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    isLoading: state.status === 'loading',
    run,
    setData,
    // retry被调用时，重新调用run
    retry,
    setError,
    ...state
  }
}