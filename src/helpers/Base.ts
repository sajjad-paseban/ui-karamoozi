export function handleNumber(e: any){
    let persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
    let normalNumbers = ["1","2","3","4","5","6","7","8","9","0","-"]
    if(!(normalNumbers.includes(e.key) || persianNumbers.includes(e.key)))
        e.preventDefault()

}