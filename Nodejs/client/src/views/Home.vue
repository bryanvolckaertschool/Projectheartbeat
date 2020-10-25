<template>
  <div class="home">
    <v-container fluid>
      <v-row justify="space-around">
        <v-col md=6 justify-self="center">
          <v-card elevation="5" class="pa-8">
            <v-card-title>Rusthuis</v-card-title>
            <v-card-subtitle>Login of registreer uw rusthuis</v-card-subtitle>
            <v-form>
              <v-text-field
                label="Naam"
                v-model="Naam"
                prepend-icon="person_pin"
                required
              ></v-text-field>

              <v-text-field
                label="Email"
                :type="'email'"
                prepend-icon="mail"
                required
              ></v-text-field>

              <v-text-field
                label="Wachtwoord"
                :type="'password'"
                prepend-icon="security"
                required
              ></v-text-field>

              <v-container fluid>
                <v-row justify="space-around">
                  <v-btn class="px-10 mt-2 primary" depressed rounded>Login</v-btn>
                  <v-btn class="px-10 mt-2" outlined rounded color="primary">Registreer</v-btn>
                </v-row>

              </v-container>
      
              
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Naam: "",
      Email: "",
      Wachtwoord: "",
    };
  },
};
</script>
