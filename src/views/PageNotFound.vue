<template>
    <main>
        <div class="content">
            <p>
                404
            </p>
            <p>
                صفحه مورد نظر یافت نشد
            </p>
        </div>
        <Button 
            group="alpha"
            btn-class="btn btn-gray"
            is-link="true"
            path="/"
            title="برگشت به سایت"
        />
    </main>
</template>

<script lang="ts">
import Button from '@/components/Button.vue';
import { defineComponent } from 'vue'
export default defineComponent({
    components: { Button }
});
</script>

<style lang="scss" scoped>
    main{
        display: flex;
        flex-wrap: wrap;
        & > *{
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .content{
            flex-wrap: wrap;
            margin: 20px;
            p{
                text-align: center;
                width: 100%;
                margin: 5px 0;
                font-family: 'yekan';
                color: #263238;
                &:nth-child(1){
                    font-size: 50px;
                }
            }
        }
    }
</style>