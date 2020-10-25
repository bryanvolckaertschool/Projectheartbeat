<template>
  <div class="Dashboard">
    <h1>This is the dashboard page</h1>
    <v-btn class="px-10 mt-2 primary" @click="logout" depressed rounded>Logout</v-btn>
  </div>
</template>

<script>
import store from '../store';

export default {
  data() {
    return {
      Email: "",
      Wachtwoord: "",
    };
  },
  methods: {
    logout: function () {
      store.token = null
      this.$router.push("/")
    },
  },
};
</script>