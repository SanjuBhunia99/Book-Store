import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./page/AdminLogin.jsx";
import Home from "./home/Home.jsx";
import Course from "./components/Course.jsx";
import Signup from "./components/Signup.jsx";
import Courses from "./courses/Courses.jsx";
import Dashboard from "./page/Dashboard.jsx";
import BookManagement from "./page/BookManagement.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import AdminContact from "./page/AdminContact.jsx";
import { CartProvider } from "./context/CartContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/adminlogin", element: <AdminLogin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/courses", element: <Courses /> },
      { path: "/contact", element: <Contact /> },
      { path: "/course", element: <Course /> },
      { path: "/bookmanagement", element: <BookManagement /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/about", element: <About /> },
      { path: "/admin/contact", element: <AdminContact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
