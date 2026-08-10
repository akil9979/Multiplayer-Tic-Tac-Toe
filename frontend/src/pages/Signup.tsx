import { useState } from "react";
import api from "../api/axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await api.post("/users/create", {
        name,
        email,
        password,
      });

      console.log(response.data);

      alert("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while creating your account"
      );
    }
  };

  return (
    <>
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;