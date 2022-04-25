import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rendelesId: 0,
    API_URL: "http://localhost:5000/api/",
    PHOTO_URL: "http://localhost:5000",
    logged: false,
    Uid: "",
    LoggedUser: {
      Felhasznalo: {
        Id: 0,
        BNev: "",
        Jelszo: "",
        Email: "",
        Jog: 0,
      },
    },
  },
  getters: {
    getLogged: (state) => {
      return state.logged;
    },
  },
  mutations: {
    setLogged: (state, value) => {
      state.logged = value;
    },
  },
  actions: {},
  modules: {},
});
