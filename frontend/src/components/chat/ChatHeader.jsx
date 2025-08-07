import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { setSelectedUser } from "../../store/slices/chatSlice";

export const ChatHeader = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);

  if (!selectedUser) return <h1>No chat Selected</h1>; // In case no user is selected

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/profile.png"}
                alt={selectedUser.fullName}
                className=" rounded-full"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium capitalize">{selectedUser.fullName}</h3>
            <p className="text-sm text-base/100">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => dispatch(setSelectedUser(null))}>
          <X />
        </button>
      </div>
    </div>
  );
};
