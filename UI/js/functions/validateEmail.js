import {addShadow, removeShadow} from "./shadows.js";

export default function validateEmail(element, err){
    const atPosition = element.value.indexOf('@');
    const dotPosition = element.value.lastIndexOf(".");

    if(element.value === ""){
        element.placeholder = "Your email is required...";
        addShadow(element, "2px 2px 2px red");
        return false;
    }else if(atPosition < 1 || dotPosition < atPosition + 2 || dotPosition+2 >= element.value.length){
        err.textContent = "Enter a valid e-mail address in format like john@example.com";
        addShadow(element, "2px 2px 2px red");;
        return false;
    }else{
        err.textContent = "";
        removeShadow(element);
        return true;
    }

}