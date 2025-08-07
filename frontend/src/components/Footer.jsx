import { Instagram, Linkedin, Twitter } from "lucide-react";
import toast from "react-hot-toast";
import { IoMdHeart } from "react-icons/io";
export const Footer = () => {
  const currYear = new Date().getFullYear();
  const sendEmail = ()=> {
    toast.success("Thank You for you Subcription. 🎊")
  }
  return (
    <div className="max-w-7xl w-full">
      <div className="py-10 px-5 w-full flex gap-8 justify-between md:flex-row flex-col">
        <div className="news-letter bg-gray-200 md:w-[45%] px-4 py-6 rounded-xl">
          <div className="flex flex-col items-start justify-between gap-5 h-auto">
            <h2 className="text-3xl font-black  ">Stay Updated!</h2>
            <p className="text-base">
              Subscribe to our newsletter to receive the latest blog posts
              directly in your inbox, exclusive content, and updates you won't
              want to miss.
            </p>
            <form className="w-full flex gap-5 md:flex-row flex-col" onSubmit={sendEmail}>
              <input
                type="text"
                placeholder="Enter your email address"
                className="py-3 px-2 border rounded-lg w-full md:w-[70%] hover:ring-2 hover:ring-indigo-500 outline-none"
              />
              <button className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-indigo-600 transition-all delay-100 cursor-pointer  " type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="other-links md:w-[50%]">
          <div className="top-sec w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              <div className="border-none border-white">
                <h1 className="text-xl font-bold pb-2">Quick links</h1>
                <ul>
                  <li className="hover:text-indigo-500 transition-all cursor-pointer delay-200">
                    About us
                  </li>
                  <li className="hover:text-indigo-500 transition-all cursor-pointer delay-200">
                    Contact us
                  </li>
                  <li className="hover:text-indigo-500 transition-all cursor-pointer delay-200">
                    Blogs
                  </li>
                </ul>
              </div>

              <div className="border-none border-white">
                <h1 className="text-xl font-bold pb-2">Legal & Policy</h1>
                <ul>
                  <li className="hover:text-indigo-500 transition-all cursor-pointer delay-200">
                    Privacy Policy
                  </li>
                  <li className="hover:text-indigo-500 transition-all cursor-pointer delay-200">
                    Terms of Service
                  </li>
                  <li className="hover:text-indigo-500 transition-all cursor-pointer delay-200">
                    Disclaimer
                  </li>
                </ul>
              </div>

              <div className="border-none border-white">
                <h2 className="text-xl font-bold capitalize pb-2">
                  Connect with us
                </h2>
                <div className="flex justify-start items-center gap-3 ">
                  <span className="hover:-translate-y-0.5 cursor-pointer hover:text-indigo-500 transition-all ease delay-75">
                    <Twitter />
                  </span>
                  <span className="hover:-translate-y-0.5 cursor-pointer  hover:text-indigo-500 transition-all ease delay-75">
                    <Linkedin />
                  </span>
                  <span className="hover:-translate-y-0.5 cursor-pointer hover:text-indigo-500 transition-all ease delay-75">
                    <Instagram />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-sec mt-14 mb-20 flex items-center justify-center gap-1 text-sm sm:text-base flex-wrap sm:flex-nowrap">
            &copy; {currYear}
            <span className="font-bold text-lg font-nerko">Traviki</span>
            Made with <IoMdHeart className="text-pink-500 size-4 mt-0.5" />
            By Prantik Biswas. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
