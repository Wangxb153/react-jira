import { useMemo } from "react"
import { useProject } from "utils/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => (
      {...param, personId: Number(param.personId) || undefined}
    ), [param]),
    setParam
  ] as const
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectCreate({ projectCreate: true })
  const setUrlParams = useSetUrlSearchParam();
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" })
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})
  console.log('Boolean(editingProjectId)', projectCreate === 'true', Boolean(editingProjectId), projectCreate === 'true' || Boolean(editingProjectId))
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}