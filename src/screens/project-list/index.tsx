import { SearchPanel } from './search-panel'
import { List } from './list'
import React from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { ButtonNoPadding, Row } from 'components/lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from './project-list-slice'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  // 基本类型，可以放到依赖里面；组件状态也可以放到依赖里面，非组件状态的对象，绝对不能放到组件依赖里。
  //  https://codesandbox.io/s/keen-ware-tlz9s?file=/src/App.js
  const [ param, setParam ] = useProjectsSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
  const { data: users } = useUser()
  const dispatch = useDispatch()
  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      <ButtonNoPadding
        onClick={() => dispatch(projectListActions.openProjectModal())}
        type={'link'}
      >
        创建项目
      </ButtonNoPadding>
    </Row>
    
    <SearchPanel param={param} setParam={setParam} users={users || []}/>
    {
      error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null
    }
    <List 
      users={users || []} 
      dataSource={list || []} 
      loading={isLoading} 
      refresh={retry}
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