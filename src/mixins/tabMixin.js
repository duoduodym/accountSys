import { mapGetters, mapState } from "vuex";

export const tabMixin = {
  computed: {
    editableTabsValue: {
      get() {
        return this.$store.state.tabs.currentTab;
      },
      set(val) {
        console.log("123123123");
        this.$store.commit("tabs/changeTab", val);
      },
    },
    ...mapGetters("tabs", {
      editableTabs: "getTabList",
    }),
  },
  methods: {
    onMenuSelect(index, indexPath) {
      let tabs = this.menu_data;
      tabs = tabs.filter((tab) => tab.index.toString() == index);
      if (tabs && tabs.length) {
        this.$store.commit("tabs/putTabs", tabs[0]);
      }
    },
    tabClick(tab) {
      let next = this.editableTabs[tab.index].index;
      if (this.$route.path != next) {
        this.$router.push(this.editableTabs[tab.index].index);
      }
    },
    tabRemove(tab) {
      let current = this.editableTabs.filter((item) => item.id == tab)[0];
      let index = this.editableTabs.indexOf(current);
      console.log("index", index);
      if (this.editableTabsValue == current.id) {
        const nextIndex = Math.max(0, index - 1);
        if (current.index != this.editableTabs[nextIndex].index) {
          this.$router.push(this.editableTabs[nextIndex].index);
        }
        this.$store.commit("tabs/changeTab", this.editableTabs[nextIndex].id);
      }
      this.$store.commit("tabs/removeTab", current);
    },
  },
};
