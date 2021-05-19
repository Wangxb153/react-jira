import { useEffect } from "react"
import { Project } from "types/project"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (parma: Partial<Project>) => {
  const clients = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  const fetchProjects = () => clients('projects', {data: cleanObject(parma)})
  useEffect(() => {
    run((fetchProjects()), {
      retry: fetchProjects
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[parma])
  return result
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'patch'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'post'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}