<template>
   <v-layout>
        <v-flex xs12 sm10 offset-sm1>
            <v-card>
                <v-card-title>
                <div>
                    <div class="headline">{{walk.name}}</div>
                    <span class="grey--text">Por: {{walk.author}}</span>
                    <p>{{walk.description}}</p>
                </div>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                <v-btn flat color="secondary">Explorar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
  </v-layout>
</template>

<script>
export default {
    name: 'RoutePreview',
    props: {
      walk: Object,
    },
}
</script>