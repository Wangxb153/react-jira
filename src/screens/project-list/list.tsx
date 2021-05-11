import { Table, TableProps } from 'antd'
import React from 'react'
import { User } from './search-panel'
import dayjs from 'dayjs'
import { Project } from 'types/project'
interface ListProps extends TableProps<Project> {
  users: User[]
}
// interface ListProps  {
//   list: Project[],
  
// }
// type PropsType = Omit<ListProps, 'users'> === props
export const List = ({ users, ...props }: ListProps) => {
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
    ]}
    {...props}
    ></Table>
}