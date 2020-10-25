import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    token: null,
    level: null,

    state: {
        totalTvCount: 10 // The TV inventory
      },
      
      getters: {
        // Here we will create a getter
      },
      
      mutations: {
        // Here we will create Jenny
      },
      
      actions: {
        // Here we will create Larry
      }
    });