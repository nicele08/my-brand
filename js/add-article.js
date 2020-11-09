const saveBtn = document.getElementById("save-button");
const err = document.getElementsByClassName("error");
const articleTitle = document.getElementById("article-title");
const articleVisible = document.getElementById("visible");
const articleImage = document.getElementById("image");
const articleContent = document.getElementById("content");

saveBtn.onclick = function(){
    alert(articleImage.files[0].name);
    alert("onclik");
    return false;
}
