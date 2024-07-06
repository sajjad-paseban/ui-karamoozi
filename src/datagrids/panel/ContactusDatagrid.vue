<template>
    <div class="panel-contactus-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-contactus-datagrid">

            <template #table-row="props">
                <div v-if="props.column.field == 'actions'">
                    <div class="d-flex justify-content-center">
                        <button :disabled="props.row.status == false"
                            class="btn btn-sm btn-danger mx-1 p-2 d-flex align-items-center"
                            @click="handleStatus(false, props.row.id)">
                            <i class="pi pi-times"></i>
                        </button>
                        <button :disabled="props.row.status == true"
                            class="btn btn-sm btn-success mx-1 p-2 d-flex align-items-center"
                            @click="handleStatus(true, props.row.id)">
                            <i class="pi pi-check"></i>
                        </button>
                    </div>
                </div>
                <div v-else-if="props.column.field == 'status'">
                    <span v-if="props.row.status == 1">فعال</span>
                    <span v-if="props.row.status == 0">غیر فعال</span>
                    <span v-if="props.row.status == null">نا مشخص</span>
                </div>
                <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                </div>
            </template>

            <template #selected-row-actions>
                <button class="btn btn-sm btn-secondary" @click="deleteAction">
                    حذف
                </button>
            </template>

            <template #emptystate>
                <p class="empty-state">
                    درحال حاضر دیتایی وجود ندارد
                </p>
            </template>

        </vue-good-table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next'
import { AkPlus } from "@kalimahapps/vue-icons";
import { delete_contactus, get_data, change_status } from '@/services/contactus.service'
import { AskPrompt, Toast } from '@/helpers/Base';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'panel-contactus-datagrid',
    components: {
        VueGoodTable,
        AkPlus
    },
    methods: {
        deleteAction() {

            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {
                    const ids = (this.$refs['panel-contactus-datagrid'] as any).selectedRows.map((i: any, index: number) => {
                        this.rows.map((item: any, idx: number) => {
                            if (item.id == i.id)
                                this.rows.splice(idx, 1)
                        })

                        return i.id
                    })

                    const result = await delete_contactus(ids)

                    Toast.fire({
                        text: result.data.message,
                        icon: result.status == 200 ? 'success' : 'error'
                    })
                }
            })

        },
        handleStatus(status: boolean, id: number) {
            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {
                    const res = await change_status({ status: status == false ? 0 : 1 }, id)

                    this.rows.map((item: any, index: number) => {
                        if (item.id == id) {
                            item.status = status == false ? 0 : 1
                        }
                    })

                    Toast.fire({
                        text: res.data.message,
                        icon: res.status == 200 ? 'success' : 'error'
                    })
                }
            })
        },
        tdClassFunc(row: any) {
            if (row.status == null) {
                return 'bg-secondary text-white';
            }

            if (row.status == 0) {
                return 'bg-danger text-white';
            }

            return 'bg-success text-white';
        },
    },
    data() {
        return {
            columns: [
                {
                    label: 'نام',
                    field: 'name',
                },
                {
                    label: 'موضوع',
                    field: 'subject',
                },
                {
                    label: 'پست الکترونیکی',
                    field: 'email',
                },
                {
                    label: 'توضیحات',
                    field: 'description',
                },
                {
                    label: 'وضعیت‌',
                    field: 'status',
                    tdClass: this.tdClassFunc,
                },
                {
                    label: 'عملیات',
                    field: 'actions',
                },

            ],
            rows: [],
            options: {
                search: {
                    enabled: true,
                    placeholder: 'جست و جو کنید'
                },
                select: {
                    enabled: true,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    // selectionInfoClass: 'custom-class',
                    selectionText: 'سطر انتخاب شده',
                    clearSelectionText: 'پاک کن',
                    disableSelectInfo: false, // disable the select info panel on top
                    // selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
                },
                sort: {
                    enabled: true
                },
                pagination: {
                    enabled: true,
                    mode: 'records',
                    perPage: 5,
                    position: 'bottom',
                    // perPageDropdown: [10, 20, 30],
                    dropdownAllowAll: false,
                    setCurrentPage: 1,
                    nextLabel: 'بعدی',
                    prevLabel: 'قبلی',
                    rowsPerPageLabel: 'تعداد سطر در هر صفحه',
                    ofLabel: 'از',
                    pageLabel: 'صفحه', // for 'pages' mode
                    allLabel: 'همه',
                    // infoFn: (params: any) => `my own page ${params.firstRecordOnPage}`,
                }
            }
        }
    },
    async mounted() {
        const res = await get_data()
        if (res.status == 200)
            this.rows = res.data.row.contact_us_list
    }
})
</script>

<style lang="scss" scoped>
.panel-contactus-datagrid {
    p.empty-state {
        text-align: center;
    }
}
</style>