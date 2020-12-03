<template>
  <v-card flat>
    <v-container fluid class="pa-0 ma-0  mr-5 ">
      <v-row wrap class="pa-0 ma-0">
        <v-col md5 class="pa-0 ma-0">
          <div class="caption grey--text">Naam:</div>
          <div>{{ Naam }}</div>
        </v-col>
        <v-col md3 class="pa-0 ma-0">
          <div class="caption grey--text">ID:</div>
          <div>{{ cijfer }}</div>
        </v-col>
        <v-col md3 class="pa-0 ma-0">
          <div class="caption grey--text">Type dementie:</div>
          <div>{{ Dementie }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    props: ["Naam", "cijfer", "Dementie"],
    methods: {},
  };
</script>
