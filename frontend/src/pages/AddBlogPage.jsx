import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../store/slices/blogSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, CloudUpload, SendHorizontal } from "lucide-react";
import { RTE } from "../components/post/RTE";
import toast from "react-hot-toast";

// Add this function at the top if you need plain text
function htmlToPlainText(html) {
  if (!html) return "";
  html = html.replace(/<br\s*\/?>/gi, "\n");
  html = html.replace(/<\/p>/gi, "\n");
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
}
export const AddBlogPage = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogLocation, setBlogLocation] = useState("");
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation(); // for edit mode
  const { loading } = useSelector((s) => s.blog);

  useEffect(() => {
    if (state?.post) {
      const { _id, blogTitle, blogContent, blogImage, blogLocation } =
        state.post;
      setEditId(_id);
      setBlogTitle(blogTitle);
      setBlogContent(blogContent);
      setBlogImage(blogImage);
      setBlogLocation(blogLocation || "");
    }
  }, [state]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBlogImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  // In your AddBlogPage component, update the handlePublish function:
  const handlePublish = async () => {
    // Convert to plain text only when submitting
    const plainTextContent = htmlToPlainText(blogContent);

    if (!blogTitle || !plainTextContent.trim()) {
      return toast.error("Title and content are required.");
    }

    try {
      const payload = {
        blogTitle,
        blogContent: plainTextContent, // Use plain text version
        blogImage,
        blogLocation,
      };

      if (editId) {
        await dispatch(
          updatePost({ id: editId, updatedData: payload })
        ).unwrap();
        toast.success("Post updated!");
      } else {
        await dispatch(createPost(payload)).unwrap();
        toast.success("Post created!");
      }

      navigate("/");
    } catch (err) {
      toast.error(err || "Operation failed.");
    }
  };

  return (
    <div className="max-w-7xl w-full py-20 px-8 space-y-4">
      <div className="w-full pt-4 flex flex-col md:flex-row px-2 gap-4 justify-center ">
        <div className="title-input w-full relative">
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            id="blog-title-input"
            className="peer w-full border-0 border-b-2 border-gray-300 focus:border-amber-400 outline-none placeholder-transparent transition-all pt-6"
            placeholder="Blog Title"
          />
          <label
            htmlFor="blog-title-input"
            className={`absolute left-0 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-amber-500`}
          >
            Title
          </label>
        </div>
      </div>
      <div className=" w-full rte-photo flex flex-wrap items-start justify-between">
        <div className="rte w-full sm:w-[78%]">
          <RTE value={blogContent} onChange={setBlogContent} />
        </div>
        <div className="photo w-full sm:w-[20%] relative duration-100 transition-all ease mt-3">
          <label
            htmlFor="blogImg"
            className="absolute p-1.5 px-4 cursor-pointer rounded-sm bg-sky-500 border flex gap-2 items-center text-white"
          >
            <CloudUpload className="size-4.5" />
            <span className="hidden sm:block text-sm font-bold">Upload</span>
            <input
              id="blogImg"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {blogImage && (
            <div className="mt-10 w-full place-items-center">
              <img
                src={blogImage}
                alt="Preview"
                className="max-h-60 rounded shadow"
              />
            </div>
          )}
        </div>
      </div>
      <div className=" location w-full sm:w-[25%] flex gap-2 mt-10 sm:mt-0 items-center">
        <label htmlFor="location" className="text-lg font-semibold">
          Location:{" "}
        </label>
        <input
          type="text"
          value={blogLocation}
          onChange={(e) => setBlogLocation(e.target.value)}
          className="w-full py-1  border-2 border-b-2 focus:border-amber-400 outline-none transition-all rounded-sm px-2"
          placeholder="Kolkata"
        />
      </div>
      <div className="w-full">
        <div className="px-2 flex items-center justify-center">
          <button
            onClick={handlePublish}
            disabled={loading}
            className="py-2 flex justify-center items-center gap-2 bg-green-700 px-2 sm:px-8 rounded-sm text-white"
          >
            <SendHorizontal className="size-5 sm:mt-0.5" />
            <span className="sm:block capitalize font-bold">
              {loading
                ? editId
                  ? "Updating..."
                  : "Publishing..."
                : editId
                ? "Update"
                : "Publish"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
