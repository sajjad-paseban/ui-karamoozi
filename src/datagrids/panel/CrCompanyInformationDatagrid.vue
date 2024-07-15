<template>
    <div class="panel-cra-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-cra-datagrid">

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
import { find_data } from '@/services/cra.service'

export default defineComponent({
    name: 'panel-cra-datagrid',
    components: {
        VueGoodTable,
        Button,
        AkPlus
    },
    props: ['id'],
    data() {
        return {
            columns: [
                {
                    label: 'کاربر درخواست دهنده',
                    field: 'user.fullname',
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
                }
            ],
            rows: [],
            options: {
                search: {
                    enabled: false,
                    placeholder: 'جست و جو کنید'
                },
                select: {
                    enabled: false,
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
        setTimeout(async () => {
            const res = await find_data(this.id)
            if (res.status == 200) {
                this.rows.push(res.data.row.company_registration_application_list as never)
                this.rows.map((item: any, index) => {
                    item.user.fullname = item.user.fname + ' ' + item.user.lname
                })
            }
        }, 1000)
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