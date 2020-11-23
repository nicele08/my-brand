export default function displayAuthors(docs, authorsList){
    if(docs.length){
        let html = '<option selected value="">------select user------</option>';
        docs.forEach(doc => {
            const author = doc.data();
            const option = `
                <option value="${author.fname}">${author.fname}</option>
            `;
            html += option;
        })
        authorsList.innerHTML = html;
    }
}