import React, { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { AuthRequest } from "../models/auth";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<AuthRequest>({ email: "", password: "" });
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(formData).unwrap();
      dispatch(setCredentials(data));
      alert("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
