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

export const ProfilePictureFormSchema = yup.object({
    image: yup
    .string()
    .required(customErrorMessage('تصویر پروفایل').required),
})

export const SiteBaseInformationFormSchema = yup.object({
    uni_name: yup
    .string()
    .required(customErrorMessage('نام  دانشگاه').required),

    uni_logo_path: yup
    .string()
    .required(customErrorMessage('لوگو دانشگاه').required),

    footer_description: yup
    .string()
    .required(customErrorMessage('توضیحات پا صفحه').required),

    location: yup
    .string()
    .required(customErrorMessage('موقعیت دانشگاه').required),

    telephone: yup
    .string()
    .required(customErrorMessage('شماره تماس').required),

    email: yup
    .string()
    .required(customErrorMessage('پست الکترونیکی').required),
    
    fax: yup
    .string()
    .required(customErrorMessage('شماره فکس').required),
    
    address: yup
    .string()
    .required(customErrorMessage('آدرس').required),

    description: yup
    .string()
    .required(customErrorMessage('توضیحات').required),

    register_rules: yup
    .string()
    .required(customErrorMessage('قوانین ثبت نام').required),

    status: yup
    .string()
    .required(customErrorMessage('آیا سایت فعال است؟').required),
})