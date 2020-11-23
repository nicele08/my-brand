export default function checkUsername(element){
    const email = element.value;
    const atPosition = email.indexOf('@');
    const dotPosition = email.lastIndexOf(".");
    
    if(email == "" || atPosition < 1 || dotPosition < atPosition + 2 || dotPosition+2 >= email.length){
        return false;
    }else{
        return true;
    }
}