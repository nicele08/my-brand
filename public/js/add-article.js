import canvas1 from "./functions/canvas.js";
import displayAuthors from "./functions/displayAuthors.js";
import displayTopics from "./functions/displayTopics.js";
import {validateArticleAuthor, validateArticleContent, validateArticleImage, validateArticleName, validateArticleTopic, validateArticleVisible } from "./functions/validateArticleForm.js";
let canvas = canvas1;

const saveBtn = document.getElementById("save-button");
const err = document.getElementsByClassName("error");
const errorTopic = document.querySelector("#error-topic");
const articleTitle = document.getElementById("article-title");
const articleVisible = document.getElementById("visible");
const articleImage = document.getElementById("image");
const articleContent = document.getElementById("content");
const articleAuthor = document.getElementById("author");
const modal = document.getElementById("pop-modal");
const title = document.getElementById("title");
const formArticle = document.querySelector("#form-article");
const wait = document.querySelector("#wait-modal");
const articleTopic = document.querySelector("#topic");

wait.style.display = "block";
auth.onAuthStateChanged(user => {
    if(user){
        db.collection("topics").get().then(snapshot=>displayTopics(snapshot.docs, articleTopic));
        db.collection('authors').get().then(snapshot => {
        displayAuthors(snapshot.docs, articleAuthor);
       }).then(() => wait.style.display = "none");
    }else{
        window.location.href = "../pages/login.html";
    }
});

formArticle.addEventListener('submit', e=>{
    e.preventDefault();
    title.textContent = articleTitle.value;
    const nameValid = validateArticleName(articleTitle, err);
    validateArticleVisible(articleVisible, err);
    const imageValid = validateArticleImage(articleImage, err);
    const contentValid = validateArticleContent(articleContent, err);
    const authorValid = validateArticleAuthor(articleAuthor, err);
    const topicValid = validateArticleTopic(articleTopic, errorTopic);
    
    if(nameValid == true &&
         imageValid == true &&
         contentValid == true &&
         authorValid == true &&
         topicValid == true
         ){
             
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

                db.collection('articles').add({
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
                modal.style.display = "block";
                formArticle["article-title"].value = '';
                formArticle["visible"].checked = false;
                formArticle["image"].value = '';
                formArticle["author"].value = '';
                formArticle["content"].value = '';                
            })

            }).catch(e=>{
                wait.style.display = "none";
                const errMessage = document.querySelector("#err-modal");
                const errClose = document.querySelector("#err-close");

                errMessage.style.display = "block";
                errClose.addEventListener("click", e=>{errMessage.style.display = "none"});
            })
            
    }
});
