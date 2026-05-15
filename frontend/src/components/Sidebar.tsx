import { useState, useRef, useEffect } from "react";
import {
  IoChatbubblesOutline,
  IoCallOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineDonutLarge } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import useAuthStore from "../store/useAuthStore";
import api from "../lib/axios";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuthStore();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  const topItems = [
    {
      icon: <IoChatbubblesOutline className="w-6 h-6" />,
      label: "Chats",
      badge: 1,
    },
    { icon: <IoCallOutline className="w-6 h-6" />, label: "Calls", badge: 1 },
    {
      icon: <MdOutlineDonutLarge className="w-6 h-6" />,
      label: "Status",
      badge: 1,
    },
  ];

  return (
      <div
  ref={sidebarRef}
  className={`flex flex-col h-screen bg-gray-100 border-r border-gray-200 transition-all duration-300 relative z-50 ${
    open ? "w-48" : "w-16"
  }`}
>
      {/* Menu toggle */}
      <div className="flex items-center justify-end p-3">
        <button onClick={() => setOpen(!open)}>
          <HiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Top nav items */}
      <div className="flex flex-col gap-1 mt-2">
        {topItems.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition duration-200 relative"
          >
            <div className="relative">
              {item.icon}
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {item.badge}
              </span>
            </div>
            {open && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Bottom nav items */}
      <div className="flex flex-col gap-1 mt-auto mb-2">
        <button
          title="Settings"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition duration-200"
        >
          <IoSettingsOutline className="w-6 h-6" />
          {open && <span className="text-sm">Settings</span>}
        </button>

        <button
          title={user?.name}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition duration-200"
        >
          <FaUserCircle className="w-6 h-6 text-gray-400" />
          {open && <span className="text-sm truncate">{user?.name}</span>}
        </button>

        <button
          title="Logout"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition duration-200"
        >
          <IoLogOutOutline className="w-6 h-6" />
          {open && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
