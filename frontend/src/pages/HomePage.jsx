// HomePage.jsx
import { useRef } from "react";
import { Hero } from "../components/Hero";
import { AllBlogs } from "../components/post/AllBlogs";

export const HomePage = () => {
  const allBlogsRef = useRef(null);

  const scrollToAllBlogs = () => {
    if (allBlogsRef.current) {
      allBlogsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Hero onReadBlogsClick={scrollToAllBlogs} />
      {/* Attach ref to a wrapper div around AllBlogs */}
      <div ref={allBlogsRef}>
        <AllBlogs />
      </div>
    </>
  );
};
