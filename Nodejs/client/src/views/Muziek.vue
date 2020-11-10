<template>
  <div class="Users" fill-height>
    <Navbar />
    <div class="pa-10 pt-0">
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

      <v-expansion-panels>
        <v-expansion-panel
          v-for="user in users"
          :key="user.Naam"
          class="my-0"
        >
          <v-expansion-panel-header>
            <v-row>
              <v-col cols="11">
                <Usercard
                  :Naam="user.Naam"
                  :cijfer="user.personid"
                  :Dementie="user.typeDementie"
                />
              </v-col>
              <v-col>
                <Musicplayback />
              </v-col>
            </v-row>
         
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

import Navbar from "@/components/Navbar.vue";
import Usercard from "@/components/Usercard.vue";
import Musicplayback from "@/components/Musicplayback.vue";

import store from "../store";

export default {
  components: { Navbar, Usercard, Musicplayback },
  data() {
    return {};
  },
  computed: {
    users() {
      return store.getters.getStoreUsers;
    },
  },
  methods: {
    deleteUser(id) {
      var postData = {
        PersonID: id,
      };

      console.log(postData);

      let axiosConfig = {
        headers: {
          "auth-token": store.state.token,
        },
      };
      const url = `http://127.0.0.1:8000/users/delete`;
      axios
        .post(url, postData, axiosConfig)
        .then((/* res */) => {
          //Users terug callen om de data te updaten
          store.dispatch("callUsersAPI");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    sortBy(prop) {
      store.commit("sortStoreUsers", prop);
    },
  },
  created() {
    console.log("ik ben created");

    store.dispatch("callUsersAPI");
  },
};
</script>