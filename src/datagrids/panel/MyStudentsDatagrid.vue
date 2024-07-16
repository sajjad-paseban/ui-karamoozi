<template>
    <div class="panel-stu-request-management-datagrid">
        <vue-good-table :columns="columns" :rows="rows" :search-options="options.search" :select-options="options.select"
            :sort-options="options.sort" :pagination-options="options.pagination" line-numbers="true" compactMode
            ref="panel-stu-request-management-datagrid">

            <template #table-row="props">
                <div v-if="props.column.field == 'actions'">

                </div>
                <div v-else-if="props.column.field == 'status'">
                    <span v-if="props.row.status == 1">فعال</span>
                    <span v-if="props.row.status == 0">غیر فعال</span>
                    <span v-if="props.row.status == null">نامشخص</span>
                </div>
                <div v-else-if="props.column.field == 'manager_confirm'">
                    <span v-if="props.row.manager_confirm == 1">تایید شده توسط مدیر گروه</span>
                    <span v-if="props.row.manager_confirm == 0">رد شده توسط مدیر گروه</span>
                    <span v-if="props.row.manager_confirm == null">درحال بررسی</span>
                </div>
                <div v-else-if="props.column.field == 'teacher_confirm'">
                    <span v-if="props.row.teacher_confirm == 1">تایید شده توسط استاد</span>
                    <span v-if="props.row.teacher_confirm == 0">رد شده توسط استاد</span>
                    <span v-if="props.row.teacher_confirm == null">درحال بررسی</span>
                </div>
                <div v-else>
                    {{ props.formattedRow[props.column.field] }}
                </div>
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
import { get_my_students } from '@/services/stu_request.service'
import useRoleStore from '@/store/role-store';
import moment from 'jalali-moment';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'panel-stu-request-management-datagrid',
    components: {
        VueGoodTable,
    },
    setup() {
        const roleStore = useRoleStore()
        const router = useRouter()

        return {
            roleStore,
            router
        }
    },
    methods: {
        tdClassFunc(row: any) {
            if (row.status == null)
                return 'bg-secondary text-white';


            if (row.status == 0)
                return 'bg-danger text-white';

            return 'bg-success text-white';
        },
        tdManagerClassFunc(row: any) {
            if (row.manager_confirm == null)
                return 'bg-primary text-white';


            if (row.manager_confirm == 0)
                return 'bg-danger text-white';

            return 'bg-success text-white';
        },
        tdTeacherClassFunc(row: any) {
            if (row.teacher_confirm == null)
                return 'bg-primary text-white';


            if (row.teacher_confirm == 0)
                return 'bg-danger text-white';

            return 'bg-success text-white';
        },
    },
    data() {
        return {
            dialogs: {
                intern_info: {
                    display: false,
                    data: null
                },
                intern_place_info: {
                    display: false,
                    data: null
                },
                present_info: {
                    display: false,
                    data: null
                },
                reject: {
                    display: false,
                    data: null
                },
            },
            columns: [
                {
                    label: 'کد درخواست دانشجو',
                    field: 'code',
                },
                {
                    label: 'کد درخواست جذب کارآموز',
                    field: 'ira.code',
                },
                {
                    label: 'نام دانشجو',
                    field: 'user.fullname',
                },
                {
                    label: 'کد ملی دانشجو',
                    field: 'user.nationalcode',
                },
                {
                    label: 'گروه',
                    field: 'group.name',
                },
                {
                    label: 'نیمسال تحصیلی',
                    field: 'semester.name',
                },
                {
                    label: 'تایید استاد',
                    field: 'teacher_confirm',
                    tdClass: this.tdTeacherClassFunc,
                },
                {
                    label: 'تایید مدیر گروه',
                    field: 'manager_confirm',
                    tdClass: this.tdManagerClassFunc,

                },
                {
                    label: 'توضیحات استاد',
                    field: 'teacher_description',
                },
                {
                    label: 'توضیحات مدیر گروه',
                    field: 'manager_description',
                },
                {
                    label: 'وضعیت',
                    field: 'status',
                    tdClass: this.tdClassFunc,
                }

            ],
            rows: [],
            options: {
                search: {
                    enabled: true,
                    placeholder: 'جست و جو کنید'
                },
                select: {
                    enabled: false,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    // selectionInfoClass: 'custom-class',
                    selectionText: 'سطر انتخاب شده',
                    clearSelectionText: 'پاک کن',
                    disableSelectInfo: false, // disable the select info panel on top
                    // selectAllByGroup: true, // when used in combination with a iraed table, add a checkbox in the header row to check/uncheck the entire ira
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
        const res = await get_my_students()
        if (res.status == 200 && res.data.row.students) {
            this.rows = res.data.row.students
            console.log(res)
        }
    }
})
</script>

<style lang="scss" scoped>
.panel-stu-request-management-datagrid {
    p.empty-state {
        text-align: center;
    }
}
</style>