import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/useAuthStore";
import api from "./lib/axios";
import ChatWindow from "./components/ChatWindow";
import useSocket from "./hooks/useSocket"

function App() {
  const { user, setUser } = useAuthStore();
  const [checking, setChecking] = useState(true);

   useSocket();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await api.get("/auth/verify");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setChecking(false);
      }
    };
    verifyUser();
  }, []);

  if (checking) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatwindow"
          element={
            <ProtectedRoute>
              {/* On desktop redirect back to home which shows full layout */}
              <div className="hidden lg:block w-full h-screen">
                <Home />
              </div>
              {/* On mobile/tablet show chatwindow with back button */}
              <div className="lg:hidden w-full h-screen">
                <ChatWindow />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
