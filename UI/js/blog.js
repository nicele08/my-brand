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
const userData = localStorage.getItem('user');
const user = JSON.parse(userData);
console.log(user)
    const loginBtn= document.querySelector("#login");
    if(user){
        subscribeBtn.style.display = "none";
        const userAccount = document.querySelector("#user-account");
        userAccount.style.display = "flex"; 
        loginBtn.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            window.location.href = "./logout.html";
        })

        const userProfile = document.querySelector("#link-user");
        const profileArrow = document.querySelector("#profile-arrow");
        userProfile.addEventListener('click', e=> {
            e.preventDefault();
            const modal = document.querySelector("#user-account-modal");
            modal.style.display = "block";
            profileArrow.style.display = "block";




            window.addEventListener('click', e => {
                if(e.target == modal){
                    modal.style.display = 'none';
                    profileArrow.style.display = "none";
                }
            })
        })

        const userNotification = document.querySelector("#notifications");
        const notificationArrow = document.querySelector("#notification-arrow");
        userNotification.addEventListener("click", e => {
            e.preventDefault();
            const modal = document.querySelector("#notification-modal");
            modal.style.display = "block";
            notificationArrow.style.display = "block";

            window.addEventListener('click', e => {
                if(e.target == modal){
                    modal.style.display = "none";
                    notificationArrow.style.display = "none";
                }
            })
        })
    }else{
        loginBtn.style.display = "block";
    }

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

