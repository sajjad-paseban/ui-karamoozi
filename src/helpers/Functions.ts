 export const menu_switch = (name: string) => {
    switch(name.toUpperCase()){
        case "HOME":
            return 0;
            break;
        case "COMPANY": 
            return 1;
            break;
        case "NEWS":    
            return 2;
            break;
        case "CONTACTUS": 
            return 3;
            break;
        default: 
            return -1;
    }
 }