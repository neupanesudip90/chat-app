import { FaUserCircle } from "react-icons/fa";

function ChatItem() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 mx-2 rounded-md my-2 p-1 hover:bg-gray-100 cursor-pointer">
        <FaUserCircle className="h-14 w-14 text-gray-400" />
        <div>
          <span className="text-md">Global Chat Room</span>
          <br />
          <span className="text-gray-600">Hey! How are you?</span>
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
