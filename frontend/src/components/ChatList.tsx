import { TbMessagePlus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import SearchBar from "./Searchbar";
import ChatItem from "./ChatItem";

function ChatList() {
  return (
    <div className="flex flex-col h-screen relative z-0 w-full">
      <div className="flex justify-between mt-5">
        <div className="ml-5">
          <h1 className="text-2xl text-green-800 font-semibold">NexChat</h1>
        </div>
        <div className="flex gap-10 px-5">
          <button title="New Chat">
            <TbMessagePlus className="w-6 h-6" />
          </button>
          <button title="Menu">
            <BsThreeDotsVertical className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <SearchBar />
      </div>

      <div className="flex justify-start gap-3 px-3 py-1">
        {["All", "Group", "Favourite"].map((label) => (
          <button
            key={label}
            className="text-gray-800 font-light border border-gray-300 rounded-2xl px-4 py-1 hover:bg-gray-100 transition duration-200"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatItem />
      </div>
    </div>
  );
}

export default ChatList;
