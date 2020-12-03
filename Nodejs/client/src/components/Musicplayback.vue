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
      @click="getboxinfo"
      >
      <v-icon dark>play_circle_filled</v-icon>
    </v-btn>
  </template>

  <v-card elevation="5" class="pa-1">
    <v-card-title>Music playback</v-card-title>
    <v-card-subtitle class="pb-0"
    >Bewerk onderstaande informatie:</v-card-subtitle
    >
    <v-form class="mx-6" ref="form">
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Currently playing</v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="2">
                    <v-avatar class="ml-5" tile size="140">
                      <img :src=image />
                    </v-avatar>
                  </v-col>
                  <v-col cols="8">
                    <v-select
                    @click = "retrieveSongs"
                    @change="equalise"
                    ref="song"
                    prepend-icon="song"
                    :items="songs"
                    item-text="naam"
                    item-value="songid"
                    label="Song to play"
                    placeholder="Select..."
                    required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-container fluid class="pa-0 ma-0">
                <v-row class="pa-2 ma-0">
                  <v-col md11 class="pa-0 ma-0 pl-5">
                    <div class="pa-2">
                      <div class=" grey--text">Titel:</div>
                      <div>{{ titel }}</div>
                    </div>
                  </v-col>
                  <v-col md11 class="pa-0 ma-0 pl-5">
                    <div class="pa-2">
                      <div class=" grey--text">Status:</div>
                      <div>{{ status }}</div>
                    </div>
                  </v-col>
                  <v-col md11 class="pa-0 ma-0 pl-5">
                    <div class="pa-2">
                      <div class=" grey--text">Volume:</div>
                      <div>{{ volume }}</div>  
                    </div>
                    <v-spacer></v-spacer>
                  </v-col>
                </v-row>
              </v-container>
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
            @click="Play"
            >
            <v-icon dark>play_circle_filled</v-icon>
          </v-btn>
          <v-btn
          small
          fab
          dark
          color="primary"
          class="mx-1 mt-2"
          @click="Pause"
          >
          <v-icon dark>pause_circle_filled</v-icon>
        </v-btn>
        <v-btn
        small
        fab
        dark
        color="blue"
        class="mx-1 mt-2"
        @click="getboxinfo"
        >
        <v-icon dark>refresh</v-icon>
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
import defaultfoto from "../assets/default.png"

export default {
  data() {
    return {
      songs: [],
      dialog: false,
      Naam: "",
      BoxID: "",
      TypeDementie: "",
      PersonID: "",
      titel: "Error in fetching playback status. Try again later...",
      status: "",
      volume: "",
      artist: "",
      image: defaultfoto,
    };
  },
  props: ["User"],
  methods: {
    retrieveSongs: function(){
      var postData = {
        PersonID: this.User.personid,
      };
      let axiosConfig = {
        headers: {
          "auth-token": store.state.token,
        },
      };
      const url = `http://127.0.0.1:8000/muziek/show`;
      axios
      .post(url, postData, axiosConfig)
      .then((res) => {
        this.songs = res.data
        console.log(this.songs)
      })
      .catch((err) => {
        console.log(err);
      });

    },
    equalise:function(selected){
      this.Songid = selected
    },
    getboxinfo: function(){
      const url = `http://192.168.0.18:3000/device/${this.BoxID}`; 
      axios.get(url)
      .then((response) =>{
        console.log(response.data.status)
        if(response.data.connection == "connected" ){
          if(response.data.status.title == undefined && response.data.status.status != "IDLE"){
           this.titel = "Project heartbeat muziek";
           this.status = "Playing"
          }
          else if(response.data.status.status == "IDLE"){
            this.titel = "Nothing playing";
            this.status = "Idling"
          }
          else if(response.data.title == "" ){
            console.log("empty title")
          }
        else{
          this.titel = response.data.status.title;
          this.artist = response.data.status.artist;
          this.status = response.data.status.status;
          this.image = response.data.status.image; 
        }         
        this.volume = response.data.status.volume;
      }
      else if(response.data.connection == "not found"){
        this.titel = "Speaker bestaat niet!";
      }
      else{
        this.titel = "Something went wrong";
      }

    })
      .catch((error) => console.log(error));
    },
    Pause: function(){
      const url = `http://192.168.0.18:3000/device/${this.BoxID}/pause`; 
      console.log(url)
      axios.get(url)
      .then((response) =>{
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    },
    Play: function(){
      console.log("Songid wich is selected:"+ this.Songid)
      if(this.Songid == "Nothing"){
        const url = `http://192.168.0.18:3000/device/${this.BoxID}/play`; 
        console.log(url)
        axios.get(url)
        .then((response) =>{
          console.log(response.data);
        })
        .catch((error) =>{
         //console.log(error);
         console.log();
         if(error.response.data.error == "nothing playing") {
          console.log(this.PersonID)
          var postData = {
            PersonID: this.PersonID,
          };
          
          console.log(postData);

          let axiosConfig = {
            headers: {
              "auth-token": store.state.token,
            },
          };
          const url = `http://127.0.0.1:8000/playback/start`;
          axios
          .post(url, postData, axiosConfig)
          .then(() => {
            this.titel = "Playlist van pmd"
            this.image = defaultfoto
        })
          .catch((err) => {
            console.log(err);
          });
        }
      }) 
      }
      else{
        console.log(this.PersonID);
        var postData = {
          PersonID: this.PersonID,
          SongID: this.Songid
        };

        console.log(postData);

        let axiosConfig = {
          headers: {
            "auth-token": store.state.token,
          },
        };
        const url = `http://127.0.0.1:8000/playback/startsong`;
        axios
        .post(url, postData, axiosConfig)
        .then((response) => {
          this.titel = response.data[0].naam
          this.image = defaultfoto
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  },
  created() { 
   (this.BoxID = this.User.boxid),
   (this.PersonID = this.User.personid),
   (this.Songid = "Nothing")
   

 },
 computed: {
  users() {
    return store.getters.getStoreUsers;
  },
},

};
</script>