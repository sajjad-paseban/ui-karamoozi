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