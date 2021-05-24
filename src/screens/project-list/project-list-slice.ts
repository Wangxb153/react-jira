import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    // 这边有个疑惑：state不能直接改变其属性值，然后返回，这里直接改变state中的属性值然后返回是因为toolkit包使用了immer包的功能
    // const nextState = produce(baseState, draftState = {
    //   draftState.push({todo: 'Tweet about it'})
    //   draftState[1].done = true
    // })
    // 这里的draftState是一个新的state，所
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen
