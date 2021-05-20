/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth } from 'context/auth-context'
import React, { useState } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { ProjectListScreen } from 'screens/project-list'
import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'
import { ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'

// grid和flex各自的应用场景
// 1、要考虑，是一维布局还是二维布局
// 一般来说，一维布局用flex， 二维布局用grid
// 2、是从内容出发还是从布局出发
// 从内容出发： 你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间；
// 从布局出发： 先规划网格（数量一般不固定），然后再把元素往里填充
// 从内容出发，用flex
// 从布局出发，用grid
export const AuthenticatedApp = () => {
  const [ projectModalOpen, setProjectModalOpen ] = useState(false)
  return <Container>
    <PageHeader projectButton={<ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>创建项目</ButtonNoPadding>}/>
    {/* <Button onClick={() => setProjectModalOpen(true)}>打开</Button> */}
    <Main>
      <Router>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen projectButton={<ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>创建项目</ButtonNoPadding>}/>}></Route>
          <Route path="/projects/:projectId/*" element={<ProjectScreen />}></Route>
          <Navigate to="/projects"></Navigate>
        </Routes>
      </Router>
    </Main>
    {/* <Aside>
      aside
    </Aside>
    <Footer>footer</Footer> */}
    <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}/>
  </Container>
}
const PageHeader = (props: {projectButton: JSX.Element}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softwareLogo} alt="" /> */}
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color='rgb(38, 132, 255)'/>
        </ButtonNoPadding>
        <ProjectPopover projectButton={props.projectButton}/>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User/>
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()
  return <Dropdown overlay={
    <Menu>
      <Menu.Item key="logout">
        <Button type="link" onClick={logout}>登出</Button>
        {/* <a onClick={logout} href='a'>登出</a> */}
      </Menu.Item>
    </Menu>
  }>
    <Button type="link" onClick={e => e.preventDefault()}>
      Hi, {user?.name}
    </Button>
  </Dropdown>
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  /* grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
  "header header header"
  "nav main aside"
  "footer footer footer";
  height: 100vh; */
  /* 每一块之间的距离 */
  /* grid-gap: 10rem; */
`
// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
  /* grid-area: header;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between; */
`
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div`

`
const Main = styled.main``
/* const Nav = styled.nav`grid-area: nav`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer` */