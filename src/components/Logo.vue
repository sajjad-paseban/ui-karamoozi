<template>
    <span v-if="title">{{ title }}</span>
    <img :class="{light: isLight}" :src="path ? path : 'https://upload.wikimedia.org/wikipedia/commons/d/de/TVU_logo.svg'" alt="">
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'logo-component',
    props: ["isLight","title","path"]
})
</script>

<style lang="scss" scoped>
    img{
        padding: 10px;
        width: 40px;
        height: auto;
        &.light{
            filter: brightness(0) invert(1);
        }
    }
    span{
        font-family: 'yekan';
        font-size: 12px;
        color: #fff;
        opacity: 0.95;
        user-select: none;        
    }
</style>