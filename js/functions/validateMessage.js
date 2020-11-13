import {addShadow, removeShadow} from "./shadows.js";

export default function validateMessage(element, err){
    if(element.value === ""){
        element.placeholder = "Your message is required...";
        addShadow(element, "2px 2px 2px red");
        return false;
    }else if(element.value.trim().length === 0){
        err.textContent = "Your message should have something";
        addShadow(element, "2px 2px 2px red");
        return false;
    }else{
        err.textContent = "";
        removeShadow(element);
        return true;
    }
}