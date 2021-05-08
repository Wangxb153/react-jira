import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from "react"
import React from 'react'
import { cleanObject, useMount, useDebounce } from 'utils'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
  const [ param, setParam ] = useState({
    name: '',
    personId: ''
  })
  const [ list, setList ] = useState([])
  const [ users, setUsers ] = useState([])
  const debouncedParam = useDebounce(param, 200)

  const clients = useHttp()
  useEffect(() => {
    clients('projects', {data: cleanObject(debouncedParam)}).then(setList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debouncedParam])
  
  useMount(() => {
    clients('users').then(setUsers)
    // fetch(`${apiUrl}/users`).then(async response => {
    //   if(response.ok) {
    //     setUsers(await response.json())
    //   }
    // })
  })
  // useEffect(() => {
  //   fetch(`${apiUrl}/users`).then(async response => {
  //     if(response.ok) {
  //       setUsers(await response.json())
  //     }
  //   })
  // }, [])
  console.log('list', list)
  return <div>
    <SearchPanel param={param} setParam={setParam} users={users}/>
    <List list={list} users={users}/>
  </div>
}