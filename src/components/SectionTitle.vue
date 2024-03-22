<template>
    <div class="section-title-component">
        <div class="title">
            <span>
                {{ title }}
            </span>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'section-title-component',
    props: ['title'],
});
</script>

<style lang="scss">
    .section-title-component{
        width: calc(100% - 20px);
        border-bottom: 3.5px solid #263238;
        display: flex;
        justify-content: right;
        margin: 10px;

        .title{
            background-color: #263238;
            padding: 6px 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            margin-right: 8px;
            span{
                font-family: 'yekan';
                color: #fff;
                position: relative;
                bottom: 3px;
                font-size: 13px;
            }
            svg{
                position: relative;
                top: 4px;
                left: 3px;
                font-size: 20px;
                filter: invert(1);
            }
        }
    }
</style>