<template>
  <v-dialog v-model="dialog" max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
      small
      fab
      dark
      color="green darken-1"
      class="mx-1 mt-2"
      v-bind="attrs"
      v-on="on"
      >
      <v-icon dark>play_circle_filled</v-icon>
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
            <v-card>
              <v-card-title>Currently playing</v-card-title>
              <div class="pa-5">
                <div class=" grey--text">Titel:</div>
                <div>{{ titel }}</div>
              </div>
              <div class="pa-5">
                <div class=" grey--text">Status:</div>
                <div>{{ status }}</div>
              </div>
              <div class="pa-5">
                <div class=" grey--text">Volume:</div>
                <div>{{ volume }}</div>  
              </div>
              <v-spacer></v-spacer>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5"></v-col>
          <v-col cols="2" align="center">
            <v-btn
              small
              fab
              dark
              color="green "
              class="mx-1 mt-2"
            >
            <v-icon dark>play_circle_filled</v-icon>
          </v-btn>
          <v-btn
            small
            fab
            dark
            color="primary"
            class="mx-1 mt-2"
          >
          <v-icon dark>pause_circle_filled</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="5"></v-col>
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
      speakers: [],
      dialog: false,
      Naam: "",
      BoxID: "",
      TypeDementie: "",
      PersonID: "",
      titel: "Error in fetching playback status. Try again later...",
      status: "",
      volume: "",
    };
  },
  props: ["User"],
  methods: {

  },
  created() { 
       console.log(this.User.Naam),
      (this.BoxID = this.User.boxid)
      const url = `http://192.168.0.18:3000/device/${this.BoxID}`; 
      console.log(url)
      axios.get(url)
      .then((response) =>{
        console.log(response.data);
        this.titel = response.data.status;
        this.status = response.data.status;
        this.volume = response.data.volume;
      })
      .catch((error) => console.log(error));
     
  },
  computed: {
    users() {
      return store.getters.getStoreUsers;
    },
  },

};
</script>