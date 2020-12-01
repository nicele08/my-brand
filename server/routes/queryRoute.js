import express from "express";
import {addQuery, getQuery, getAllQueries, updateQuery, deleteQuery} from "../controllers/queryController";

const queryRoutes = express.Router();

queryRoutes.get("/", getAllQueries);
queryRoutes.get("/:queryId", getQuery);
queryRoutes.patch("/:queryId", updateQuery);
queryRoutes.post("/", addQuery);
queryRoutes.delete("/:queryId", deleteQuery);

export default queryRoutes;