import useAuthStore from "@/store/auth-store"
import axios from "axios"
import Swal, { SweetAlertIcon } from "sweetalert2"
export function handleNumber(e: any){
    const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
    const normalNumbers = ["1","2","3","4","5","6","7","8","9","0","-"]
    if(!(normalNumbers.includes(e.key) || persianNumbers.includes(e.key)))
        e.preventDefault()

}

export const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
});

export const AskPrompt = (title: string, i: SweetAlertIcon = 'warning') =>{
    return Swal.fire({
        title: title,
        icon: i,
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله"
    })
}

export const useApi = axios.create(
    {
    baseURL: 'http://localhost/uni-karamoozi-back/controller/',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
})

export const get_back_base_url = () => "http://localhost/uni-karamoozi-back/"

export const connectTokenWithData = (data: any) => Object.assign(data, useAuthStore().auth)

export const customErrorMessage = (fieldName: string, props: any = null) => {
    return {
        required: `فیلد ${fieldName} اجباری می باشد`,
        email: `${fieldName} نا معتبر می باشد`,
        length: `فیلد ${fieldName} می بایست ${props?.length} رقمی باشد`
    }   
}