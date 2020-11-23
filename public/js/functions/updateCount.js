export default function updateCount(checkboxes){
    let count = 0;
    for(let i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked === true){

            checkboxes[i].classList.add("article-selected");

            count++;
        }
    }
    return count;
}