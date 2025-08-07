import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPostBySlug,
  clearCurrentPost,
  deletePost,
} from "../store/slices/blogSlice";
import { toast } from "react-hot-toast";
import {
  EllipsisVertical,
  Eye,
  HeartHandshakeIcon,
  PenBox,
  Trash2,
} from "lucide-react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";

export const ReadBlogPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentPost, loading, error } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth); // Assuming auth slice has `user`

  useEffect(() => {
    dispatch(getPostBySlug(slug));

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, slug]);

  let numberSet = 6;

  const [showLove, setShowLove] = useState(false);
  const [number, setNumber] = useState(numberSet);
  function handleLikes() {
    setShowLove(!showLove);
    showLove ? setNumber(number - 1) : setNumber(number + 1);
  }

  if (loading) {
    return <p className="text-center text-blue-500 mt-10">Loading post...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  if (!currentPost) {
    return <p className="text-center text-gray-500 mt-10">Post not found.</p>;
  }

  const { _id, blogTitle, blogContent, blogImage, authorId, createdAt, blogLocation } =
    currentPost;
  const isAuthor = user?._id === authorId?._id;

  const handleEdit = () => {
    navigate("/add-posts", { state: { post: currentPost } });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(_id)).unwrap();
      toast.success("Post deleted");
      navigate("/");
    } catch (err) {
      toast.error(err || "Failed to delete");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-20">
      <div className="w-full bg-gray-200 rounded-xs p-4 flex flex-col gap-2 text-black ">
        <div className="author-info px-2 flex justify-between items-center">
          <div className="left flex items-center md:items-end text-sm font-thin">
            <span className="profile-img">
              <img
                src={authorId?.profilePic || "/profile.png"}
                alt={authorId.fullName}
                className="size-10 rounded-full object-cover"
              />
            </span>
            <p className="flex items-end gap-1 pl-2 mb-0.5 font-normal ">
              <span className="flex md:gap-1 flex-col md:flex-row">
                <span className="profile-name capitalize">
                  {authorId?.fullName}
                </span>
                <span className="hidden md:block">.</span>
                <span className="blog-release-date -mt-0.5 sm:mt-0">
                  {new Date(createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </span>
              <span className="space-x-1">
                <span className="font-bold">.</span>
                <span>1 min read</span>
              </span>
            </p>
          </div>
          <div className="right">
            <EllipsisVertical className="size-5" />
          </div>
        </div>
        <div className="blog-title px-4">
          <h1 className="text-2xl/6 md:text-4xl/tight font-semibold text-black first-letter:uppercase">
            {blogTitle}
          </h1>
        </div>
        <div className=" mt-3 blog-image px-2 flex justify-center  items-center w-full mx-auto place-items-center bg-none">
          {blogImage && (
            <img
              src={blogImage}
              alt={blogTitle}
              className="w-[284px] h-[189px]  md:w-[740px] md:h-[493px] max-h-[500px] object-cover"
            />
          )}
        </div>
        <div className="blog-content px-2 bg-none mt-3">
          <p>{blogContent}</p>
        </div>
        <div className="blog-loved px-2 bg-none flex justify-between mt-3">
          <div className="location">
          <div className=" flex items-center gap-0.5 text-sm">
            <IoLocationSharp className="size-4.5" />
            <span className=" font-semibold">{blogLocation}</span>
          </div>
        </div>
          {isAuthor ? (
            <div className="flex gap-4 justify-end">
              <button
                className="flex text-sm items-center gap-0.5 cursor-pointer rounded-sm px-2 py-1 text-gray-50 bg-amber-400"
                onClick={handleEdit}
              >
                <PenBox className="size-4 " />
                <span className="hidden md:block">Edit Post</span>
              </button>

              <button
                className="flex text-sm items-center gap-0.5 cursor-pointer rounded-sm p-2 text-gray-50 bg-red-500"
                onClick={handleDelete}
              >
                <Trash2 className=" size-4" />
                <span className="hidden md:block">Delete Post</span>
              </button>
            </div>
          ) : (
            <div className="likes flex items-center gap-0.5">
              <span>{number}</span>
              <span onClick={() => handleLikes()} className=" cursor-pointer ">
                {showLove ? (
                  <IoMdHeart className={`size-4 text-pink-500`} />
                ) : (
                  <IoMdHeartEmpty className={`size-4 text-pink-500`} />
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
