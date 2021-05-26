import { QueryKey, useMutation, useQuery } from "react-query"
import { Project } from "types/project"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options"

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
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};
// export const useEditProject = (queryKey: QueryKey) => {
//   // const { run, ...asyncResult } = useAsync()
//   console.log('queryKey', queryKey)
//   const client = useHttp()
//   return useMutation(
//     (params: Partial<Project>) => client(`projects/${params.id}`, {
//       data: params,
//       method: 'patch'
//     }),
//     useEditConfig(queryKey)
//   )
//   // const mutate = (params: Partial<Project>) => {
//   //   return run(client(`projects/${params.id}`, {
//   //     data: params,
//   //     method: 'patch'
//   //   }))
//   // }
//   // return {
//   //   mutate,
//   //   ...asyncResult
//   // }
// }
export const useAddProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) => client(`projects`, {
      data: params,
      method: 'post'
    }),
    useAddConfig(queryKey)
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

export const useDeleteProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
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