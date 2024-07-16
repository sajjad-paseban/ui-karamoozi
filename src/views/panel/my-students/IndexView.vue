<template>
    <div class="row border-bottom justify-content-between flex-row-reverse py-3 align-items-center">
        <div class="col-auto">
            <h3 class="text-secondary">
                دانشجو های من
            </h3>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <my-students-datagrid />
        </div>
    </div>
</template>

<script lang="ts">
import MyStudentsDatagrid from '@/datagrids/panel/MyStudentsDatagrid.vue'
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        MyStudentsDatagrid
    },
})
</script>