import Vue from "vue";
import Vuex from "vuex";

const axios = require("axios");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    level: null,
    error: null,
    naam: null,
    users: {},
  },

  getters: {
    getStoreUsers(state) {
      return state.users;
    },
  },

  mutations: {
    sortStoreUsers(state, prop){
      state.users.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    setStoreUsers(state, items) {
      state.users = items;
      console.log(state.users);
    },
  },

  actions: {
    callUsersAPI({commit, state}) {
      console.log("store action gemaakt!")

      let axiosConfig = {
        headers: {
          "auth-token": state.token,
        },
      };
      const url = `http://192.168.0.103:8000/users/showall`;
      axios
        .get(url, axiosConfig)
        .then((res) => {
          commit("setStoreUsers", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
