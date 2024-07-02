<template>
    <div class="panel-cra-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-cra-datagrid">

            <template #table-row="props">
                <div v-if="props.column.field == 'actions'">
                    <div class="d-flex justify-content-center">
                        <router-link :to="{ name: 'edit-cra-management', params: { id: props.row.id } }"
                            class="btn btn-warning btn-sm mx-1 d-flex align-items-center">
                            <i class="pi pi-file-edit"></i>
                        </router-link>
                    </div>
                </div>
                <div v-else-if="props.column.field == 'status'">
                    {{ props.row.status == 1 ? 'فعال' : 'غیر فعال' }}
                </div>
                <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                </div>
            </template>

            <template #selected-row-actions>
                <Button title="حذف" cra="alpha" btn-class="btn btn-gray" class="mb-1" @click="deleteAction" />
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
import Button from '@/components/Button.vue'
import { AkPlus } from "@kalimahapps/vue-icons";
import { delete_cra, get_data } from '@/services/cra.service'
import { AskPrompt, Toast } from '@/helpers/Base';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'panel-cra-datagrid',
    components: {
        VueGoodTable,
        Button,
        AkPlus
    },
    methods: {
        deleteAction() {

            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {
                    const ids = (this.$refs['panel-cra-datagrid'] as any).selectedRows.map((i: any, index: number) => {
                        this.rows.map((item: any, idx: number) => {
                            if (item.id == i.id)
                                this.rows.splice(idx, 1)
                        })

                        return i.id
                    })

                    const result = await delete_cra(ids)

                    Toast.fire({
                        text: result.data.message,
                        icon: result.status == 200 ? 'success' : 'error'
                    })
                }
            })

        },
        tdClassFunc(row: any) {
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
                    label: 'کاربر درخواست دهنده',
                    field: 'company_name',
                },
                {
                    label: 'نام شرکت',
                    field: 'company_name',
                },
                {
                    label: 'نام مدیر عامل شرکت',
                    field: 'company_manager_name',
                },
                {
                    label: 'نام سرپرست شرکت',
                    field: 'company_supervisor_name',
                },
                {
                    label: 'شماره سرپرست شرکت',
                    field: 'company_supervisor_phone',
                },
                {
                    label: 'تلفن شرکت',
                    field: 'company_telephone',
                },
                {
                    label: 'آدرس شرکت',
                    field: 'company_address',
                },
                {
                    label: 'توضیحات',
                    field: 'description',
                },
                {
                    label: 'وضعیت',
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
                    // selectAllByGroup: true, // when used in combination with a craed table, add a checkbox in the header row to check/uncheck the entire cra
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
            this.rows = res.data.row.uni_cra_list
    }
})
</script>

<style lang="scss" scoped>
.panel-cra-datagrid {
    p.empty-state {
        text-align: center;
    }
}
</style>