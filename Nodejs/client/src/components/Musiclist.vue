<template>
  <v-dialog v-model="dialog" max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        fab
        dark
        color="blue darken-1"
        class="mx-1 mt-2"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>list</v-icon>
      </v-btn>
    </template>

    <v-card elevation="5" class="pa-1">
      <v-card-title>Music playback</v-card-title>
      <v-card-subtitle class="pb-0"
        >Bewerk onderstaande informatie:</v-card-subtitle
      >
      <v-form class="mx-6" ref="form" @submit.prevent="updateUser()">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Naam"
                v-model="Naam"
                prepend-icon="person"
                required
              ></v-text-field>
            </v-col>
          </v-row>

        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
const axios = require("axios");
import store from "../store";

export default {
  data() {
    return {
      dialog: false,
      Naam: "",
      BoxID: "",
      TypeDementie: "",
      BasisHartslag: "",
      BasisSPO2: "",
      PersonID: "",
    };
  },
  props: ["User"],
  methods: {
    retrieveIds: function(){
 
        const url = `http://192.168.0.18:3000/device/${this.BoxID}`; 
        axios.get(url)
        .then((response) =>{
          console.log(response.data)
        }) 
        .catch((error) => console.log(error));

    },
  },
  created() { 
      (this.BoxID = this.User.boxid)
  },
      computed: {
    users() {
      return store.getters.getStoreUsers;
    },
  },
};
</script>