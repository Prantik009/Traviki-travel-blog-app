import { useSelector } from "react-redux"
import { ChatContainer } from "../components/chat/ChatContainer"
import { ChatSidebar } from "../components/chat/ChatSidebar";
import { NoChatSelected } from "../components/chat/NochatSelected";



export const ChatPage = ()=> {
    const {selectedUser} = useSelector((state)=> state.chat)
    return (
    <div className="h-screen bg-gray-100">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-gray-200 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <ChatSidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}