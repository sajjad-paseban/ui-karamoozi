<template>
    <div class="loading" :class="{ type_1: type == 1 }">
        <div v-if="type == 0" class="loading-cover"></div>
        <div class="loading-main" :class="{ type_0: type == 0 }">
            <Jumper :bgColor="type == 0 ? '#384DFF' : '#fff'" class="spinner"></Jumper>
            <span v-if="type == 1">
                درحال برقراری ارتباط با سرور
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import '@/assets/css/vue-loading-spinner.css'
import Jumper from '@/components/Jumper.vue';
import { defineComponent } from 'vue';

export default defineComponent({

    name: 'Loading',
    props: {
        type: {
            default: 0
        }
    }

    ,
    components: {
        Jumper
    }
})
</script>

<style lang="scss" scoped>
.loading {
    position: fixed;
    z-index: 30 !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &.type_1 {
        background-image: linear-gradient(127deg, #384DFF 0%, #579BE9 91%);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .loading-cover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        backdrop-filter: blur(10px);
    }

    .loading-main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        &.type_0 {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 30;
        }

        span {
            font-family: 'yekan';
            color: #fff;
            display: inline-flex;
            width: 100%;
            position: relative;
            left: 30px;
            top: 35px;
        }
    }

    .spinner {
        transform: scale(4);
        position: relative;
        bottom: 53px;
        right: 11px;
    }
}
</style>