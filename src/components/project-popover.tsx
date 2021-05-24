import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects()
  const { open } = useProjectModal()
  console.log(isLoading)
  const pinnedProjects = projects?.filter(project => project.pin)
  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item>
          <List.Item.Meta title={project.name} key={project.personId}/>
        </List.Item>)
      }
    </List>
    <Divider/>
    <ButtonNoPadding onClick={open} type={'link'}>创建项目</ButtonNoPadding>
  </ContentContainer>
  return <Popover placement={'bottom'} content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div `
  min-width: 30rem;
`