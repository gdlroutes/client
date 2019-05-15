<template>
   <v-container>
            <v-list-tile
              avatar
            >
              <v-list-tile-avatar>
                <v-icon :class="[getIconClass(walk.category_id)]">{{getIcon(walk.category_id)}}</v-icon>
              </v-list-tile-avatar>
  
              <v-list-tile-content>
                <v-list-tile-title>{{ walk.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ walk.description }}</v-list-tile-sub-title>
              </v-list-tile-content>
  
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
   </v-container>
</template>

<script>
export default {
    name: 'RoutePreview',
    props: {
      walk: Object,
    },
    methods: {
        getIconClass(category_id) {
            console.log(category_id)            
            switch (category_id) {
                case '1':          
                return 'blue white--text';
                case '2':
                return 'purple white--text';
                case '3':
                return 'light-green white--text';
                case '4':
                return 'amber white--text';
                default:
                return 'lime white--text';
            }
        },
        getIcon(category_id) {            
            switch (category_id) {
                case 1:          
                return 'tag_faces';
                break;
                case 2:
                return 'palette';
                break;
                case 3:
                return 'local_florist';
                break;
                case 4:
                return 'restaurant';
                default:
                return 'local_play';
            }
        },
    }

}
</script>