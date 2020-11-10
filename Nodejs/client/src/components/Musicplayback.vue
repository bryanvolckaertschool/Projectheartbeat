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
        <v-icon dark>music_note</v-icon>
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
      speakers: [],
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
    updateUser() {
      var postData = {
        Naam: this.Naam,
        SpeakerID: this.BoxID,
        baseHartslag: this.BasisHartslag,
        baseSPO2: this.BasisSPO2,
        typeDementie: this.TypeDementie,
        PersonID: this.User.personid,
      };


        let axiosConfig = {
          headers: {
            "auth-token": store.state.token,
          },
        };
        const url = `http://127.0.0.1:8000/users/update`;
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
  },
  created() { 
    (this.Naam = this.User.Naam),
      (this.BoxID = this.User.boxid),
      (this.BasisHartslag = this.User.baseHartslag),
      (this.BasisSPO2 = this.User.baseSPO2),
      (this.TypeDementie = this.User.typeDementie),
      (this.PersonID = this.User.personid);
  },
};
</script>