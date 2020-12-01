import express from "express";
import {addProfile, deleteProfile, getAllProfiles, getProfile, updateProfile} from "../controllers/profileController";
import upload from "../middleware/disk-storage";

const profileRoutes = express.Router();

profileRoutes.post("/", upload.single("profileImage"), addProfile);
profileRoutes.get("/:profileId", getProfile);
profileRoutes.get("/", getAllProfiles);
profileRoutes.patch("/:profileId", upload.single("profileImage"), updateProfile);
profileRoutes.delete("/:profileId", deleteProfile);

export default profileRoutes;