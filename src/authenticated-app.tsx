/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth } from 'context/auth-context'
import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { ProjectListScreen } from 'screens/project-list'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'

// grid和flex各自的应用场景
// 1、要考虑，是一维布局还是二维布局
// 一般来说，一维布局用flex， 二维布局用grid
// 2、是从内容出发还是从布局出发
// 从内容出发： 你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间；
// 从布局出发： 先规划网格（数量一般不固定），然后再把元素往里填充
// 从内容出发，用flex
// 从布局出发，用grid
export const AuthenticatedApp = () => {
  return <Container>
    <PageHeader/>
    <Main>
      <Router>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen/>}></Route>
          <Route path="/projects/:projectId/*" element={<ProjectScreen />}></Route>
          <Navigate to="/projects"></Navigate>
        </Routes>
      </Router>
    </Main>
    {/* <Aside>
      aside
    </Aside>
    <Footer>footer</Footer> */}
  </Container>
}
const PageHeader = () => {
  const { logout, user } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* <img src={softwareLogo} alt="" /> */}
        <Button type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color='rgb(38, 132, 255)'/>
        </Button>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={
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
      </HeaderRight>
    </Header>
  )
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