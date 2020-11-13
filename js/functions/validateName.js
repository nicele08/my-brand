import {addShadow, removeShadow} from "./shadows.js";

export default function validateName(element, err){
    const regExp = /[a-zA-Z]/g;

    if(element.value == null || element.value === ""){
        element.placeholder = "Your name is required...";
        addShadow(element, "2px 2px 2px red");
        return false;
    }else if(element.value.trim().length === 0 || !regExp.test(element.value)){
        err.textContent = "Enter the valid name please";
        addShadow(element, "2px 2px 2px red");
        return false;
    }else{
        err.textContent = "";
        removeShadow(element);
        return true;
    }
}


