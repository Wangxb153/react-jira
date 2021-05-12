import { Table, TableProps } from 'antd'
import React from 'react'
import { User } from './search-panel'
import dayjs from 'dayjs'
import { Project } from 'types/project'
// react-router和react-router-dom 的关系 类似于react和react-dom的关系，react执行的是react内部的一些操作，react-dom是跟浏览器的一些操作
import { Link } from 'react-router-dom'
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
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (value, project) => {
          return <Link to={String(project.id)}>{project.name}</Link>
        }
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