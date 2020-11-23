import updateArticleIDs from "./updateArticleIDs.js";

function display(docs, begin=0){
    let divContainer = document.querySelector("#blog-article-container");
    let html = ''; 
    let count = 0;      
    for(let i = begin; i < docs.length; i++){
        const article = docs[i].data();
        const articleContent = article.content;
        const content = articleContent.slice(0, 150);
        const div = `
            <div class="blog-article">
                <div class="blog-image"><a article-id="${docs[i].id}" href="./blog-article.html"><img src="${article.image}" alt="Image"></a></div>
                <div class="blog-content">
                    <h2><a article-id="${docs[i].id}" href="./blog-article.html">${article.title}</a></h2>
                    <p>${content}...</p>
                    <p>${article.dateCreated} | <a article-id="${docs[i].id}" href="./blog-article.html">Read more+</a></p>
                </div>
            </div>
        `;
        html += div;
        count++;
        if(count == 5){
            break;
        }
    }

    
    divContainer.innerHTML += html;
    return begin + count;
}

export default function getArticles(docs){   
    
    let begin = display(docs);
    

    const moreBtn = document.querySelector("#more-articles");
    moreBtn.addEventListener("click", e => {
        e.preventDefault();        
        begin = display(docs, begin);

        updateArticleIDs();
        if(begin == docs.length || begin == 0){
            moreBtn.style.display = "none";
        }
    })
    
    updateArticleIDs();
}