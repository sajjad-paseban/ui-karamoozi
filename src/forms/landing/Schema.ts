import * as yup from 'yup'

export const ContactUsFormSchema = yup.object({
    name: yup
    .string()
    .required('فیلد نام و نام خانوادگی اجباری می باشد'),

    title: yup
    .string()
    .required('فیلد موضوع اجباری می باشد'),
    
    email: yup
    .string()
    .required('فیلد پست الکترونیکی اجباری می باشد')
    .email('پست الکترونیکی معتبر نمی باشد'),

    description: yup
    .string()
    .required('فیلد توضیحات اجباری می باشد'),
}) 