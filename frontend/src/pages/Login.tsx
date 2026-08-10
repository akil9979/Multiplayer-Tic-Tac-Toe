import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Email and password are required");
      return;
    }

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log(response.data);

      dispatch(setUser(response.data));

      navigate("/");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;