<<<<<<< HEAD

import addToolbar from "./functions/addToolbar.js";
import {validateArticleAuthor, validateArticleContent, validateArticleImage, validateArticleName, validateArticleVisible } from "./functions/validateArticleForm.js";
const saveBtn = document.getElementById("save-button");
const deleteBtn = document.getElementById("delete-button");
const err = document.getElementsByClassName("error");
=======
import canvas1 from "./functions/canvas.js";
import displayAuthors from "./functions/displayAuthors.js";
import displayTopics from "./functions/displayTopics.js";
import {validateArticleAuthor, validateArticleContent, validateArticleImage, validateArticleName, validateArticleTopic, validateArticleVisible } from "./functions/validateArticleForm.js";
const saveBtn = document.getElementById("save-button");
const deleteBtn = document.getElementById("delete-button");
const err = document.getElementsByClassName("error");
const errorTopic = document.querySelector("#error-topic");
>>>>>>> ft-articles-firebase
const articleTitle = document.getElementById("article-title");
const articleVisible = document.getElementById("visible");
const articleImage = document.getElementById("image");
const articleContent = document.getElementById("content");
const articleAuthor = document.getElementById("author");
<<<<<<< HEAD
=======
const articleTopic = document.querySelector("#topic");
>>>>>>> ft-articles-firebase
const modal = document.getElementById("pop-modal");
const title = document.getElementById("title");
const firstMessage = document.getElementById("modal-message");
const secondMessage = document.getElementById("modal-message-two");
const closeModal = document.getElementById("modal-cancel");
<<<<<<< HEAD
const continueModal = document.getElementById("modal-continue");

title.textContent = articleTitle.value;

=======
const wait = document.querySelector("#wait-modal");
const continueModal = document.getElementById("modal-continue");
const formArticle = document.querySelector("#form-article-edit");


canvas1
const docId = localStorage.getItem("articleId");
title.textContent = articleTitle.value;

wait.style.display = "block";
auth.onAuthStateChanged(user => {
    if(user){        
        db.collection("authors").get().then().then(snapshot=>displayAuthors(snapshot.docs, articleAuthor));
        db.collection("topics").get().then().then(snapshot=>displayTopics(snapshot.docs, articleTopic));
        db.collection("articles").doc(docId).get().then(doc => {
            const article = doc.data();
            articleTitle.value = article.title;
            articleVisible.value = article.visible;
            articleAuthor.value = article.author;
            articleContent.value = article.content;
            const articleImage = document.querySelector("#article-image")
            articleImage.setAttribute("src", article.image);
            articleTopic.value = article.topic;
        }).then(()=>wait.style.display="none")
    }else{
        window.location.href = "../pages/login.html";
    }
});



>>>>>>> ft-articles-firebase
saveBtn.onclick = function(){
    const nameValid = validateArticleName(articleTitle, err);
    validateArticleVisible(articleVisible, err);
    const imageValid = validateArticleImage(articleImage, err);
    const contentValid = validateArticleContent(articleContent, err);
    const authorValid = validateArticleAuthor(articleAuthor, err);
<<<<<<< HEAD
=======
    const topicValid = validateArticleTopic(articleTopic, errorTopic);
>>>>>>> ft-articles-firebase
    
    
    if(nameValid == true &&
         imageValid == true &&
         contentValid == true &&
<<<<<<< HEAD
         authorValid == true){
             firstMessage.style.display = "none";
             continueModal.style.display = "none";
             secondMessage.textContent = "Article has been successful updated";
             closeModal.textContent = "Close";
             modal.style.display = "block";
=======
         authorValid == true &&
         topicValid == true){
             wait.style.display = "block";
            
             const file = articleImage.files[0];             
             const imageName = new Date() + '-' + file.name;
            const metadata = {
                contentType: articleImage.files[0].type
            }

            ref.child(imageName).put(file, metadata)
               .then(snapshot => snapshot.ref.getDownloadURL())
               .then(url => {

                const tArticle = formArticle["article-title"].value;
                const searchKey =  tArticle.toLowerCase();

                db.collection('articles').doc(docId).update({
                title: formArticle["article-title"].value,
                visible: formArticle["visible"].value,
                image: url,
                author: formArticle["author"].value,
                content: formArticle["content"].value,
                likes: 0,
                views: 0,
                topic: formArticle["topic"].value,
                dateCreated: new Date().toDateString(),
                searchKey: searchKey.split(" ")
            }).then(()=>{
                wait.style.display = "none"; 
                const successModal = document.querySelector("#success-modal");
                const closeModal = document.querySelector("#success-close");
                successModal.style.display = "block";  
                closeModal.addEventListener('click', () => {
                    successModal.style.display = "none";
                    window.location.href = "./edit-article.html";
                })          
            })

            }).catch(e=>{
                wait.style.display = "none";
                const errMessage = document.querySelector("#err-modal");
                const errClose = document.querySelector("#err-close");

                errMessage.style.display = "block";
                errClose.addEventListener("click", e=>{errMessage.style.display = "none"});
            })
>>>>>>> ft-articles-firebase
    }


    return false;
}

deleteBtn.onclick = function(){
    secondMessage.textContent = "Are you sure to delete?";
    closeModal.textContent = "Cancel";
    firstMessage.style.display = "block";
    continueModal.style.display = "block";
    modal.style.display = "block";
<<<<<<< HEAD
    return false;
}

addToolbar(articleContent);
=======

    const modalContinue = document.querySelector("#modal-continue");
    modalContinue.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();

        wait.style.display = "block";
        db.collection("articles").doc(docId)
          .delete()
          .then(() => {
              wait.style.display = "none";
              window.location.replace("./articles.html");
          });
    })
    return false;
}
>>>>>>> ft-articles-firebase
