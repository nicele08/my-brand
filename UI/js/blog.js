import getArticles from "./functions/getArticles.js";
import canvas1 from "./functions/canvas.js";
import updateArticleIDs from "./functions/updateArticleIDs.js";
const subscribeBtn = document.querySelector("#subscribe");

canvas1

const searchForm = document.querySelector("#search-form");
const wait = document.querySelector("#wait-modal");
let articleContainer = document.querySelector("#blog-article-container");

db.collection('articles').orderBy('title').onSnapshot(snapshot => {
    getArticles(snapshot.docs);
})


searchForm.addEventListener('submit', e=>{
    e.preventDefault(); 
    articleContainer.innerHTML = '';   
    const query = searchForm['query'].value;
    const qLowerCase = query.toLowerCase();
    if(qLowerCase.length < 1){
        db.collection('articles').onSnapshot(snapshot => {        
            getArticles(snapshot.docs);
        })
        return false;
    }
    wait.style.display = "block";
    db.collection("articles").where('searchKey', 'array-contains-any', qLowerCase.split(" ")).get().then(snapshot => {
        getArticles(snapshot.docs);
    }).then(() => wait.style.display = "none");
})

const newArticlesContainer = document.querySelector("#new-articles");

db.collection('articles').orderBy('dateCreated').limit(3).get().then(snapshot => {
    const docs = snapshot.docs;
    let html = `<h3>Lates Articles</h3><hr/>`
    docs.forEach(doc => {
        const article = doc.data();
        const p = `
            <p><a article-id = ${doc.id} href="./blog-article.html">${article.title}</a></p>
        `
        html += p;
    });
    newArticlesContainer.innerHTML = html;
    updateArticleIDs();
})

const popularArticlesContainer = document.querySelector("#popular-articles");

db.collection('articles').where('topic', '==', 'Programming').limit(3).get().then(snapshot => {
    const docs = snapshot.docs;
    let html = `<h3>Popular Articles</h3><hr/>`
    docs.forEach(doc => {
        const article = doc.data();
        const p = `
            <p><a article-id = ${doc.id} href="./blog-article.html">${article.title}</a></p>
        `
        html += p;
    });
    popularArticlesContainer.innerHTML = html;
    updateArticleIDs();
})

const topicElement = document.querySelector("#topic");
db.collection('topics').onSnapshot(snapshot => {
    const docs = snapshot.docs;
    let html = '<option value="">Topic</option>';
    docs.forEach(doc => {
        const topic = doc.data();        
        const option = `            
            <option value="${topic.title}">${topic.title}</option>
        `
        html += option;
    })
    topicElement.innerHTML = html;
})

topicElement.onchange = function(){
    db.collection("articles").where('topic', '==', topicElement.value).onSnapshot(snapshot => {
        articleContainer.innerHTML = '';
        getArticles(snapshot.docs);
    })
}

const formSubscribe = document.querySelector("#form-subscribe");
subscribeBtn.addEventListener('click', () => {
    window.location.href = "#form-subscribe";
    formSubscribe['form-email'].focus();
});

