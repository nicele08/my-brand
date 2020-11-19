export default function displayArticles(docs){
    let queryList = document.querySelector("#table-queries");
    let totalElement = document.getElementById("total");
    let count = 0;
    let html = '';  
    if(docs.length){
              
        docs.forEach(doc => {
            const query = doc.data();
            const tr = `
                <tr article-id="${doc.id}">
                    <td><input class="chk-box" type="checkbox"></td>
                    <td><a class="article-link" href="./edit-query.html">${query.name}</a></td>
                    <td>${query.email}</td>
                    <td>${query.message}</td>
                    <td>${query.date}</td>
                </tr>
            `;
            html += tr;
            count++;
        });
        
    }else{

        const tr = `
                <tr>
                    <td></td>
                    <td>No records</td>
                </tr>
            `;
        html += tr;
    }
    queryList.innerHTML = html;
    totalElement.textContent = count;
}