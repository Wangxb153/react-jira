import React from 'react'

// React.Component 接收两个泛型参数，props和state
// props包括children和fallbackRender 
type FallbackRender = (props: {error: Error | null}) => React.ReactElement
// {children: ReactNode, fallbackRender: FallbackRender} === 
export class ErrorBoundry extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}> {
  state = {
    error: null
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if(error) {
      return fallbackRender({error})
    }
    return children
  }
}