import { Table } from 'antd'
import React from 'react'
import { User } from './search-panel'
import dayjs from 'dayjs'

interface Project {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string,
  created: number
}
interface ListProps {
  list: Project[],
  users: User[]
}
export const List = ({ list, users }: ListProps) => {
  return <Table rowKey={"id"} pagination={false} columns={
    [
      {
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: '部门',
        dataIndex: 'organization'
      },
      {
        title: '负责人',
        render(value, project) {
          return <span key={value}>
            {users.find(user => user.id === project.personId)?.name || null}
          </span>
        }
      },
      {
        title: '创建时间',
        render(value,project) {
          return (
            <span key={value}>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
          )
        }
      },
    ]} dataSource={list}></Table>
}