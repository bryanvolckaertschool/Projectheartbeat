<template>
  <div class="home">
    <v-container fill-height fluid>
      <v-row justify="space-around">
        <v-col md="6" justify-self="center">
          <v-card elevation="5" class="pa-8">
            <v-card-title>Login</v-card-title>
            <v-card-subtitle>Gelieve eerst in te loggen:</v-card-subtitle>
            <v-form>
              <v-text-field
                label="Email"
                :type="'email'"
                v-model="Email"
                prepend-icon="mail"
                required
              ></v-text-field>

              <v-text-field
                label="Wachtwoord"
                :type="'password'"
                prepend-icon="lock"
                required
              ></v-text-field>

              <v-container fluid>
                <v-row justify="space-around">
                  <v-btn
                    class="px-10 mt-2 primary"
                    @click="login"
                    depressed
                    rounded
                    >Login</v-btn
                  >
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-image: url(https://vzwheartbeats.be/wp-content/uploads/2018/11/heartbeats-dementie-ontroering-hoofdtelefoon-contact-8-1920x1280.jpg);
  background-size: cover;
}
</style>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      Email: "",
      Wachtwoord: "",
    };
  },
  methods: {
    login: function () {

      var postData = {
        PersonID: 2,
      };
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYWFtIjoiTWVsdmluIERldm9zIiwiaWF0IjoxNjAzNTU2NzY1fQ.bt_-TBh-CF5ePFd8_MXoeZvMWOkKiR_SS1Xi5_703tE`,
        },
      };
      const url = `http://localhost:8000/playback/start`;
      axios
        .post(url, postData, axiosConfig)
        .then(() => {
          //console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    },
  },
};
</script>
