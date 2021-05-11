import { useEffect } from "react"
import { Project } from "types/project"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (parma: Partial<Project>) => {
  const clients = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(clients('projects', {data: cleanObject(parma)}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[parma])
  return result
}