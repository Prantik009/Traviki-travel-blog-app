import { IoChatbubblesOutline } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";


import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";


import { BsPlusSquare } from "react-icons/bs";
import { BsPlusSquareFill } from "react-icons/bs";


import { RiFolderUserFill } from "react-icons/ri";
import { RiFolderUserLine } from "react-icons/ri";


import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../store/slices/authSlice";
import { Logo } from "./Logo";
import { Search, UserCircle2, UserCircle } from "lucide-react";

// 🔁 Reusable NavButton
const NavButton = ({ icon: Icon, label, onClick, className = "", children }) => (
  <button
    onClick={onClick}
    className={`bg-primary-content items-center p-1.5 rounded-xl sm:rounded-full cursor-pointer gap-1 hidden sm:flex ${className}`}
  >
    <Icon className="size-5" />
    {label && <span className="hidden sm:block text-xs">{label}</span>}
    {children}
  </button>
);

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const profilePic = user?.profilePic;
  const firstName = user?.fullName?.split(" ")[0];

  return (
    <div className="w-full bg-gray-200 py-4 px-4 fixed z-20">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex gap-2 items-center cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <Logo />
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden sm:block w-[40%]">
          <div className="border flex items-center gap-2 px-4 py-1.5 rounded-full w-full">
            <Search className="size-4 text-black" />
            <input
              type="text"
              placeholder="Search blogs..."
              className="bg-transparent text-black w-full outline-none"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex gap-4 items-center">
          {/* Mobile search icon */}
          <button className="sm:hidden p-1.5 rounded-xl">
            <Search className="size-5" />
          </button>

          {/* Desktop buttons */}
          <NavButton icon={IoChatbubblesOutline} label="Chats" onClick={() => navigate("/chat")} />
          <NavButton icon={RiFolderUserLine} label="My Posts" onClick={() => navigate("/my-posts")} />
          <NavButton icon={BsPlusSquare} label="New Post" onClick={() => navigate("/add-posts")} />
          <NavButton
            icon={profilePic ? () => <img src={profilePic} className="size-5 rounded-full" /> : UserCircle}
            label={`Hi, ${firstName}`}
            onClick={() => navigate("/update-profile")}
          />
        </div>
      </div>

      {/* Bottom Mobile Navigation */}
      <div className="flex sm:hidden bg-gray-200 py-1 bottom-0 w-full left-0 right-2 px-2 fixed z-20">
        <ul className="flex items-center justify-around text-xs w-full pt-3 px-2 py-1 rounded-lg">
          {[
            { icon: GoHome, label: "Home", path: "/" },
            { icon: IoChatbubblesOutline, label: "Chats", path: "/chat" },
            { icon: BsPlusSquare, label: "Post", path: "/add-posts" },
            { icon: RiFolderUserLine, label: "My Posts", path: "/my-posts" },
            {
              icon: profilePic
                ? () => <img src={profilePic} className="size-5 rounded-full" />
                : UserCircle2,
              label: "Me",
              path: "/update-profile",
            },
          ].map(({ icon: Icon, label, path }, index) => (
            <li
              key={index}
              className="flex items-center flex-col gap-1 cursor-pointer"
              onClick={() => navigate(path)}
            >
              <Icon className="size-5" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
