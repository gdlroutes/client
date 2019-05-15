<template>
  <v-layout row wrap class="bg">
    <v-layout row fill-height>
      <v-flex xs12 fill-height>
        <div id="map" class="map">
          <div class="leaflet-bottom leaflet-right">
            <v-flex xs7 offset-xs4>
              <v-card class="rounded">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-flex xs12>
                      <v-card-text>
                        <v-form>
                          <v-container>
                            <v-layout row wrap>
                              <v-flex xs12>
                                <v-text-field
                                  v-model="route.name"
                                  class="bttn"
                                  dense
                                  label="Nombre de la ruta"
                                ></v-text-field>
                              </v-flex>

                              <v-flex xs12>
                                <v-overflow-btn
                                  class="bttn"
                                  :items="dropdown_font"
                                  v-model="route.category"
                                  label="Categoria"
                                ></v-overflow-btn>
                              </v-flex>

                              <v-flex xs12>
                                <v-textarea
                                  class="bttn"
                                  name="input-1-1"
                                  label="Descripcion"
                                  value
                                  v-model="route.description"
                                ></v-textarea>
                              </v-flex>
                            </v-layout>
                            <v-flex xs6 offset-xs2>
                              <v-btn
                                round
                                dark
                                depressed
                                @click="addroute()"
                                color="#4b6584"
                                class="bttn"
                              >Guardar Ruta</v-btn>
                            </v-flex>
                          </v-container>
                        </v-form>
                      </v-card-text>
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-card>
              <br>
              <br>
            </v-flex>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import router from "../router";
import axios from 'axios';
export default {
  name: "CreateWalk",
  components: {},
  data: () => ({
    dropdown_font: [
      "Recreativo",
      "Arte y Cultura",
      "Naturaleza",
      "Gastronómica"
    ],
    map: null,
    tileLayer: null,
    layers: [],
    mRouting: null,
    controlLayers: [],
    route: {
      name: "",
      category: "",
      description: "",
      waypoints: "",
      author: "Test User"
    }
  }),
  mounted() {
    var map = L.map("map").setView([20.65, -103.3], 13);
    L.esri.basemapLayer("Streets").addTo(map);

    this.mRouting = L.Routing.control({
      waypoints: [L.latLng(20.65, -103.3), L.latLng(20.65, -103.29)]
    });

    this.mRouting.addTo(map);
  },
  methods: {
    addroute() {
      this.route.waypoints = this.mRouting.getWaypoints();

       axios(process.env.VUE_APP_APIURL+'/geodata/routes', 
      {method:"post",data:this.route,withCredentials:true })
      .then( response => {
        
      })
      .catch( err => {
        var walks = JSON.parse(this.$localStorage.get("mWalks"));
        if (walks) {
          walks.push(this.route);
          this.$localStorage.set("mWalks", JSON.stringify(walks));
        } else {
          this.$localStorage.set("mWalks", JSON.stringify([this.route]));
        }
      })
      
      router.push("search");
    }
  }
};
</script>

<style>
.bttn {
  pointer-events: auto;
}

.rounded {
  border-radius: 20px;
}
</style>
