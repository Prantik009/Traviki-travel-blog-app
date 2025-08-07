import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getAllPosts,
  getMyPosts
} from "../controllers/post.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-post", protectedRoute, createPost);
router.delete("/delete-post/:id", protectedRoute, deletePost); // ID-based deletion
router.put("/update-post/:id", protectedRoute, updatePost);
router.get("/getpost/:slug", protectedRoute, getPost);
router.get("/getposts", protectedRoute, getAllPosts);
router.get("/my-posts", protectedRoute, getMyPosts); // ✅ Only current user's posts

export default router;
