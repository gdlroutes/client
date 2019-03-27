<template>
    <v-layout>
        <v-layout row fill-height>
            <v-flex xs12 fill-height>
                <div id="map" class="map"></div>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
export default {
  name: 'Map',
  components: {
  },
  data: () => ({
    map: null,
    tileLayer: null,
    layers: [],
    controlLayers: [],
  }),
  mounted() {
    var map = L.map('map').setView([20.65, -103.3], 13);
    L.esri.basemapLayer("Streets").addTo(map);
    

    var parks = L.esri.featureLayer({
      url: "https://services9.arcgis.com/31Z5spKs4XbGMjHK/arcgis/rest/services/gdlpoi/FeatureServer/0/",
    }).addTo(map);

    var popupTemplate = "<h3>{nombre}</h3>{descripcion}";

    parks.bindPopup(function(e){
      return L.Util.template(popupTemplate, e.feature.properties)
    });
  },
};
</script>

<style>
.map { height: 100%; }

</style>