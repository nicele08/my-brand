import express from "express";
import {addProfile, deleteProfile, getAllProfiles, getProfile, updateProfile} from "../controllers/profileController";
import checkAuth from "../middleware/check-auth";
import upload from "../middleware/disk-storage";

const profileRoutes = express.Router();

profileRoutes.post("/", checkAuth, upload.single("profileImage"), addProfile);
profileRoutes.get("/:profileId", checkAuth, getProfile);
profileRoutes.get("/", checkAuth, getAllProfiles);
profileRoutes.patch("/:profileId", checkAuth, upload.single("profileImage"), updateProfile);
profileRoutes.delete("/:profileId", checkAuth, deleteProfile);

export default profileRoutes;