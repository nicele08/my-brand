export default function displayTopics(docs, topicsList){
    if(docs.length){
        let html = '<option selected value="">------select topic------</option>';
        docs.forEach(doc => {
            const topic = doc.data();
            const option = `
                <option value="${topic.title}">${topic.title}</option>
            `;
            html += option;
        })
        topicsList.innerHTML = html;
    }
}