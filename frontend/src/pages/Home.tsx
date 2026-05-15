import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import MobileChatList from "../components/MobileChatList";

function Home() {
  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      {/* Desktop layout */}
      <div className="hidden lg:flex w-full">
        <div className="w-16">
          <Sidebar />
        </div>
        <div className="w-80 border-r border-gray-200">
          <ChatList />
        </div>
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>

      {/* Tablet layout */}
      <div className="hidden md:flex lg:hidden w-full">
        <div className="w-16">
          <Sidebar />
        </div>
        <div className="flex-1">
          <MobileChatList />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden w-full">
        <div className="w-16">
          <Sidebar />
        </div>
        <div className="flex-1">
          <MobileChatList />
        </div>
      </div>
    </div>
  );
}

export default Home;
