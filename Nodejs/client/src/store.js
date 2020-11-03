import Vue from "vue";
import Vuex from "vuex";

const axios = require("axios");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    level: null,
    error: null,
    users: {},
  },

  getters: {
    getStoreUsers(state) {
      return state.users;
    },
  },

  mutations: {
    setStoreUsers(state, items) {
      state.users = items;
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
      const url = `http://localhost:8000/users/showall`;
      axios
        .get(url, axiosConfig)
        .then((res) => {
          /*this.Users = res.data;
          store.state.users = res.data;
          console.log(store.state.users);*/
          commit("setStoreUsers", res.data);
          console.log("test123" + state.users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
