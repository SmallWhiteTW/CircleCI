import { createStore, createLogger } from "vuex";
import VuexPersistence from "vuex-persist";
import modules from "./modules";
// import router from "@/router";

const logger = createLogger({
  collapsed: true, // auto-expand logged mutations
  logActions: true, // Log Actions
  logMutations: true, // Log mutations
  logger: console,
});

const localStorage = new VuexPersistence({
  key: "vuex-persist-localStorage",
  storage: window.localStorage,
  modules: ["auth"], // storage in localStorage
});

const sessionStorage = new VuexPersistence({
  key: "vuex-persist-sessionStorage",
  storage: window.sessionStorage,
  modules: [], // storage in sessionStorage
});

const state = {};

const getters = {};

const mutations = {};

const actions = {};

// Create a new store instance.
const store = createStore({
  modules,
  state,
  getters,
  mutations,
  actions,
  plugins: [logger, localStorage.plugin, sessionStorage.plugin],
  strict: true,
});

const unsubscribe = store.subscribe((mutation) => {
  switch (mutation.type) {
    // case "auth/resetToken":
    //   router.push("/");
    //   break;
    default:
      break;
  }
});

export { unsubscribe };

export default store;
