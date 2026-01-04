import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <AuthProvider>
      <Toaster/>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
