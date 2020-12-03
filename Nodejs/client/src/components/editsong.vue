<template>
  <v-dialog v-model="dialog" max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        fab
        dark
        color="blue lighten-1"
        class="mx-1 mt-2"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>edit</v-icon>
      </v-btn>
    </template>

    <v-card elevation="5" class="pa-1">
      <v-card-title>Song updaten</v-card-title>
      <v-card-subtitle class="pb-0"
        >Bewerk onderstaande informatie:</v-card-subtitle
      >
      <v-form class="mx-6" ref="form" @submit.prevent="updateSong()">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Titel"
                v-model="Titel"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="SongID"
                v-model="Songid"
                
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
            <v-btn
              class="blue lighten-1 mb-2"
              @click="dialog = false"
              rounded
              type="submit"
              ><span class="font-weight-bold">Update</span>
              <v-icon right>update</v-icon>
            </v-btn>
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
      Titel: "",
      Songid: "",
      Duratie: ""
    };
  },
  props: ["Song"],
  methods: {
    retrieveIds: function(){
 
        const url = `http://192.168.0.16:3000/device/`; 
        axios.get(url)
        .then((response) =>{
          let speaker = []
          
          console.log(response.data)
          response.data.forEach(function(object){
            speaker.push({text:object.name,id:object.id})
            
          });
          console.log(speaker)
          this.speakers = speaker
          console.log(this.speakers)
        }) 
        .catch((error) => console.log(error));

    },
    equalise:function(selected){
      this.BoxID = selected
    },
    updateSong() {
      var postData = {
        SongID: this.Songid,
        PersonID: this.PersonID,
        Naam: this.Titel,
        Duratie: this.Duratie
      };

      console.log(postData);

        let axiosConfig = {
          headers: {
            "auth-token": store.state.token,
          },
        };
        const url = `http://127.0.0.1:8000/muziek/update`;
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
      console.log(this.Song.naam);
      (this.Titel = this.Song.naam),
      (this.Songid = this.Song.songid),
      (this.Duratie = this.Song.duratie),
      (this.PersonID = this.Song.personid)

    },
    computed: {
    users() {
      return store.getters.getStoreUsers;
    },
  },
};
</script>