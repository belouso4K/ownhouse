export const state = () => ({
  loader: false
})

export const mutations = {

  toggleReload (state, reload) {
    state.loader = reload
  }
}

export const getters = ({

  getReloadStatus: (state) => {
    return state.loader
  }
})
