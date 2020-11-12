
import addToolbar from "./functions/addToolbar.js";
import {validateArticleAuthor, validateArticleContent, validateArticleImage, validateArticleName, validateArticleVisible } from "./functions/validateArticleForm.js";
const saveBtn = document.getElementById("save-button");
const err = document.getElementsByClassName("error");
const articleTitle = document.getElementById("article-title");
const articleVisible = document.getElementById("visible");
const articleImage = document.getElementById("image");
const articleContent = document.getElementById("content");
const articleAuthor = document.getElementById("author");
const modal = document.getElementById("pop-modal");
const title = document.getElementById("title");

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
             title.textContent = articleTitle.value;
             modal.style.display = "block";
    }
    return false;
}

addToolbar(articleContent);
