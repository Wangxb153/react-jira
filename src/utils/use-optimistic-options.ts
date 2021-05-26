import { QueryKey, useQueryClient } from "react-query";

// target 被点击的数据，old：最近一次表格展示数据
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()
  return {
    // 编辑成功后刷新数据
    onSuccess: () => queryClient.invalidateQueries('projects'),
    async onMutate(target: any) {
      // 根据queryKey取到被点击数据被点击前的 数据
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        console.log('old', old, target)
        return callback(target, old)
      })
      return {previousItems}
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(
  queryKey,
  (target, old) => old?.filter(item => item.id !== target.id) || [] 
)

export const useEditConfig = (queryKey: QueryKey) => useConfig(
  queryKey,
  (target, old) => old?.map(item => item.id === target.id ? {...item, ...target} : item) || [] 
)
  

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));