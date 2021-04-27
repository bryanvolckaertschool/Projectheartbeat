<template>
  <v-dialog v-model="dialog" max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        fab
        dark
        color="green lighten-1"
        v-bind="attrs"
        v-on="on"
        class="ma-5"
      >
        <v-icon dark>add</v-icon>
      </v-btn>
    </template>

    <v-card elevation="5" class="pa-1">
      <v-card-title>Liedje toevoegen</v-card-title>
      <v-card-subtitle class="pb-0"
        >Vul onderstaande informatie in:</v-card-subtitle
      >
      <v-form class="mx-6" ref="form" @submit.prevent="addSong">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Titel"
                v-model="Naam"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="SongID"
                v-model="SongID"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md3>
              <v-text-field
                label="Duratie"
                v-model="Duratie"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="space-around">
            <v-btn class="green lighten-1 mb-2" @click="dialog = false" rounded type="submit"
              ><span class="font-weight-bold">Toevoegen</span>
              <v-icon right>add</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
const axios = require('axios');
import store from '../store';

export default {
  data() {
    return {
      dialog: false,
      PersonID: "",
      Naam: "",
      SongID: "",
      Duratie: ""
    };
  },
  props: ["User"],
  methods: {
    addSong: function () {
      
      var postData = {
        PersonID : this.PersonID,
        Naam : this.Naam,
        SongID : this.SongID,
        Duratie : this.Duratie,
      };

      let axiosConfig = {
        headers: {
          "auth-token": store.state.token
        },
      };
      const url = `http://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_SERVER_PORT}/muziek/add`;
      axios
        .post(url, postData , axiosConfig)
        .then((res) => {
          //Users terug callen om de data te updaten
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
      created() { 
      console.log(this.User.personid);
      (this.PersonID = this.User.personid)

    },
};
</script>