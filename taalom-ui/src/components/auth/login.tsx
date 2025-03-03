import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setCredentials } from "../../features/auth/authSlice";
import { AuthRequest } from "../../models/auth";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalide email").required("Email is required"),
  password: yup.string().min(6, "Password must contain at least 6 characters").required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequest>({
    resolver: yupResolver(loginSchema),
  });
  
  const handleLogin = async (data: AuthRequest) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials(response));

      switch (response.user.role) {
        case "ROLE_ADMIN":
          navigate("/admin");
          break;
        case "ROLE_TEACHER":
          navigate("/teacher");
          break;
        case "ROLE_STUDENT":
          navigate("/student");
          break;
        default:
          navigate("/dashboard"); // Redirection par défaut
      }
      // alert("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      // alert("Invalid credentials!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          {isLoading ? "Connection..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
