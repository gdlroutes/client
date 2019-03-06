<template lang="html">
  <div class="myClass">
    <v-toolbar color="grey darken-1" dark app dense flat height="58px">
      <v-toolbar-side-icon  class="text--white"></v-toolbar-side-icon>
    
       <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>GDL Walks</span>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            v-for="item in items"
            :key="item"
            @click=""
          >
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      </v-toolbar-items>
    </v-toolbar>

  
</div>
</template>

<script>
//<v-img :src="require('../img/logo.png')" height="20%"></v-img>
import axios from 'axios'
export default {
  name: "Navbar",
  data() {
    return {
      drawer: null,
      items: [],
      showFavorites: false,
      favs: []
    };
  },
  methods:{
    selectCategory(id){
      this.$root.$emit('event', id);
    },loadCategories(){
      axios.get(process.env.VUE_APP_SCHEME+'://'+process.env.VUE_APP_HOST+process.env.VUE_APP_PORT+process.env.VUE_APP_PREFIX+'/categories')
      .then(response => {
          this.items=response.data;
      })
      .catch()
    }
  },beforeMount(){
    this.loadCategories()
  }
};
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css?family=Alfa+Slab+One");
@import url('https://fonts.googleapis.com/css?family=Lato:300,400');
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400');
.drawer {
  color: #4a69bd;
  background-color: #4a69bd;
}
.myTitle {
font-family: 'Oswald', sans-serif;
font-weight: 300;
  font-size: 27px;
}
.categories{
  background-color: white
}
</style>