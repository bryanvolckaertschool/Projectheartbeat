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
                :rules="[rules.emailRules]"
                v-model="Email"
                prepend-icon="mail"
                required
              ></v-text-field>


              <v-text-field
                label="Wachtwoord"
                :type="'password'"
                :rules="[rules.passwordRules]"
                v-model="Wachtwoord"
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
const jwt = require("jsonwebtoken");
import store from '../store';

export default {
  data() {
    return {
      Email: "",
      Wachtwoord: "",
      rules: {
        passwordRules: v => !!v || "Wachtwoord is vereist",
        emailRules: v => !!v || "Email is vereist",

      }
    };
  },
  methods: {
    login: function () {

      var postData = {
        Email: this.Email,
        Wachtwoord: this.Wachtwoord
      };
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      const url = `http://localhost:8000/auth/login`;
      axios
        .post(url, postData, axiosConfig)
        .then((res) => {
          if(res.data == "Not the same"){
            this.validPassword = false;
            store.level = -1
          }
          store.token = res.data.token
          //console.log(res.data)

          jwt.verify(res.data.token, "mskjjkmsqfsdfqsdf", function(err, decoded) {
            if(decoded != undefined){ store.level = decoded.Level; this.validPassword = true;} // bar
          });
          this.$router.push("/Dashboard")
        })
        .catch((err) => {
          console.log(err)   
        });
    },
  },
};
</script>
