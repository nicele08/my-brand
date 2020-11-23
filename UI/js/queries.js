import canvas1 from "./functions/canvas.js";
import tickAllCheckboxes from "./functions/check-boxes.js";
import checkedBoxes from "./functions/checkedBoxes.js";
import updateCount from "./functions/updateCount.js";
import displayQueries from "./functions/displayQueries.js";

canvas1

let deleteElement = document.getElementById("go");
let checkUncheckAll = document.getElementById("check-all");
let modal = document.getElementById("pop-modal");
let number = document.getElementById("message-number");
let select = document.getElementById("select-action");
let checkboxes = document.getElementsByClassName("chk-box");
let countElement = document.getElementById("count");
let formDelete = document.querySelector("#form-delete");
let searchForm = document.querySelector("#form-article-search");
let wait = document.querySelector("#wait-modal");

let selected = select.value;
let count = checkedBoxes(checkboxes);

countElement.textContent = updateCount(checkboxes);

wait.style.display = "block";
auth.onAuthStateChanged(user => {  
    if(user){        
        db.collection('queries').get().then(snapshot => {        
        displayQueries(snapshot.docs);
       }).then(() => {
           wait.style.display = "none"
           const articleLinks = document.querySelectorAll(".article-link");
           articleLinks.forEach(articleLink => articleLink.addEventListener('click', e=>{
               e.stopPropagation();
               e.preventDefault();
               const td = articleLink.parentNode;
               const tr = td.parentNode;
               localStorage.setItem("articleId", tr.getAttribute('article-id'));
               window.location.href = "./edit-query.html";
           }))
        })
    }else{
        window.location.href = "../pages/blog.html";
    }
})

searchForm.addEventListener('submit', e=>{
    e.preventDefault();    
    const query = searchForm['query'].value;
    const qLowerCase = query.toLowerCase();
    if(qLowerCase.length < 1){
        db.collection('queries').onSnapshot(snapshot => {        
            displayQueries(snapshot.docs);
        })
        return false;
    }
    wait.style.display = "block";
    db.collection("queries").where('searchKey', 'array-contains-any', qLowerCase.split(" ")).get().then(snapshot => {
        displayQueries(snapshot.docs);
    }).then(() => {
        wait.style.display = "none";
        const articleLinks = document.querySelectorAll(".article-link");
        articleLinks.forEach(articleLink => articleLink.addEventListener('click', e=>{
            e.stopPropagation();
            e.preventDefault();
            const td = articleLink.parentNode;
            const tr = td.parentNode;
            localStorage.setItem("articleId", tr.getAttribute('article-id'));
            window.location.href = "./edit-query.html";
        }))
    }) 
})

select.onchange = function(){
    selected = select.value;
}

window.onclick = function(event){
     if(event.target.tagName == "INPUT"){
         count = updateCount(checkboxes);
         countElement.textContent =  count;
         if(count !== checkboxes.length){
            checkUncheckAll.checked = false;
         }else{
             checkUncheckAll.checked = true;
         }        
    }
}

checkUncheckAll.onclick = function(){
    tickAllCheckboxes(checkUncheckAll, checkboxes);
}
formDelete.addEventListener('submit', e=>{
    e.preventDefault();
    if(count > 0 && selected === "delete"){
        number.textContent = `${count}`;
        modal.style.display = "block";

        const continueModal = document.querySelector("#modal-continue");

        continueModal.addEventListener('click', e => {
            e.preventDefault();
            const checkedElements = document.querySelectorAll(".article-selected");
            checkedElements.forEach(element => {
                const td = element.parentNode;
                const tr = td.parentNode;
                const docId = tr.getAttribute("article-id");
                modal.style.display = 'none';
                wait.style.display = "block";
                db.collection("queries").doc(docId)
                .delete()
                .then(() => {
                    wait.style.display = "none";
                    window.location.replace("./queries.html");
                });
            })
        })
    }
})



const articleLinks = document.querySelectorAll(".article-link");
articleLinks.forEach(element => {
    alert(element.textContent)
});



