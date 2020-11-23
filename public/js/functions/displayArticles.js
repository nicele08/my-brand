export default function displayArticles(docs){
    let articleList = document.querySelector("#table-articles");
    let totalElement = document.getElementById("total");
    let count = 0;
    let html = '';  
    if(docs.length){
              
        docs.forEach(doc => {
            const article = doc.data();
            const tr = `
                <tr article-id="${doc.id}">
                    <td><input class="chk-box" type="checkbox"></td>
                    <td><a class="article-link" href="./edit-article.html">${article.title}</a></td>
                    <td>${article.likes}</td>
                    <td>${article.views}</td>
                    <td>${article.author}</td>
                    <td>${article.visible}</td>
                    <td>${article.dateCreated}</td>
                </tr>
            `;
            html += tr;
            count++;
        });
        
    }else{

        const tr = `
                <tr>
                    <td></td>
                    <td>No results</td>
                </tr>
            `;
        html += tr;
    }
    articleList.innerHTML = html;
    totalElement.textContent = count;
}

