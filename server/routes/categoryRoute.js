import express from "express";
import {addCategory, getAllCategories, getCategory} from "../controllers/categoryController";

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:categoryId", getCategory);
categoryRoutes.post("/", addCategory);

export default categoryRoutes;