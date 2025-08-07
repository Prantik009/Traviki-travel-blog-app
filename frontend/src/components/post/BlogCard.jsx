import { IoLocationSharp } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({title, content, blogImg, authorName, authorProfile, postDate,blogLocation,slug }) => {

  const location = blogLocation;
  let numberSet = 6
  const navigate = useNavigate()

  const [showLove, setShowLove] = useState(false)
  const [number, setNumber] = useState(numberSet)
  function handleLikes(){
    setShowLove(!showLove)
    showLove ? setNumber(number-1) : setNumber(number+1)
  }
  return (
    <div className="w-full border-gray-100 space-y-5 border bg-[#fff]">
      <div className="img">
        <img
          src={blogImg ? blogImg : "./bgImg.webp" }
          alt="blog-image"
          className="sm:h-[528px] sm:w-[940px] w-full object-cover "
        />
      </div>
      <div className="content px-5 md:px-15 space-y-4 pb-5 ">
        <div className="auth-info">
          <div className="auth-profile flex gap-1 items-end">
            <img src={authorProfile ?  authorProfile : "./profile.png"} alt="" className="size-10" />
            <div className="auth-name text-xs/4 mb-0.5">
              <div className="name capitalize">{authorName}</div>
              <div className="rel-date">
                {new Date(postDate).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
            <p className="text-xs mb-0.5">. 1 min read</p>
          </div>
        </div>
        <div className="pl-3 space-y-3 cursor-pointer hover:text-blue-600 ease transition-all"
          onClick={()=> navigate(`/post/${slug}`)}
        >
          <div className="title font-liberty text-xl first-letter:uppercase">
            {title}
          </div>
          <div className="content text-sm">{content}....</div>
        </div>
      </div>
      <div className="social flex justify-between items-center px-5 md:px-10 space-y-4 pb-5">
        <div className="location">
          <div className=" flex items-center gap-0.5 text-sm">
            <IoLocationSharp className="size-4.5" />
            <span className=" font-semibold">{location}</span>
          </div>
        </div>

        <div className="likes flex items-center gap-0.5">
            <span>{number}</span>
            <span onClick={()=> handleLikes()} className=" cursor-pointer ">
                {showLove ? <IoMdHeart className={`size-4 text-pink-500`}/> : <IoMdHeartEmpty className={`size-4 text-pink-500`}/> }
            </span>
        </div>
      </div>
    </div>
  );
};
