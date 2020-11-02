<template>
  <div class="Users" fill-height>
    <Navbar />
    <div class="pa-10">
      <v-container fluid class="pa-0 ma-0">
        <v-row class="pa-0 ma-0">
          <v-spacer></v-spacer>
          <AddUserPopup />
        </v-row>
      </v-container>

      <v-expansion-panels>
        <v-expansion-panel v-for="user in storeUsers" :key="user.Naam" class="my-0">
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
                  <v-btn
                    small
                    fab
                    dark
                    color="orange lighten-1"
                    class="mx-1 mt-2"
                  >
                    <v-icon dark>edit</v-icon>
                  </v-btn>
                  <v-btn
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
import store from "../store";

export default {
  components: { Navbar, Usercard, AddUserPopup },
  data() {
    return {
      Users: {},
    };
  },
  methods: {},
  created() {
    console.log("ik ben created");

    let axiosConfig = {
      headers: {
        "auth-token": store.token,
      },
    };
    const url = `http://localhost:8000/users/showall`;
    axios
      .get(url, axiosConfig)
      .then((res) => {
        this.Users = res.data;
        store.users = res.data;
        console.log(store.users);
        //console.log(this.Users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>