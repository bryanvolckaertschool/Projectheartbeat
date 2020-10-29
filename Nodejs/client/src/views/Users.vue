<template>
  <div class="Users" fill-height>
    <Navbar />
    <div class="pa-10">
      <v-expansion-panels>
        <v-expansion-panel v-for="user in Users" :key="user.Naam" class="my-0">
          <v-expansion-panel-header>
            <Usercard
              :Naam="user.Naam"
              :cijfer="user.personid"
              :dementie="user.typeDementie"
            />
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container class="pa-0 ma-0">
              <v-row wrap class="pa-0 ma-0">
                <v-col md8 class="pa-0 ma-0 pl-5">
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
import store from "../store";

export default {
  components: { Navbar, Usercard },
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
    const url = `http://192.168.8.15:8000/users/showall`;
    axios
      .get(url, axiosConfig)
      .then((res) => {
        this.Users = res.data;
        console.log(this.Users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>