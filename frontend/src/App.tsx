import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/Protectedroutes";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hook";
import { logout, setUser } from "./redux/slices/authSlice";
import api from "./api/axios";

function App() {
  const dispatch = useAppDispatch();

useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await api.get("/users/profile");

      dispatch(setUser(response.data));
    } catch (error) {
      console.error(error);
      dispatch(logout());
    }
  };

  checkAuth();
}, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;