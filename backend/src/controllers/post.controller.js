import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import Post from "../models/post.model.js";
import cloudinary from '../lib/cloudinary.config.js';


// ✅ CREATE POST
export const createPost = async (req, res) => {
  try {
    const { blogTitle, blogContent, blogImage, blogLocation } = req.body;

    if (!blogTitle || !blogContent) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    let imageUrl = "";
    if (blogImage) {
      const uploadResponse = await cloudinary.uploader.upload(blogImage, {
        folder: "blogImages",
        public_id: `blog-${uuidv4()}`,
      });
      imageUrl = uploadResponse.secure_url;
    }

    const blogId = uuidv4();
    const slugBase = slugify(blogTitle, { lower: true, strict: true });
    const slug = `${slugBase}-${blogId.slice(0, 6)}`;

    const newPost = new Post({
      authorId: req.user._id,
      blogId,
      blogTitle,
      blogContent,
      blogImage: imageUrl,
      blogLocation,
      slug,
    });

    const savedPost = await newPost.save();
    const populatedPost = await Post.findById(savedPost._id)
      .populate("authorId", "fullName email profilePic");

    res.status(201).json({ message: "Post created", post: populatedPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ DELETE POST
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Post.findOneAndDelete({ _id: id, authorId: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }

    res.status(200).json({ message: "Post deleted", post: deleted });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { blogTitle, blogContent, blogImage } = req.body;

    const existingPost = await Post.findOne({ _id: id, authorId: req.user._id });
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }

    if (blogTitle) {
      existingPost.blogTitle = blogTitle;
      const slugBase = slugify(blogTitle, { lower: true, strict: true });
      existingPost.slug = `${slugBase}-${existingPost.blogId.slice(0, 6)}`;
    }

    if (blogContent) existingPost.blogContent = blogContent;
    if (blogImage !== undefined) existingPost.blogImage = blogImage;

    const updatedPost = await existingPost.save();

    const populatedPost = await Post.findById(updatedPost._id)
      .populate("authorId", "fullName email profilePic");

    res.status(200).json({ message: "Post updated", post: populatedPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET ONE POST BY SLUG
export const getPost = async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug })
      .populate("authorId", "fullName email profilePic");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "fullName email profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET MY POSTS (Only logged-in user's posts)
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.user._id })
      .populate("authorId", "fullName email profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
