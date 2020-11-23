export default function updateArticleIDs(){
    let links = document.querySelectorAll("[article-id]");
    links.forEach(a => a.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        localStorage.setItem("articleId", a.getAttribute('article-id'));
        window.location.href = "./blog-article.html";
    }))
}