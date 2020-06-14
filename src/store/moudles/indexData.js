const state = {
  indexLabel: new Map(),
  currentLabel: "",
  currentId: "",
};

const getters = {};

const mutations = {
  initNewPage(state, content) {
    state.currentLabel = content.content + content.id;
    state.currentId = content.id;
    state.indexLabel.set(content.id, content);
  },
  pushData(state, obj) {
    state.indexLabel.set(state.currentId, obj);
  },
  refreshPage(state, id) {
    state.currentId = id;
    let tab = state.indexLabel.get(state.currentId);
    console.log("refreshPage", tab, id);
    if (tab) {
      state.currentLabel = tab.content + tab.id;
    }
  },
};

const setters = {};

export default {
  namespaced: true,
  state,
  getters,
  setters,
  mutations,
};
