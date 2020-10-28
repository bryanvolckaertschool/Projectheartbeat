<template>
  <div class="Users" fill-height>
    <Navbar />
    <div class="pa-10">
      <v-expansion-panels>
        <v-expansion-panel v-for="user in Users" :key="user.Naam" class="my-0">
          <v-expansion-panel-header> 
              <Usercard :Naam="user.Naam" :cijfer="user.personid" :dementie="user.typeDementie"/>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Navbar from "@/components/Navbar.vue";
import Usercard from "@/components/Usercard.vue"
import store from "../store";

export default {
  components: { Navbar, Usercard},
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
        console.log(this.Users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>