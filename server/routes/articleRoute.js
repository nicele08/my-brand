import express from "express";
import {addArticle, deleteArticle, getAllArticles, getArticle, updateArticle} from "../controllers/articleController";
import upload from "../middleware/disk-storage";

const artilceRoutes = express.Router();

artilceRoutes.get("/", getAllArticles);
artilceRoutes.get("/:articleId", getArticle);
artilceRoutes.patch("/:articleId", upload.single("articleImage"), updateArticle);
artilceRoutes.post("/", upload.single("articleImage"), addArticle);
artilceRoutes.delete("/:articleId", deleteArticle);

export default artilceRoutes;