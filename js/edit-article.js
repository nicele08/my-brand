
import addToolbar from "./functions/addToolbar.js";
import {validateArticleAuthor, validateArticleContent, validateArticleImage, validateArticleName, validateArticleVisible } from "./functions/validateArticleForm.js";
const saveBtn = document.getElementById("save-button");
const deleteBtn = document.getElementById("delete-button");
const err = document.getElementsByClassName("error");
const articleTitle = document.getElementById("article-title");
const articleVisible = document.getElementById("visible");
const articleImage = document.getElementById("image");
const articleContent = document.getElementById("content");
const articleAuthor = document.getElementById("author");
const modal = document.getElementById("pop-modal");
const title = document.getElementById("title");
const firstMessage = document.getElementById("modal-message");
const secondMessage = document.getElementById("modal-message-two");
const closeModal = document.getElementById("modal-cancel");
const continueModal = document.getElementById("modal-continue");

title.textContent = articleTitle.value;

saveBtn.onclick = function(){
    const nameValid = validateArticleName(articleTitle, err);
    validateArticleVisible(articleVisible, err);
    const imageValid = validateArticleImage(articleImage, err);
    const contentValid = validateArticleContent(articleContent, err);
    const authorValid = validateArticleAuthor(articleAuthor, err);
    
    
    if(nameValid == true &&
         imageValid == true &&
         contentValid == true &&
         authorValid == true){
             firstMessage.style.display = "none";
             continueModal.style.display = "none";
             secondMessage.textContent = "Article has been successful updated";
             closeModal.textContent = "Close";
             modal.style.display = "block";
    }


    return false;
}

deleteBtn.onclick = function(){
    secondMessage.textContent = "Are you sure to delete?";
    closeModal.textContent = "Cancel";
    firstMessage.style.display = "block";
    continueModal.style.display = "block";
    modal.style.display = "block";
    return false;
}

addToolbar(articleContent);
