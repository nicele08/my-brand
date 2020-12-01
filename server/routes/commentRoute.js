import express from "express";
import { addComment, deleteComment } from "../controllers/commentController";
const commentRoutes = express.Router();

commentRoutes.get("/", addComment);
commentRoutes.delete("/", deleteComment);

export default commentRoutes;