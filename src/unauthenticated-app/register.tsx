import { useAuth } from 'context/auth-context'
import React from 'react'
import { Form, Input, Button } from 'antd'

export const  RegisterScreen = () => {

  const { register } = useAuth()
  const handleSubmit = (values: {username: string, password: string}) => {
    register(values)
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]}>
      <Input type="text" id={'username'} placeholder="请输入用户名"></Input>
    </Form.Item>
    <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]}>
      <Input type="password" id={'password'} placeholder="请输入密码"></Input>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">注册</Button>
    </Form.Item>
  </Form>
}