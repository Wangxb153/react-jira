import { useState } from "react"

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
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig ) => {
  const config = {...defaultConfig, ...initialConfig }
  const [ state, setState ] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data: D) => setState({
    data,
    status: 'success',
    error: null
  })

  const setError = (error: Error) => setState({
    data: null,
    status: 'error',
    error
  })

  const run = (promise: Promise<D>) => {
    if(!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setState({...state, status: 'loading'})
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
  }

  return {
    isIdle: state.status === 'idle',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    isLoading: state.status === 'loading',
    run,
    setData,
    setError,
    ...state
  }
}