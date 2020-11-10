<template>
  <div class="Users" fill-height>
    <Navbar />
    <div class="pa-10 pt-0 my-5">
      <v-container fluid class="pa-0 ma-0">
        <v-row align="center" class="pa-0 ma-0">
          <v-btn class="mr-5" rounded depressed small @click="sortBy('Naam')">
            <v-icon left small>person</v-icon>
            <span class="primary--text text-subtitle-2 text-lowercase">Op naam</span>
          </v-btn>

          <v-btn rounded depressed small @click="sortBy('personid')">
            <v-icon left small>loyalty</v-icon>
            <span class="primary--text text-subtitle-2 text-lowercase">op ID</span>
          </v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>

      <v-card class="ma-5">
        <v-card
        v-for="user in users"
        :key="user.Naam"
        class="my-0 pa-2"
        >

        <v-row class="pa-0 ma-0">
          <v-col cols="4">
            <Usercard
            :Naam="user.Naam"
            :cijfer="user.personid"
            :Dementie="user.typeDementie"
            />
          </v-col>
          <v-col cols="7">
            <div>
              <div class="caption grey--text">Box-ID:</div>
              <div>{{ user.boxid }}</div>
            </div>

          </v-col>
          <v-col cols="1" class="pa-0">
            <Musicplayback :User="user"/>
            <Musiclist :User="user"/>
        </v-col>
      </v-row>

      
    </v-card>
  </v-card>
</div>
</div>
</template>

<script>
//const axios = require("axios");

import Navbar from "@/components/Navbar.vue";
import Usercard from "@/components/Usercard.vue";
import Musicplayback from "@/components/Musicplayback.vue";
import Musiclist from "@/components/Musiclist.vue";


import store from "../store";

export default {
  components: { Navbar, Usercard, Musicplayback,Musiclist },
  data() {
    return {};
  },
  computed: {
    users() {
      return store.getters.getStoreUsers;
    },
  },
  methods: {
    sortBy(prop) {
      store.commit("sortStoreUsers", prop);
    }
  },
  created() {
    console.log("ik ben created");

    store.dispatch("callUsersAPI");
  },
};
</script>