<template>
    <div class="panel-user-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-user-datagrid">

            <template #table-row="props">
                <div v-if="props.column.field == 'actions'">
                    <div class="d-flex justify-content-center">
                        <button @click="editRow(props.row.id)"
                            class="btn btn-warning btn-sm mx-1 d-flex align-items-center">
                            <i class="pi pi-file-edit"></i>
                        </button>
                        <button @click="reset_password(props.row.id)"
                            class="btn btn-primary btn-sm mx-1 d-flex align-items-center">
                            <i class="pi pi-unlock"></i>
                        </button>
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
                <Button title="حذف" group="alpha" btn-class="btn btn-gray" class="mb-1" @click="deleteAction" />
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
import { delete_user, get_data, reset_password } from '@/services/user.service'
import { AskPrompt, Toast } from '@/helpers/Base';
import moment from 'jalali-moment';

export default defineComponent({
    name: 'panel-user-datagrid',
    components: {
        VueGoodTable,
        Button,
        AkPlus
    },
    methods: {
        deleteAction() {

            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {
                    const ids = (this.$refs['panel-user-datagrid'] as any).selectedRows.map((i: any, index: number) => {
                        this.rows.map((item: any, idx: number) => {
                            if (item.id == i.id)
                                this.rows.splice(idx, 1)
                        })

                        return i.id
                    })

                    const result = await delete_user(ids)

                    Toast.fire({
                        text: result.data.message,
                        icon: result.status == 200 ? 'success' : 'error'
                    })
                }
            })

        },
        reset_password(user_id: number) {
            AskPrompt('آیا از انجام اینکار مطمئن هستید؟', 'warning').then(async result => {
                if (result.isConfirmed) {
                    const res = await reset_password(user_id)
                    Toast.fire({ text: res.data.message, icon: res.data.code == 200 ? 'success' : 'error' })
                }
            })
        },
        editRow: function (id: number) {
            this.$emit('get-page-data', { page: 2, id: id })
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
                    label: 'نام',
                    field: 'fname',
                },
                {
                    label: 'نام خانوادگی',
                    field: 'lname',
                },
                {
                    label: 'تاریخ تولد',
                    field: 'birthdate_fa',
                },
                {
                    label: 'کد ملی',
                    field: 'nationalcode',
                },
                {
                    label: 'شماره همراه',
                    field: 'phone',
                },
                {
                    label: 'پست الکترونیکی',
                    field: 'email',
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
        if (res.status == 200) {
            this.rows = res.data.row.user_list
            this.rows.map((item: any, index) => {
                item.birthdate_fa = item.birthdate ? moment(item.birthdate).locale('fa').format('YYYY/M/D') : null
                item.nationalcode = '0' + item.nationalcode
            })
        }
    }
})
</script>

<style lang="scss" scoped>
.panel-user-datagrid {
    p.empty-state {
        text-align: center;
    }
}
</style>