<script lang="ts">
import InternInfoDatagrid from "@/datagrids/panel/InternInfoDatagrid.vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: { InternInfoDatagrid },
    name: 'intern-info-dialog',
    props: ['data'],
    methods: {
        handleClose() {
            this.$emit('close')
        }
    }
})
</script>
<template>
    <div class="dialog border">
        <div class="dialog-header border-bottom p-2">
            <button type="button" @click="handleClose" class="btn-close"></button>
            <span>
                مشخصات کارآموز
            </span>
        </div>
        <div class="dialog-body">
            <intern-info-datagrid :data="data" />
        </div>
    </div>
</template>

<style lang="scss">
.dialog {
    overflow: hidden;
    position: fixed !important;
    top: 62px;
    left: 0;
    margin: 10px;
    width: calc(100% - 250px - 20px);
    bottom: 0;
    background-color: #fff;
    z-index: 500 !important;
    border-radius: 5px;

    .dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .dialog-body {
        padding: 10px;
        height: 100%;
        overflow-y: auto;
    }
}
</style>