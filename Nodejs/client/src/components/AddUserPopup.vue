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
              <v-select
                @click = "retrieveIds"
                @change="equalise"
                ref="speaker"
                prepend-icon="speaker"
                v-model="BoxID"
                :items="speakers"
                item-text="text"
                item-value="id"
                label="Box-ID"
                placeholder="Select..."
                required
              ></v-select>
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
                v-model="BasisHartslag"
                prepend-icon="favorite"
                required
              ></v-text-field>
            </v-col>

            <v-col md3>
              <v-text-field
                label="Basis SPO2"
                v-model="BasisSPO2"
                prepend-icon="science"
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
      speakers: [],
      dialog: false,
      Naam: "",
      BoxID: "",
      TypeDementie: "",
      BasisHartslag: "",
      BasisSPO2: "",
    };
  },
  methods: {
    retrieveIds: function(){
 
        const url = `http://192.168.0.18:3000/device/`; 
        axios.get(url)
        .then((response) =>{
          let spekie = []
          
          console.log(response.data)
          response.data.forEach(function(object){
            spekie.push({text:object.name,id:object.id})
            
          });
          console.log(spekie)
          this.speakers = spekie
          console.log(this.speakers)
        }) 
        .catch((error) => console.log(error));

    },
    equalise:function(selected){
      this.BoxID = selected
    },
    addUser: function () {
      console.log(this.BoxID)
      var postData = {
        Naam : this.Naam,
        SpeakerID : this.BoxID,
        baseHartslag : this.BasisHartslag,
        baseSPO2 : this.BasisSPO2,
        typeDementie : this.TypeDementie
      };

      let axiosConfig = {
        headers: {
          "auth-token": store.state.token
        },
      };
      const url = `http://127.0.0.1:8000/users/create`;
      axios
        .post(url, postData , axiosConfig)
        .then((/* res */) => {
          //Users terug callen om de data te updaten
          store.dispatch("callUsersAPI");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>