<template>
    <div class="register-view d-flex justify-content-center align-items-center">
        <div class="cover"></div>
        <div class="register-panel mx-4">
            <register-form />   
        </div>
    </div>
</template>

<script lang="ts">
import RegisterForm from '@/forms/RegisterForm.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'register-view',
    components: { RegisterForm },
})
</script>

<style lang="scss" scoped>
    .register-view{
        background-image: url('https://uok.ac.ir/documents/48716/979700/sarDar.jpg/68ebf9ab-d0bb-d044-9b67-6f15e5351161?t=1660742257852');
        background-size: cover;
        background-position: center center;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        .cover{
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba($color: #000000, $alpha: 0.5);
        }
        .register-panel{
            background-color: rgba($color: #000000, $alpha: 0.8);
            position: relative;
            z-index: 1;
            padding: 10px 20px;
            border-radius: 4px;
        }
    }
</style>