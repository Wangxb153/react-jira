import React from 'react'
import { User } from './search-panel'

interface Project {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string
}
interface ListProps {
  list: Project[],
  users: User[]
}
export const List = ({ list, users }: ListProps) => {
  let newList = Array.from(new Set(list))
  console.log('newList', newList)
  return <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {
        list.map(project => <tr key={project.id}>
          <td>{project.name}</td>
          <td>{users.find(user => user.id === project.personId)?.name || null}</td>
        </tr>)
      }
    </tbody>
  </table>
}