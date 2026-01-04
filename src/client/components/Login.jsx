import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // modal close
  const handleLogin = () => {
    document.getElementById("my_modal_3")?.close();
  };

  const { login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const res = await login(user);
      console.log(res);
      navigate("/");
      document.getElementById("my_modal_3")?.close();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    }
    setUser({
      email: "",
      password: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setUser({ ...user, [name]: value });
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form onSubmit={onSubmitHandler}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>

          <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={user.email}
            className="mt-2 w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <label className="text-sm font-medium text-gray-600 mt-4 block">
            Password
          </label>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={user.password}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="text-right mt-2">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-700 mt-4"
          >
            Login
          </button>

          <div className="text-center mt-4 text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>

            <p className="mt-2">
              Are you an administrator?{" "}
              <Link to="/AdminLogin" className="text-blue-600 hover:underline">
                Admin Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Login;
