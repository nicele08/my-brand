import { addShadow, removeShadow } from "./shadows.js";

export function validatePassword(element, err){
    const regex = /\d/g;
    if(element.value.length < 8 || !regex.test(element.value)){
        err.textContent = "Password should be atleast 8 characters with numbers"
        addShadow(element, "2px 2px 2px red");
        return false;
    }else{
        err.textContent = "";
        removeShadow(element);
        return true;
    }
}

export function passwordMatch(element1, element2, err){
    if(element1.value !== element2.value){
        err.textContent = "Password not match"
        addShadow(element2, "2px 2px 2px red");
        return false;
    }else{
        err.textContent = "";
        removeShadow(element2);
        return true;
    }
}