import { addShadow, removeShadow } from "./shadows.js"

let isValid = false;

export function validateArticleName(articleName, err){
    if(articleName.value.length < 1){
        err.textContent = "Title should have something.";
        addShadow(articleName, "2px 2px 2px red");
    }else{
        removeShadow(articleName);
        isValid = true;
    }
}

export function validateArticleVisible(articleVisible, err){
    if(articleVisible.checked === false){
        err.textContent = "Article will not visible to the public";
        addShadow(articleVisible, "2px 2px 2px red");
    }else{
        removeShadow(articleName);
        isValid = true;
    }
}

export function validateArticleImage(articleImage, err){
    const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
    const img = articleImage.files[0].name;
    const imgExtension = img.substring(img.lastIndexOf("."));

    if(allowedExtensions.includes(imgExtension.toLowerCase()) != true){
        err.textContent = "Image should be in .png, .jpg, .jpeg and .gif formats";
        addShadow(articleVisible, "2px 2px 2px red");
    }else{
        removeShadow(articleName);
        isValid = true;
    }
}

export default isValid