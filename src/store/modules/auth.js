// const types = {};

const initState = {
  token: null,
};

const getters = {};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  removeToken(state) {
    state.token = null;
  },
};

const actions = {};

export default {
  state: () => initState,
  getters,
  mutations,
  actions,
  namespaced: true,
};
