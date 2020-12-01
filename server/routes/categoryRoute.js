import express from "express";
import {addCategory, getAllCategories, getCategory} from "../controllers/categoryController";
import checkAuth from "../middleware/check-auth";

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:categoryId", getCategory);
categoryRoutes.post("/", checkAuth, addCategory);

export default categoryRoutes;