<template>
    <div class="access-group" v-if="section == -1">
        <div class="access-group-item" @click="changeSection(0)">
            دسترسی نقش ها
        </div>
        <div class="access-group-item" @click="changeSection(1)">
            دسترسی کاربران
        </div>
    </div>
    <template v-if="section != -1">
        <component :is="pages[section][currentPage]" :props="props" @get-page-data="getPage"></component>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoleIndexView from './role/IndexView.vue'
import RoleCreateView from "./role/CreateView.vue";
import RoleEditView from "./role/EditView.vue";
import UserIndexView from './user/IndexView.vue'
import UserCreateView from "./user/CreateView.vue";
import UserEditView from "./user/EditView.vue";
export default defineComponent({
    name: 'template',
    methods: {
        getPage: function (data: any) {
            this.currentPage = data.page
            this.props = data
            this.section = data.section
        },
        changeSection(index: number) {
            this.section = index
        }
    },
    data() {
        return {
            section: -1,
            pages: [
                [
                    RoleIndexView,
                    RoleCreateView,
                    RoleEditView
                ],
                [
                    UserIndexView,
                    UserCreateView,
                    UserEditView
                ]
            ],
            props: null,
            currentPage: 0
        }
    }
})
</script>

<style lang="scss" scoped>
.access-group {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50px;

    .access-group-item {
        display: flex;
        width: calc(400px - 20px);
        height: calc(400px - 20px);
        border-radius: 4px;
        margin: 10px;
        background-color: #007aff;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        color: #fff;
        text-shadow: 1px 0px 5px rgba($color: #000000, $alpha: 0.5);
        user-select: none;
        cursor: pointer;
        box-shadow: 0px 1px 4px rgba($color: #000000, $alpha: 0.7);

    }
}
</style>