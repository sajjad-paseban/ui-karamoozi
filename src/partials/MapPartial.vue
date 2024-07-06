<template>
  <div class="map-partial">
    <section-title title="موقعیت دانشگاه" caption="موقعیت جغرافیایی دانشگاه بر روی نقشه">
      <AkMap />
    </section-title>
    <section class="map-container">
      <l-map ref="map" v-model:zoom="zoom" :center="[JSON.parse(site.location).lat, JSON.parse(site.location).long]">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap">
        </l-tile-layer>


        <LMarker :lat-lng="[JSON.parse(site.location).lat, JSON.parse(site.location).long]" />
      </l-map>
    </section>
  </div>
</template>
  
<script lang="ts">
import "leaflet/dist/leaflet.css";
import SectionTitle from "@/components/SectionTitle.vue";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { AkMap } from "@kalimahapps/vue-icons";
import { useSiteStore } from '@/store/site-store';
export default {
  name: 'map-partial',
  setup() {
    const site = useSiteStore().site
    return {
      site
    }
  },
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
.map-partial {
  width: 100%;

  .map-container {
    padding: 0 10px;
    height: 550px;
  }
}
</style>