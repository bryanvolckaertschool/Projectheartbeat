<template>
  <v-dialog max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        fab
        dark
        color="green lighten-1"
        v-bind="attrs"
        v-on="on"
        class="mb-5 mr-5"
      >
        <v-icon dark>add</v-icon>
      </v-btn>
    </template>

    <v-card elevation="5" class="pa-1">
      <v-card-title>Patiënt toevoegen</v-card-title>
      <v-card-subtitle class="pb-0"
        >Vul onderstaande informatie in:</v-card-subtitle
      >
      <v-form class="mx-6" ref="form" @submit.prevent="addUser">
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

          <v-row>
            <v-col>
              <v-text-field
                label="Box-ID"
                v-model="BoxID"
                prepend-icon="speaker"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="Type Dementie"
                v-model="TypeDementie"
                prepend-icon="accessibility_new"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md3>
              <v-text-field
                label="Basis hartslag"
                v-model="BaseHartslag"
                prepend-icon="favorite"
                required
              ></v-text-field>
            </v-col>

            <v-col md3>
              <v-text-field
                label="Basis SPO2"
                v-model="BaseSPO2"
                prepend-icon="science"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="space-around">
            <v-btn class="green lighten-1 mb-2" rounded type="submit"
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
      Naam: "",
      BoxID: "",
      TypeDementie: "",
      BasisHartslag: "",
      BasisSPO2: "",
    };
  },
  methods: {
    addUser: function () {
      console.log(
        this.Naam +
          this.BoxID +
          this.TypeDementie +
          this.BasisHartslag +
          this.BasisSPO2
      );

      var postData = {
        Naam : this.Naam,
        SpeakerID : this.BoxID,
        baseHartslag : this.BaseHartslag,
        baseSPO2 : this.BaseSPO2,
        typeDementie : this.TypeDementie
      };

      let axiosConfig = {
        headers: {
          "auth-token": store.token
        },
      };
      const url = `http://192.168.0.103:8000/users/create`;
      axios
        .post(url, postData , axiosConfig)
        .then((res) => {
          console.log(res)
          console.log("Done i guess?")
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>