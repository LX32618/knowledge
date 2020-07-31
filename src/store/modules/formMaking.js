import _ from 'lodash'

const state = {
  historyStates : [],
  stateIndex: -1
}

const mutations = {
  RESET_STATES: (state) => {
    state.historyStates = []
    state.stateIndex = -1
  },
  APPEND_STATE: (state, data) => {
    if (state.stateIndex !== state.historyStates.length - 1) {
      state.historyStates = state.historyStates.slice(0, state.stateIndex + 1)
    } else if (state.historyStates.length >= 20) {
      state.historyStates.shift()
    }
    state.historyStates.push(_.cloneDeep(data))
    state.stateIndex = state.historyStates.length - 1
  },
  UNDO: (state) => {
    state.stateIndex >= 0 && state.stateIndex--
  },
  REDO: (state) => {
    state.stateIndex < state.historyStates.length - 1 && state.stateIndex++
  }
}

export default {
  namespaced: true,
  state,
  mutations
}