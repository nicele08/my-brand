export default function tickAllCheckboxes(element, checkboxes){
    if(element.checked === true){
        for(let i=0; i<checkboxes.length; i++){
            checkboxes[i].checked = true;
        }
    }else{
        for(let i=0; i<checkboxes.length; i++){
            checkboxes[i].checked = false;
        }
    }
    
}

