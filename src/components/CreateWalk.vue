<template>
    <v-layout row wrap class="bg">
      <v-layout row fill-height>
          <v-flex xs12 fill-height>
            <div id="map" class="map">
              <div class="leaflet-bottom leaflet-right">
                <v-flex xs7 offset-xs4>
                  <v-card class="rounded" >
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-flex xs12>
                          <v-card-text >
                            <v-form>
                              <v-container>
                                <v-layout row wrap>
                                
                                  <v-flex xs12>
                                    <v-text-field class="bttn" dense label="Nombre de la ruta">
                                    </v-text-field>
                                  </v-flex>

                                  <v-flex xs12>
                                    <v-overflow-btn class="bttn"
                                      :items="dropdown_font"
                                      label="Categoria"
                                      
                                    ></v-overflow-btn>
                                  </v-flex>

                                  <v-flex xs12>
                                    <v-textarea class="bttn"
                                      name="input-7-1"
                                      label="Descripcion"
                                      value=""
                                    ></v-textarea>
                                  </v-flex>
                                
                                </v-layout>
                                <v-flex xs6 offset-xs2 >
                                  <v-btn round dark depressed @click="addroute()" color="#4b6584" class="bttn">Guardar Ruta</v-btn>
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
  export default {
  name: 'CreateWalk',
  components: {
  },
  data: () => ({
  dropdown_font: ['Recreativo', 'Arte y Cultura', 'Naturaleza'],
  map: null,
  tileLayer: null,
  layers: [],
  controlLayers: [],
  route: {
  name: "",
  category: "",
  description: "",
  waypoints: "",
  }
  }),
  mounted() {
  var map = L.map('map').setView([20.65, -103.3], 13);
  L.esri.basemapLayer("Streets").addTo(map);

  L.Routing.control({
  waypoints: [
  L.latLng(20.65, -103.3),
  L.latLng(20.65, -103.29)
  ]
  }).addTo(map);

  },
  methods: {
  addroute() {
  console.log(L.Routing.plan());
  }
  }
  }
</script>

<style>
  .bttn{
  pointer-events: auto;
  }

  .rounded{
  border-radius:20px;
  }

</style>
