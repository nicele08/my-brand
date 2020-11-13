import { addShadow, removeShadow } from "./shadows.js";

export function validateArticleName(articleName, err){
    let isValid = false;
    if(articleName.value == null || articleName.value.length < 1){
        err[0].textContent = "*Title should have something.";
        err[0].style.display = "block";
        addShadow(articleName, "2px 2px 2px red");
    }else{
        removeShadow(articleName);
        err[0].style.display = "none";
        isValid = true;
    }

    return isValid;
}

export function validateArticleVisible(articleVisible, err){
    if(articleVisible.checked === false){
        err[1].textContent = "Article will not visible to the public";
        err[1].style.display = "block";
        addShadow(articleVisible, "2px 2px 2px red");
    }else{
        removeShadow(articleVisible);
        err[1].style.display = "none";
    }
}

export function validateArticleImage(articleImage, err){
    let isValid = false;
    const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
    
    if(articleImage.files.length === 0){
        err[2].textContent = "*Image is required";
        err[2].style.display = "block";
        addShadow(articleImage, "2px 2px 2px red");
    }else{
        err[2].style.display = "none";
        const img = articleImage.files[0].name;
        const imgExtension = img.substring(img.lastIndexOf(".")+1);
        if(allowedExtensions.includes(imgExtension.toLowerCase()) != true){
            err[2].textContent = "*Image should be in .png, .jpg, .jpeg and .gif formats";
            err[2].style.display = "block";
            addShadow(articleImage, "2px 2px 2px red");
        }else{
            err[2].style.display = "none";
            removeShadow(articleImage);            
            isValid = true;
        }
    }

    return isValid;
}

export function validateArticleContent(articleContent, err){
    let isValid = false;
    if(articleContent.value == null || articleContent.value.length < 200){
        err[4].textContent = "*Article should have at least 50 words.";
        err[4].style.display = "block";
        addShadow(articleContent, "2px 2px 2px red");
    }else{
        err[4].style.display = "none";
        removeShadow(articleContent);
        isValid = true;
    }
    return isValid;
}

export function validateArticleAuthor(articleAuthor, err){
    let isValid = false;
    if(articleAuthor.value === ""){
        err[3].textContent = "*User should be selected.";
        err[3].style.display = "block";
        addShadow(articleAuthor, "2px 2px 2px red");
    }else{
        err[3].style.display = "none";
        removeShadow(articleAuthor);
        isValid = true;
    }
    return isValid;
}