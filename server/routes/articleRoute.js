import express from "express";
import {addArticle, deleteArticle, getAllArticles, getArticle, updateArticle} from "../controllers/articleController";
import checkAuth from "../middleware/check-auth";
import upload from "../middleware/disk-storage";

const artilceRoutes = express.Router();

artilceRoutes.get("/", getAllArticles);
artilceRoutes.get("/:articleId", getArticle);
artilceRoutes.patch("/:articleId", checkAuth, upload.single("articleImage"), updateArticle);
artilceRoutes.post("/", checkAuth, upload.single("articleImage"), addArticle);
artilceRoutes.delete("/:articleId", checkAuth, deleteArticle);

export default artilceRoutes;