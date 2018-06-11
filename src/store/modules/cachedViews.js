const tagsView = {
    state: {
      cachedViews: [],
      cachedViewsName:[]
    },
    mutations: {
        ADD_CACHED_VIEWS:(state, route)=>{
          let a = true
          state.cachedViews.forEach(element => {
            if(route.name.indexOf(element.name)!==-1){
              a = false
            }
          })
          if(a){
            state.cachedViews.push(route)
            state.cachedViewsName.push(route.name)
          }
        },
        DEL_CACHED_VIEWS:(state, view)=>{
          for (const [i, v] of state.cachedViews.entries()) {
            if (v.path === view.path) {
              state.cachedViews.splice(i, 1)
              break
            }
          }
          for (const i of state.cachedViewsName) {
            if (i === view.name) {
              const index = state.cachedViewsName.indexOf(i)
              state.cachedViewsName.splice(index, 1)
              break
            }
          }
        },
        DEL_OTHERS_VIEWS: (state, view) => {
          for (const [i, v] of state.cachedViews.entries()) {
            if (v.path === view.path) {
              state.cachedViews = state.cachedViews.slice(i, i + 1)
              break
            }
          }
          for (const i of state.cachedViewsName) {
            if (i === view.name) {
              const index = state.cachedViewsName.indexOf(i)
              state.cachedViewsName = state.cachedViewsName.slice(index, i + 1)
              break
            }
          }
        },
        DEL_ALL_VIEWS: (state) => {
          state.cachedViews = []
          state.cachedViewsName = []
        }
    },
    actions: {
      addVisitedViews({ commit }, view) {
        commit('ADD_CACHED_VIEWS', view)
      },
      delVisitedViews({ commit, state }, view) {
        return new Promise((resolve) => {
          commit('DEL_CACHED_VIEWS', view)
          resolve([...state.cachedViews])
        })
      },
      delOthersViews({ commit, state }, view) {
        return new Promise((resolve) => {
          commit('DEL_OTHERS_VIEWS', view)
          resolve([...state.cachedViews])
        })
      },
      delAllViews({ commit, state }) {
        return new Promise((resolve) => {
          commit('DEL_ALL_VIEWS')
          resolve([...state.cachedViews])
        })
      }
    }
  }
  
  export default tagsView
  