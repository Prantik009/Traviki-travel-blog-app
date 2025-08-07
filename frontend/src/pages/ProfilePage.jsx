import { Camera, ChevronLeft, Lock, Mail, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, logout } from "../store/slices/authSlice";
import toast from "react-hot-toast";

// TODO: CURRENT PASSWORD CHECK WHILE PASSWORD CHNAGE

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const { register, handleSubmit, watch, reset } = useForm();

  const [preview, setPreview] = useState("");

  const profilePicFile = watch("profilePic");

  // 🔄 Reset form when user is available
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPreview(user.profilePic || "");
    }
  }, [user, reset]);

  // 📷 Live profile picture preview
  useEffect(() => {
    if (profilePicFile && profilePicFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(profilePicFile[0]);
    }
  }, [profilePicFile]);

  const onSubmit = async (data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const updateData = {
      fullName: data.fullName,
      password: data.newPassword,
    };

    if (data.profilePic && data.profilePic[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData.profilePic = reader.result;
        dispatch(updateProfile(updateData));
      };
      reader.readAsDataURL(data.profilePic[0]);
    } else {
      dispatch(updateProfile(updateData));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-7xl w-full py-20">
      <div className="bg-none px-2 flex items-center justify-center">
        <div className="bg-none py-6 w-full max-w-5xl flex items-center flex-col gap-2">
          <p
            className="flex items-center cursor-pointer font-light uppercase w-full"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="size-5 font-thin" />
            <span className="text-xs">back to home page</span>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col justify-between w-full sm:w-[80%] items-center px-2 gap-2"
          >
            {/* Profile Pic Section */}
            <div className="name-photo flex flex-col items-center gap-2 bg-gray-200 px-2 py-2 rounded-xl w-full">
              <div className="relative flex items-center justify-center mx-auto p-2">
                <img
                  src={preview || "/profile.png"}
                  alt="profile"
                  className="size-30 rounded-full object-cover"
                />
                <label
                  htmlFor="profilePic"
                  className="absolute p-1.5 cursor-pointer rounded-full bg-gray-200 border right-0 top-[60%]"
                >
                  <Camera className="size-3" />
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    {...register("profilePic")}
                    className="hidden"
                  />
                </label>
              </div>
              <h1 className="text-3xl sm:text-4xl capitalize font-bold text-center">
                {user.fullName}
              </h1>
            </div>

            <div className="personal-info-security flex flex-col sm:flex-row justify-between w-full gap-4">
                {/* Personal Information */}
            <div className="mt-6 rounded-xl sm:h-[50vh] w-full sm:w-1/2 px-4 py-2 bg-gray-200 flex flex-col justify-between">
              <div>
                    <span className="text-xl font-bold capitalize">
                    Personal Information
                    </span>
                    <div className="flex flex-col gap-2 mt-3">
                    <div className="flex flex-col relative">
                        <input
                        type="text"
                        {...register("fullName", {
                            required: "Name is required",
                        })}
                        className="border border-gray-400 py-1.5 px-8 rounded-md outline-none focus:ring-1 focus:ring-amber-500"
                        placeholder="Full Name"
                        />
                        <span className="absolute p-1 translate-y-[8px] left-1.5">
                        <User2 className="size-4" />
                        </span>
                    </div>

                    <div className="flex flex-col relative">
                        <input
                        type="email"
                        {...register("email")}
                        readOnly
                        className="bg-gray-200 cursor-not-allowed text-black border border-gray-400 py-1.5 px-8 rounded-md"
                        />
                        <span className="absolute p-1 translate-y-[8px] left-1.5">
                        <Mail className="size-4" />
                        </span>
                    </div>
                    </div>
              </div>
              <div className="flex flex-col gap-2 text-xs mt-2">
                <p className="flex justify-between">
                  <span className="capitalize">member since</span>
                  <span className="text-green-500">
                    {user.createdAt?.slice(0, 10)}
                  </span>
                </p>
                <hr />
                <p className="flex justify-between">
                  <span className="capitalize">account status</span>
                  <span className="text-green-600">active</span>
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-sky-600 rounded-md capitalize font-semibold mt-2 text-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {/* Security Section */}
            <div className="mt-6 rounded-xl sm:h-auto w-full sm:w-1/2 px-4 py-2 bg-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-xl font-bold capitalize">Security</span>
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex flex-col relative">
                    <input
                      type="password"
                      {...register("newPassword")}
                      className="border border-gray-400 py-1.5 px-8 rounded-md outline-none"
                      placeholder="New password"
                    />
                    <span className="absolute p-1 translate-y-[8px] left-1.5">
                      <Lock className="size-4" />
                    </span>
                  </div>
                  <div className="flex flex-col relative">
                    <input
                      type="password"
                      {...register("confirmPassword")}
                      className="border border-gray-400 py-1.5 px-8 rounded-md outline-none"
                      placeholder="Confirm password"
                    />
                    <span className="absolute p-1 translate-y-[8px] left-1.5">
                      <Lock className="size-4" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-2 mt-2
              ">
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-400 rounded-md capitalize font-semibold"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 bg-red-400 rounded-md capitalize font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
