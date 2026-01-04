import React, { useState } from "react";
import Login from "./Login";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser(user);
      toast.success("Signup successful");
      navigate("/");
      document.getElementById("my_modal_3")?.close();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }

    setUser({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="w-[400px] p-6 rounded-lg shadow-md bg-gray-300">
        <form onSubmit={onSubmitHandler}>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>

          {/* Full Name */}
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            required
          />

          {/* Email */}
          <label className="text-sm font-medium mt-3 block">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            required
          />

          {/* Password */}
          <label className="text-sm font-medium mt-3 block">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password */}
          <label className="text-sm font-medium mt-3 block">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 cursor-pointer"
          >
            Sign Up
          </button>

          <p className="text-center mt-4">
            Have an account?{" "}
            <button
              type="button"
              className="underline text-blue-500 cursor-pointer"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Login
            </button>
            <Login />
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
