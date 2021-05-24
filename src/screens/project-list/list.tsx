import { Dropdown, Menu, Table, TableProps } from 'antd'
import React from 'react'
import { User } from './search-panel'
import dayjs from 'dayjs'
import { Project } from 'types/project'
// react-router和react-router-dom 的关系 类似于react和react-dom的关系，react执行的是react内部的一些操作，react-dom是跟浏览器的一些操作
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal } from './util'
interface ListProps extends TableProps<Project> {
  users: User[],
  refresh?: () => void
}
// interface ListProps  {
//   list: Project[],
  
// }
// type PropsType = Omit<ListProps, 'users'> === props
export const List = ({ users, ...props }: ListProps) => {

  const { mutate } = useEditProject()
  // const pinProject = (id:number, pin: boolean) => mutate({id, pin})
  const pinProject = (id:number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
  const { open } = useProjectModal()
  return <Table rowKey={"id"} pagination={false} columns={
    [
      {
        title: <Pin checked={true} disabled={true}/>,
        render(value, project) {
          // onCheckedChange 调用接口
          // 函数式编程，project的获取在pin之前得到，函数柯里化
          // return <Pin checked={project.pin} onCheckedChange={pin => pinProject(project.id, pin)}
          return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
            // 不能直接在这里请求hook函数发送接口，hook的调用只能放在最外层}
        }
      },
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
      {
        render(value, project) {
          return <Dropdown overlay={
            <Menu>
              <Menu.Item key={'edit'}>
                <ButtonNoPadding onClick={open} type={'link'}>编辑</ButtonNoPadding>
              </Menu.Item>
            </Menu>
          }>
            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
          </Dropdown>
        }
      }
    ]}
    {...props}
    ></Table>
}