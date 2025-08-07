import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  blogId: { type: String, required: true, unique: true },
  blogTitle: { type: String, required: true },
  blogContent: { type: String, required: true },
  blogImage: { type: String },
  blogLocation: {type:String, required: true},
  slug: { type: String, required: true, unique: true },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
