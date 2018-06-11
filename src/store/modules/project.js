const project = {
  state: {
    id: 0,
    current: 0,
    step: 0,
    maxStep: 0,
    steps: [
      { title: '基础信息', path: 'baseinfo', icon: 'project1' },
      { title: '基础合同', path: 'contract', icon: 'contract' },
    ]
  },
  mutations: {
    SET_PROJECT_APPROVAL_ID (state, id) {
      state.id = id
    },
    SET_PROJECT_APPROVAL_STEP (state, step) {
      state.step = step
    },
    SET_CURRENT (state, step) {
      state.current = step
    }
  }
}

export default project
