<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
 
<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  mounted() {
    console.log(process.env)
    console.log(process.env.NODE_ENV)
    console.log(process.env.VUE_APP_NOT_SECRET_CODE)
  },
};
</script>

