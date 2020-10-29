<template>
  <div class="AddUser" fill-height>
    <Navbar />
    <div class="pa-10">
    <v-expansion-panels>
      <v-expansion-panel class="my-0">
        <v-expansion-panel-content>
          <v-container fluid class="pa-0 ma-0">
            <v-form ref="form" @submit.prevent="login">
              <v-row justify="space-around">
                <v-col md11 class="pa-0 ma-0 pl-5 " >
                  <v-text-field
                  label="Email"
                  :type="'email'"

                  v-model="Email"
                  prepend-icon="mail"
                  required
                  ></v-text-field>
                </v-col>

                <v-col md11 class="pa-0 ma-0 pl-5 " >
                  <v-text-field
                  label="Wachtwoord"
                  :type="'password'"

                  v-model="Wachtwoord"
                  prepend-icon="lock"
                  required
                  ></v-text-field>
                </v-col>
                <v-col md11 class="pa-0 ma-0 pl-5 " >
                  <v-container fluid>
                    <v-btn
                    class="px-10 mt-2 primary"
                    type="submit"
                    depressed
                    rounded
                    >Login</v-btn
                    >

                  </v-container>
                </v-col>
              </v-row>
            </v-form>
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
  import store from "../store";

  export default {
    components: { Navbar },
    data() {
      return {
        Email: "",
        Wachtwoord: "",
        Users: {},
      };
    },
    methods: {
      AddUserHandler: function () {
        this.$router.push("/AddUser")
      },
    },
    created() {
      console.log("ik ben created");

      let axiosConfig = {
        headers: {
          "auth-token": store.token,
        },
      };
      const url = `http://192.168.0.16:8000/users/showall`;
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