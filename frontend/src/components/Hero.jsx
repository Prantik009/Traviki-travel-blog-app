// Hero.jsx
import { useNavigate } from "react-router-dom";

export const Hero = ({ onReadBlogsClick }) => {
  const navigate = useNavigate();

  const handleWriteBlogClick = () => {
    navigate("/add-posts");
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="hero h-[60vh] md:h-[80vh] xl:h-[100vh] w-full max-w-7xl flex items-center justify-center flex-col bg-[url('/bgImg.webp')] bg-cover bg-center bg-black/20 bg-blend-overlay z-10">
      <h2 className="text-3xl md:text-7xl text-white font-bold font-serif capitalize max-w-4xl text-center pt-15 px-6">
        Explore india through real stories
      </h2>
      <p className="text-lg/6 md:text-3xl w-[90%] md:w-[40%] text-center pt-4 md:pt-10 text-white/80">
        Real blogs. Real experience. Connect & travel smarter.
      </p>
      <div className="pt-10 flex gap-3">
        <button
          onClick={onReadBlogsClick}
          className="bg-blue-800 hover:bg-blue-900 transition-all delay-75 cursor-pointer text-gray-200 px-2.5 py-2.5 rounded-sm font-medium"
        >
          Read Blogs
        </button>
        <button
          onClick={handleWriteBlogClick}
          className="bg-black/40 hover:bg-black/60 transition-all delay-75 cursor-pointer text-gray-200 px-2.5 py-2.5 rounded-sm font-medium"
        >
          Write a blog
        </button>
      </div>
    </div>
  );
};
