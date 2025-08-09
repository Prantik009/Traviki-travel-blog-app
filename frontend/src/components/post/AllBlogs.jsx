import { BlogCard } from "./BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../store/slices/blogSlice";
import { useEffect } from "react";
import { ChevronDown, FunnelPlus } from "lucide-react";
import { Link } from "react-router-dom";
export const AllBlogs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { allposts, loading } = useSelector((state) => state.blog);
  // console.log("All posts: ", allposts);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  if (allposts.length < 1)
    return (
      <div className="pt-20 bg-gray-100 w-full flex flex-col items-center justify-center h-[100vh] ">
        <p className=" place-items-center text-4xl font-nerko">No Post Yet</p>
        <p>
          Please{" "}
          <span className="text-blue-600 underline">
            <Link to="/add-posts">add a post</Link>
          </span>
        </p>
      </div>
    );

  return (
    <div className="blogs py-4 place-items-center">
      <div className=" w-full max-w-4xl flex-col mt-10 px-2">
        <div className="blogs-cards w-full space-y-4">
          {allposts.map((post) => (
            <div key={post._id}>
              <BlogCard
                title={post.blogTitle}
                content={post.blogContent?.slice(0, 150)}
                authorName={post.authorId.fullName}
                authorProfile={post.authorId.profilePic}
                postDate={post.createdAt?.slice(0, 10)}
                blogLocation={post.blogLocation}
                blogImg={post.blogImage}
                slug={post.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
