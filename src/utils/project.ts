import { useMutation, useQuery, useQueryClient } from "react-query"
import { Project } from "types/project"
import { cleanObject } from "utils"
import { useHttp } from "./http"

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  // param变化时，会再次触发请求
  return useQuery<Project[]>(['projects', cleanObject(param)], () => 
    client('projects', {data: param}
    )
  )
  // const { run, ...result } = useAsync<Project[]>()
  // const fetchProjects = useCallback(
  //   () => clients('projects', {data: cleanObject(parma)}), [clients, parma]
  // )
  // useEffect(() => {
  //   run((fetchProjects()), {
  //     retry: fetchProjects
  //   })
  // },[parma, fetchProjects, run])
  // return result
}

export const useEditProject = () => {
  // const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      data: params,
      method: 'patch'
    }), {
      // 编辑成功后刷新数据
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'patch'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
}
export const useAddProject = () => {
  // const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) => client(`projects`, {
      data: params,
      method: 'post'
    }), {
      // 编辑成功后刷新数据
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
  // const mutate = (params: Partial<Project>) => {
  //   return run(client(`projects/${params.id}`, {
  //     data: params,
  //     method: 'post'
  //   }))
  // }
  // return {
  //   mutate,
  //   ...asyncResult
  // }
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', {id}],
    () => client(`projects/${id}`),
    {
      // 在id有值的时候才会请求useQuery
      enabled: Boolean(id)
    }
  )
}