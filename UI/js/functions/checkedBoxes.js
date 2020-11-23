export default function checkedBoxes(checkboxes){
    let count = 0;
    for(let i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked === true){
            count++;
        }
    }
    return count;
}