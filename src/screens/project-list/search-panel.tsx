/* @jsxImportSource @emotion/react */
import { Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import React from 'react'
import { Project } from 'types/project'

export interface User {
  id: number,
  name: string,
  email: string,
  title: string,
  organization: string,
  token: string
}
interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({ users ,param, setParam} : SearchPanelProps) => {
  return <Form action="" layout={"inline"} css={{marginBottom: '2rem'}}>
    <Form.Item>
      <Input type="text" value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value
      })}/>
    </Form.Item>
    <Form.Item>
      <UserSelect 
        value={param.personId} 
        onChange={value => setParam({
          ...param,
          personId: value
        })}
        defaultOptionName={'负责人'}
      />
    </Form.Item>
  </Form>
}