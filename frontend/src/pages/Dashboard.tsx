import { useAppSelector } from "../redux/hook";
import api from "../api/axios";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const handleLogout=async () => {
    try {
      const result=await api.get("/users/logout")
      console.log(result.data);
      dispatch(logout())
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Dashboard</h1>
       <p>Welcome, {user?.name}</p>
      <p>Email: {user?.email}</p>
      <Link to="/game">Go to Game</Link>
      <br />
      <button onClick={handleLogout}>logout</button>
    </>
  )
}
