import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatHeader } from "./ChatHeader";
import { getMessages } from "../../store/slices/chatSlice";
import { ChatInput } from "./ChatInput";
import { ChatSkeleton } from "./ChatSkeleton";

export const ChatContainer = () => {
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  const { selectedUser, messages, isMessageLoading } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!selectedUser?._id) return;

    dispatch(getMessages(selectedUser._id));
  }, [dispatch, selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <ChatSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === user._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user._id
                      ? user.profilePic || "/profile.png"
                      : selectedUser.profilePic || "/profile.png"
                  }
                  alt="profilePic"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {new Date(message.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>

            <div
              className={`chat-bubble flex flex-col ${
                message.senderId === user._id
                  ? "bg-primary text-primary-content"
                  : ""
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <ChatInput />
    </div>
  );
};