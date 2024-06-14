<template>
    <div class="row justify-content-between flex-row-reverse py-3 align-items-center">
        <div class="col-auto">
            <h3 class="text-secondary">
                نمایش دسترسی کاربر ها
            </h3>
        </div>
        <div class="col-auto">
            <button type="button" @click="page({ page: 1, section: 1 })" class="btn btn-primary btn-sm shadow-sm">
                دسترسی کاربر جدید
            </button>

            <button type="button" @click="page({ page: 0, section: -1 })" class="btn btn-secondary btn-sm shadow-sm mx-1">
                برگشت
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <access-users-datagrid @get-page-data="page" />
        </div>
    </div>
</template>

<script lang="ts">
import AccessUsersDatagrid from "@/datagrids/panel/AccessUsersDatagrid.vue";
import { defineComponent } from "vue";
export default defineComponent({
    name: 'index-view',
    components: {
        AccessUsersDatagrid
    },
    methods: {
        page: function (val: any) {
            this.$emit('get-page-data', val)
        }
    }
})
</script>