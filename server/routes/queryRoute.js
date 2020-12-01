import express from "express";
import {addQuery, getQuery, getAllQueries, updateQuery, deleteQuery} from "../controllers/queryController";
import checkAuth from "../middleware/check-auth";

const queryRoutes = express.Router();

queryRoutes.get("/", checkAuth, getAllQueries);
queryRoutes.get("/:queryId", checkAuth, getQuery);
queryRoutes.patch("/:queryId", checkAuth, updateQuery);
queryRoutes.post("/", addQuery);
queryRoutes.delete("/:queryId", checkAuth, deleteQuery);

export default queryRoutes;