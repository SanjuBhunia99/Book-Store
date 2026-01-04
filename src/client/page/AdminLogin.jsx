
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Adminlogin() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth(); //  from AuthContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    try {
      //  call useAuth adminLogin
      await adminLogin({ email, password });

      alert("Admin Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h1>
        <p className="mt-1 text-center text-gray-500 text-sm">
          Welcome! Please enter admin credentials.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="admin@bookstore.com"
              className="mt-2 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Enter password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg font-semibold text-white shadow-md
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-800 hover:bg-blue-900"
              }
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <p className="absolute bottom-4 text-gray-500 text-xs">
        © 2025 BookManager Admin Panel
      </p>
    </div>
  );
}
