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
          <AddUserPopup />
        </v-row>
      </v-container>

      <v-expansion-panels>
        <v-expansion-panel
          v-for="user in testtest"
          :key="user.Naam"
          class="my-0"
        >
          <v-expansion-panel-header>
            <Usercard
              :Naam="user.Naam"
              :cijfer="user.personid"
              :Dementie="user.typeDementie"
            />
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container fluid class="pa-0 ma-0">
              <v-row class="pa-0 ma-0">
                <v-col md11 class="pa-0 ma-0 pl-5">
                  <div>
                    <div class="caption grey--text">Box-ID:</div>
                    <div>{{ user.boxid }}</div>
                  </div>

                  <div>
                    <div class="caption grey--text">Basis SPO2:</div>
                    <div>{{ user.baseSPO2 }}</div>
                  </div>

                  <div>
                    <div class="caption grey--text">Basis Hartslag:</div>
                    <div>{{ user.baseHartslag }}</div>
                  </div>
                </v-col>
                <v-col md1 lg="1" class="pa-0 ma-0 mx-0 text-right">
                  <!-- hier udpate compo -->
                  <updateUserPopup :User="user" />
                  <v-btn
                    @click="deleteUser(user.personid)"
                    small
                    fab
                    dark
                    color="red lighten-1"
                    class="mx-1 mt-2"
                  >
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
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
import AddUserPopup from "@/components/AddUserPopup.vue";
import updateUserPopup from "@/components/updateUserPopup.vue";

import store from "../store";

export default {
  components: { Navbar, Usercard, AddUserPopup, updateUserPopup },
  data() {
    return {};
  },
  computed: {
    testtest() {
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
      const url = `http://192.168.0.103:8000/users/delete`;
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