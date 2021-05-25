import { SearchPanel } from './search-panel'
import { List } from './list'
import React from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  // 基本类型，可以放到依赖里面；组件状态也可以放到依赖里面，非组件状态的对象，绝对不能放到组件依赖里。
  //  https://codesandbox.io/s/keen-ware-tlz9s?file=/src/App.js
  const [ param, setParam ] = useProjectsSearchParams()
  const { open } = useProjectModal()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
  const { data: users } = useUser()

  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      <ButtonNoPadding onClick={open} type={'link'}>创建项目</ButtonNoPadding>
    </Row>
    
    <SearchPanel param={param} setParam={setParam} users={users || []}/>
    <ErrorBox error={error}/>
    <List 
      users={users || []} 
      dataSource={list || []} 
      loading={isLoading} 
    />
  </Container>
}

ProjectListScreen.whyDidYouRender = true
// class Test extends React.Component<any, any> {
//   static whyDidYouRender = true
// }
const Container = styled.div`
  padding: 3.2rem
`