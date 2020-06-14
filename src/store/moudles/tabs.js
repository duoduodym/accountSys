const state = {
  tabs: [],
  currentTab: "",
};

const getters = {
  getTabList: (state) => {
    return state.tabs;
  },
};

const mutations = {
  putTabs(state, tab) {
    let val = JSON.parse(JSON.stringify(tab));
    val.id = new Date().getTime().toString();
    state.tabs.push(val);
    if (tab.name == "home") {
      this.commit("indexData/initNewPage", { id: val.id, content: "这是首页" });
    }
    this.commit("tabs/changeTab", val.id);
  },
  changeTab(state, tab) {
    if (state.currentTab != tab) {
      this.commit("indexData/refreshPage", tab);
      state.currentTab = tab;
    }
  },
  removeTab(state, tab) {
    let index = state.tabs.indexOf(tab);
    if (index >= 0) {
      state.tabs.splice(index, 1);
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
