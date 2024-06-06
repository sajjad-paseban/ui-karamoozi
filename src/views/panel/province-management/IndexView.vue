<template>
    <div class="row justify-content-between flex-row-reverse py-3 align-items-center">
        <div class="col-auto">
            <h3 class="text-secondary">
                نمایش استان ها
            </h3>
        </div>
        <div class="col-auto">
            <button type="button" @click="page({ page: 1 })" class="btn btn-primary btn-sm shadow-sm">
                استان جدید
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <province-datagrid @get-page-data="page" />
        </div>
    </div>
</template>

<script lang="ts">
import ProvinceDatagrid from "@/datagrids/panel/ProvinceDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        ProvinceDatagrid
    },
    methods: {
        page: function (val: any) {
            this.$emit('get-page-data', val)
        }
    }
})
</script>