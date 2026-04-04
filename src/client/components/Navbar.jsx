import React, { useEffect, useState } from "react";
import Login from "./Login";
import { GrLogout } from "react-icons/gr";
import { useCart } from "../context/CartContext";
// import Logout from "./Logout";
// import { useAuth } from "../context/AuthProvider";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  // console.log("User logged in:", isLoggedIn);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeClass = "border-b-4 border-black-400 ";
  const notActiveClass =
    "hover:bg-gray-200 hover:rounded-lg px-2 py-1 active:bg-black-400 transition-all";
  const navItems = (
    <nav className="space-x-3">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : notActiveClass)}
      >
        Home
      </NavLink>
      <NavLink
        to="/course"
        className={({ isActive }) => (isActive ? activeClass : notActiveClass)}
      >
        Course
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? activeClass : notActiveClass)}
      >
        Contact
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? activeClass : notActiveClass)}
      >
        About
      </NavLink>
    </nav>
  );

  const onLogoutClick = () => {
    logout();
  };
  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0  z-50  ${
          sticky
            ? "sticky-navbar shadow-md bg-base-200 dark:bg-slate-500 duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar bg-gray-600 w-full fixed top-0 left-0 z-50">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="0"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 z-1 w-52 p-2 shadow"
              >
                {isLoggedIn && navItems}
              </ul>
            </div>
            <div className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-12 rounded-full object-cover ml-3"
              />
            </div>
            <a className="text-2xl font-bold cursor-pointer ml-4">Book Store</a>
          </div>

          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              {isLoggedIn && navItems}
            </div>
            <div className="hidden md:block">
              <label className="px-3 py-2 border rounded-md flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="text"
                  className="grow outline-none dark:bg-slate-500 dark:text-white placeholder-white "
                  required
                  placeholder="Search"
                />
              </label>
            </div>
            <div className="flex-none">
              <Link to="/cart" className="relative">
                🛒
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
            <div className="">
              {isLoggedIn ? (
                <GrLogout
                  className="text-2xl cursor-pointer"
                  onClick={onLogoutClick}
                />
              ) : (
                <a
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </a>
              )}
              <Login />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
