<template>
    <section-title 
        :title="section.title"
        :caption="section.caption"
        :description="section.description"
    />
    <company-datagrid />
</template>

<script lang="ts">
import SectionTitle from '@/components/SectionTitle.vue';
import CompanyDatagrid from '@/datagrids/landing/CompanyDatagrid.vue';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'landing-company-view',
    data(){
        return {
            section: {
                title: 'لیست شرکت ها',
                caption: 'شرکت های پیشنهادی، جهت گذراندن دوره کارآموزی',
                description: '.در این بخش شرکت های پیشنهادی را برای گذراندن دوره کارآموزی نمایش می دهیم'
            }
        }
    },
    components: { SectionTitle, CompanyDatagrid },
    
});
</script>

<style lang="scss" scoped>

</style>