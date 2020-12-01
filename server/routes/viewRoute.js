import express from "express";
import { addView, getAllViews, deleteView } from "../controllers/viewController";

const viewRoutes = express.Router();

viewRoutes.post("/", addView);
viewRoutes.get("/", getAllViews);
viewRoutes.delete("/:viewId", deleteView);

export default viewRoutes;