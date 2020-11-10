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
			@click="getsongs"
			>
			<v-icon dark>list</v-icon>
		</v-btn>
	</template>


	<v-card elevation="5" class="pa-1">
		<v-card-title>{{Naam}}<addsong :User="User" /> <v-btn small fab dark color="blue" @click="getsongs">
        <v-icon dark>refresh</v-icon>
      </v-btn></v-card-title>

		<v-card
		v-for="song in songs"
		:key="song.title"
		class="my-0"
		>

			<v-container fluid class="pa-0 ma-0">
				<v-row class="pa-2 ma-0">
					<v-col md11 class="pa-0 ma-0 pl-5">
						<div>
							<p class=" grey--text">Titel:</p>
							<p>{{ song.naam }}</p>
						</div>
					</v-col>
					<v-col md11 class="pa-0 ma-0 pl-5">
						<div>
							<p class=" grey--text">Songid:</p>
							<p>{{ song.songid }}</p>
						</div>
					</v-col>
					<v-col md11 class="pa-0 ma-0 pl-5">
						<div>
							<p class=" grey--text">Duratie: </p>
							<p>{{ song.duratie }}</p>
						</div>
					</v-col>
					<v-col md1 lg="1" class="pa-0 ma-0 mx-0 text-right">
                  <!-- hier udpate compo -->
                  
                  <editsong :Song="song"/>
                  <v-btn
                    @click="deleteSong(song.personid,song.songid); dialog = false"
                    small
                    fab
                    dark
                    color="red lighten-1"
                    class="mx-1 mt-2"
                  >
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </v-col>
				</v-row>
			</v-container>

	</v-card>

</v-card>

</v-dialog>
</template>

<script>
const axios = require("axios");
import store from "../store";
import editsong from "@/components/editsong.vue";
import addsong from "@/components/Addsong.vue";

export default {
	components: { editsong, addsong},
	data() {
		return {
			songs: [],
			dialog: false,
			Naam: "",
			PersonID: "",
			titel: "Error in fetching songs. Try again later...",
			duratie: "",
			songid:""
		};
	},
	props: ["User"],
	methods: {
		getsongs: function() {

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
	
	deleteSong: function(personid,songid) {
      var postData = {
        PersonID: personid,
        SongID: songid
      };

      console.log(postData);

      let axiosConfig = {
        headers: {
          "auth-token": store.state.token,
        },
      };
      const url = `http://127.0.0.1:8000/muziek/delete`;
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
		console.log(this.User.Naam),
		(this.BoxID = this.User.boxid),
		(this.Naam = this.User.Naam)
	},
	computed: {
		users() {
			return store.getters.getStoreUsers;
		},
	},

};
</script>