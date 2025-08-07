import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersForSidebar, setSelectedUser } from "../../store/slices/chatSlice";

export const ChatSidebar = () => {
  const dispatch = useDispatch();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const { users, selectedUser, isUserLoading } = useSelector(
    (state) => state.chat
  );

  const { onlineUsers = [] } = useSelector((state) => state.auth); // empty array fallback

  useEffect(() => {
    dispatch(getUsersForSidebar());
  }, [dispatch]);
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <h1>Loading..</h1>;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs ">
            ({Math.max(0, onlineUsers.length - 1)} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`w-full p-3 flex items-center gap-3
              hover:bg-gray-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-gray-300 ring-1 ring-gray-200"
                  : ""
              }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/profile.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-gray-900">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            No users {showOnlineOnly ? "online" : "found"}
          </div>
        )}
      </div>
    </aside>
  );
};
