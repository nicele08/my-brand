
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
const formArticle = document.querySelector("#form-article");

formArticle.addEventListener('submit', e=>{
    e.preventDefault();
    const nameValid = validateArticleName(articleTitle, err);
    validateArticleVisible(articleVisible, err);
    const imageValid = validateArticleImage(articleImage, err);
    const contentValid = validateArticleContent(articleContent, err);
    const authorValid = validateArticleAuthor(articleAuthor, err);
    
    if(nameValid == true &&
         imageValid == true &&
         contentValid == true &&
         authorValid == true){
             db.collection('articles').add({
                title: formArticle["article-title"].value,
                visible: formArticle["visible"].value,
                image: formArticle["image"].files[0].name,
                author: formArticle["author"].value,
                content: formArticle["content"].value
            }).then(()=>{
                modal.style.display = "block";                
            }).catch(e=>{
                title.parentElement.innerHTML = e.message;
                modal.style.display = "block";
            })
            title.textContent = articleTitle.value;
            formArticle["article-title"].value = '';
            formArticle["visible"].checked = false;
            formArticle["image"].value = '';
            formArticle["author"].value = '';
            formArticle["content"].value = '';
    }
});
