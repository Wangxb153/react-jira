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
export const useAsync = <D>(initialState?: State<D>) => {
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
        setError(error)
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