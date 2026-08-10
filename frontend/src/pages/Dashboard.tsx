import { useAppSelector } from "../redux/hook";
import api from "../api/axios";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/slices/authSlice";

export default function Dashboard() {
    const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const handleLogout=async () => {
    try {
      const result=await api.get("/users/logout")
      console.log(result.data);
      dispatch(logout())
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Dashboard</h1>
       <p>Welcome, {user?.name}</p>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>logout</button>
    </>
  )
}
