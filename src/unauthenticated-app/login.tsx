import { useAuth } from 'context/auth-context'
import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from './index'
import { useAsync } from 'utils/use-async'

export const  LoginScreen = ({onError} : { onError: (error: Error) => void }) => {

  const { login } = useAuth()
  // 这里不用useAsync导出的error，是因为error是通过setState生成的，是异步的，不能够立即获取到error的值
  const { run, isLoading } = useAsync(undefined, {throwOnError: true})
  const handleSubmit = async (values: {username: string, password: string}) => {
    try {
      await run(login(values))
    } catch(e) {
      onError(e)
    }
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]}>
      <Input type="text" id={'username'} placeholder="请输入用户名"></Input>
    </Form.Item>
    <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]}>
      <Input type="password" id={'password'} placeholder="请输入密码"></Input>
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} type="primary" htmlType="submit">登录</LongButton>
    </Form.Item>
  </Form>
}