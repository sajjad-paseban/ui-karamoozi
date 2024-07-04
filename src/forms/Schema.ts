import { customErrorMessage } from '@/helpers/Base'
import  * as yup from 'yup'

export const LoginFormSchema = yup.object({
    national_code: yup
    .string()
    .required('فیلد کد ملی اجباری می باشد'),
    
    password: yup
    .string()
    .required('فیلد گذرواژه اجباری می باشد')
})

export const RegisterFormSchema = yup.object({
    national_code: yup
    .string()
    .length(10, 'کد ملی 10 رقمی می باشد')
    .required('فیلد کد ملی اجباری می باشد'),
    
    phone: yup
    .string()
    .length(11, 'شماره همراه 11 رقمی می باشد')
    .required('فیلد شماره همراه اجباری می باشد'),
    
    email: yup
    .string()
    .required('فیلد پست الکترونیکی اجباری می باشد')
    .email("پست الکترونیکی معتبر نمی باشد"),
    
    password: yup
    .string()
    .min(8, 'گذرواژه می بایست حداکثر 8 رقمی باشد')
    .required('فیلد گذرواژه اجباری می باشد')
})

export const PasswordChangeFormSchema = yup.object({
    password: yup
    .string()
    .min(8, 'کلمه عبور می بایست حداکثر 8 رقمی باشد')
    .required('فیلد کلمه عبور اجباری می باشد'),

    re_password: yup
    .string()
    .oneOf([yup.ref('password')], 'کلمه عبور با تکرار کلمه عبور یکی نمی باشد')
    .required('فیلد تکرار کلمه عبور اجباری می باشد'),
})

export const UserInformationFormSchema = yup.object({
    fname: yup
    .string()
    .required(customErrorMessage('نام').required),

    lname: yup
    .string()
    .required(customErrorMessage('نام خانوادگی').required),

    birthdate: yup
    .string()
    .required(customErrorMessage('تاریخ تولد').required),
    
    nationalcode: yup
    .string()
    .length(10, customErrorMessage('کد ملی', { length: 10 }).length)
    .required(customErrorMessage('کد ملی').required),

    phone: yup
    .string()
    .length(11, customErrorMessage('شماره همراه', { length: 11 }).length)
    .required(customErrorMessage('شماره همراه').required),

    email: yup
    .string()
    .required(customErrorMessage('پست الکترونیکی').required)
    .email(customErrorMessage('پست الکترونیکی').email),

})

export const DefaultRoleFormSchema = yup.object({
    role_id: yup
    .string()
    .required(customErrorMessage('نقش').required),

})

export const ProfilePictureFormSchema = yup.object({
    image: yup
    .string()
    .required(customErrorMessage('تصویر پروفایل').required),
})

export const SiteBaseInformationFormSchema = yup.object({
    uni_name: yup
    .string()
    .required(customErrorMessage('نام  دانشگاه').required),

    uni_logo: yup
    .string()
    .required(customErrorMessage('لوگو دانشگاه').required),

    footer_description: yup
    .string()
    .required(customErrorMessage('توضیحات پا صفحه').required),

    lat: yup
    .number()
    .typeError("لطفا عدد وارد نمایید")
    .required(customErrorMessage('موقعیت دانشگاه').required),
    
    long: yup
    .number()
    .typeError("لطفا عدد وارد نمایید")
    .required(customErrorMessage('موقعیت دانشگاه').required),

    telephone: yup
    .string()
    .length(11, customErrorMessage('شماره تماس', { length: 11 }).length)
    .required(customErrorMessage('شماره تماس').required),

    email: yup
    .string()
    .email(customErrorMessage('پست الکترونیکی دانشگاه').email)
    .required(customErrorMessage('پست الکترونیکی دانشگاه').required),
    
    fax: yup
    .string()
    .length(11, customErrorMessage('شماره فکس', { length: 11 }).length)
    .required(customErrorMessage('شماره فکس').required),
    
    address: yup
    .string()
    .required(customErrorMessage('آدرس دانشگاه').required),

    description: yup
    .string()
    .required(customErrorMessage('توضیحات').required),

    register_rules: yup
    .string()
    .required(customErrorMessage('قوانین ثبت نام').required),

})

export const MenuFormSchema = yup.object({
    title: yup
    .string()
    .required(customErrorMessage('عنوان').required),

    path: yup
    .string()
    .required(customErrorMessage('مسیر').required),

    key_param: yup
    .string()
    .required(customErrorMessage('کلید').required),

    logo: yup
    .string()
    .required(customErrorMessage('لوگو').required),
    
    parent_id: yup
    .string()
    .required(customErrorMessage('والد').required),

    priority: yup
    .string()
    .required(customErrorMessage('الویت').required),

})

export const RoleFormSchema = yup.object({
    title: yup
    .string()
    .required(customErrorMessage('عنوان').required),
})

export const DegreeFormSchema = yup.object({
    title: yup
    .string()
    .required(customErrorMessage('عنوان').required),
})

export const ProvinceFormSchema = yup.object({
    title: yup
    .string()
    .required(customErrorMessage('عنوان').required),
})

export const CityFormSchema = yup.object({
    title: yup
    .string()
    .required(customErrorMessage('عنوان').required),

    province_id: yup
    .number()
    .required(customErrorMessage('استان').required),
})

export const ColorFormSchema = yup.object({
    title: yup
    .string()
    .required(customErrorMessage('عنوان').required),

    color: yup
    .string()
    .required(customErrorMessage('کد رنگی').required),
})

export const UserFormSchema = yup.object({
    nationalcode: yup
    .string()
    .length(10, customErrorMessage('کد ملی', { length: 10 }).length)
    .required(customErrorMessage('کد ملی').required),
    
    phone: yup
    .string()
    .length(11, customErrorMessage('شماره همراه', { length: 11 }).length)
    .required(customErrorMessage('شماره همراه').required),

    email: yup
    .string()
    .required(customErrorMessage('پست اکترونیکی').required)
    .email(customErrorMessage('پست اکترونیکی').email),

    password: yup
    .string()
    .min(8, 'کلمه عبور می بایست حداکثر 8 رقمی باشد')
    .required('فیلد کلمه عبور اجباری می باشد'),

})

export const UsersRolesFormSchema = yup.object({ 
    user_id: yup
    .number()
    .typeError("لطفا یک گزینه را انتخاب نمایید")
    .required(customErrorMessage('کاربر').required),

    role_id: yup
    .number()
    .typeError("لطفا یک گزینه را انتخاب نمایید")
    .required(customErrorMessage('نقش').required)

})

export const AccessRolesFormSchema = yup.object({ 
    role_id: yup
    .number()
    .typeError("لطفا یک گزینه را انتخاب نمایید")
    .required(customErrorMessage('نقش').required),

    menu_id: yup
    .number()
    .typeError("لطفا یک گزینه را انتخاب نمایید")
    .required(customErrorMessage('منو').required)

})

export const AccessUsersFormSchema = yup.object({ 
    user_id: yup
    .number()
    .typeError("لطفا یک گزینه را انتخاب نمایید")
    .required(customErrorMessage('کاربر').required),

    menu_id: yup
    .number()
    .typeError("لطفا یک گزینه را انتخاب نمایید")
    .required(customErrorMessage('منو').required)

})

export const GroupFormSchema = yup.object({ 
    code: yup
    .number()
    .typeError("لطفا عدد وارد نمایید")
    .required(customErrorMessage('کد گروه').required),

    name: yup
    .string()
    .required(customErrorMessage('عنوان گروه').required)

})

// company registration application
export const CraFormSchema = yup.object({ 
    company_name: yup
    .string()
    .required(customErrorMessage('نام شرکت').required),

    company_manager_name: yup
    .string()
    .required(customErrorMessage('نام مدیر عامل شرکت').required),

    company_supervisor_name: yup
    .string()
    .required(customErrorMessage('نام سرپرست شرکت').required),

    company_supervisor_phone: yup
    .string()
    .length(11, customErrorMessage('شماره سرپرست شرکت', { length: 11 }).length)
    .required(customErrorMessage('شماره سرپرست شرکت').required),

    company_telephone: yup
    .string()
    .length(11, customErrorMessage('شماره شرکت', { length: 11 }).length)
    .required(customErrorMessage('شماره شرکت').required),

    company_address: yup
    .string()
    .required(customErrorMessage('آدرس شرکت').required),

    description: yup
    .string()
    .required(customErrorMessage('توضیحات').required),

})

export const IraFormSchema = yup.object({ 
    group_id: yup
    .string()
    .required(customErrorMessage('گروه').required),

    capacity: yup
    .string()
    .required(customErrorMessage('ظرفیت').required),

    description: yup
    .string()
    .required(customErrorMessage('توضیحات').required),

})

export const SemesterFormSchema = yup.object({ 
    code: yup
    .string()
    .required(customErrorMessage('کد نیمسال تحصیلی').required),

    name: yup
    .string()
    .required(customErrorMessage('نام نیمسال تحصیلی').required),

})

export const SiteFormSchema = yup.object({ 
    name: yup
    .string()
    .required(customErrorMessage('نام سایت').required),

    link: yup
    .string()
    .required(customErrorMessage('لینک سایت').required),

})