<template>
    <div class="map-partial">
        <section-title 
            title="موقعیت دانشگاه" 
            caption="موقعیت جغرافیایی دانشگاه بر روی نقشه"
        >
            <AkMap />
        </section-title>
        <section class="map-container">
            <l-map 
                ref="map" 
                v-model:zoom="zoom" 
                :center="[36.2829981, 59.5481874]">
                <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                >
                </l-tile-layer>
        
        
                <LMarker :lat-lng="[36.2829981,59.5481874]" />
            </l-map>
        </section>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import SectionTitle from "@/components/SectionTitle.vue";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
  import { AkMap } from "@kalimahapps/vue-icons";
  export default {
    name: 'map-partial',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      SectionTitle,
      AkMap
    },
    data() {
      return {
        zoom: 15,
      };
    },
  };
</script>
  
<style lang="scss" scoped>
    .map-partial{
        width: 100%;
        .map-container{
            padding: 0 10px;
            height: 350px;
        }
    }
</style>