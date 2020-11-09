export default function checkPassword(element){
    const regex = /\d/g;
    if(element.value.length < 8 || !regex.test(element.value)){
        return false;
    }else{
        return true;
    }
}