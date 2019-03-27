<template>
    <v-layout row wrap class="bg">
                <v-layout row fill-height>
            <v-flex xs12 fill-height>
                <div id="map" class="map"></div>
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
    map: null,
    tileLayer: null,
    layers: [],
    controlLayers: [],
  }),
  mounted() {
    var map = L.map('map').setView([20.65, -103.3], 13);
    L.esri.basemapLayer("Streets").addTo(map);
    
    L.Routing.control({
    waypoints: [
        L.latLng(20.65, -103.3),
        L.latLng(20, -103)
    ]
}).addTo(map);
  },
}
</script>