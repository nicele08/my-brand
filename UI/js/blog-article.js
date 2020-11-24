import updateArticleIDs from "./functions/updateArticleIDs.js";


const articleElement = document.querySelector("#article-content-container");

const userData = localStorage.getItem('user');
const user = JSON.parse(userData);

const articleID = localStorage.getItem('articleId');
db.collection("articles").doc(articleID).get().then(snapshot => {
    const article = snapshot.data();
    article.likes = article.likes ? article.likes : 0;
    article.comments = article.comments ? article.comments : 0;
    const html = `
        <div class="blog-image"><img src="${article.image}" alt="Image"></div>
        <div class="article-features">
            <a href="./blog.html"><img src="../assets/icons/back.png" alt="">&nbsp;Back</a>
            <a title="Likes" href="#"><img src="../assets/icons/thumb-up.png" alt="">&nbsp;${article.likes}</a>
            <a title="Comments" href="#comment-side"><img src="../assets/icons/comment.png" alt="">&nbsp;${article.comments}</a>
            <a title="Share" href="#"><img src="../assets/icons/share.png" alt=""></a>
        </div>
        <div class="article-text">
            <h2>${article.title}</h2>                        
            <section>${article.content}</section>
        </div>
    `;
    articleElement.innerHTML = html;
})

const newArticlesContainer = document.querySelector("#new-articles");

db.collection('articles').orderBy('dateCreated').limit(3).get().then(snapshot => {
    const docs = snapshot.docs;
    let html = `<h3>Lates Articles</h3>`;
    docs.forEach(doc => {
        const article = doc.data();
        const p = `
            <p><a article-id = ${doc.id} href="./blog-article.html">${article.title}</a></p>
        `;
        html += p;
    });
    newArticlesContainer.innerHTML = html;
    updateArticleIDs();
})

const popularArticlesContainer = document.querySelector("#popular-articles");

db.collection('articles').where('topic', '==', 'Programming').limit(3).get().then(snapshot => {
    const docs = snapshot.docs;
    let html = `<h3>Popular Articles</h3>`
    docs.forEach(doc => {
        const article = doc.data();
        const p = `
            <p><a article-id = ${doc.id} href="./blog-article.html">${article.title}</a></p>
        `;
        html += p;
    });
    popularArticlesContainer.innerHTML = html;
    updateArticleIDs();
})

const recommendArticlesContainer = document.querySelector("#recommended-articles");

db.collection('articles').where('topic', '==', 'Programming').limit(3).get().then(snapshot => {
    const docs = snapshot.docs;
    let html = `<h3>Popular Articles</h3>`;
    docs.forEach(doc => {
        const article = doc.data();
        const p = `
            <p><a article-id = ${doc.id} href="./blog-article.html">${article.title}</a></p>
        `;
        html += p;
    });
    recommendArticlesContainer.innerHTML = html;
    updateArticleIDs();
})

const btnComment = document.querySelector("#btn-comment");
btnComment.addEventListener('click', e=>{
    e.preventDefault();
    
    const formComment = document.querySelector('#form-comment');
    if(user){
        
        formComment.style.display = "flex";
        btnComment.style.display = "none";

        formComment.addEventListener('submit', e => {
            e.preventDefault();
            const commentForm = document.querySelector("#message");
            console.log(commentForm.textContent);
            db.collection('comments').add({

            })
        })
    }else{
        formComment.style.display = "none";
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            formComment.style.display = "flex";
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        });


    }

})