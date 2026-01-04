import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FcBusinessman } from "react-icons/fc";
import api from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState("month");
  const [totalBooks, setTotalBooks] = useState(0);
  const [freeBooks, setFreeBooks] = useState(0);
  const [paidBooks, setPaidBooks] = useState(0);
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [totalGenres, setTotalGenres] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/v1/book/getDashboardData");
        const data = res.data || [];

        setTotalBooks(data.result.totalBooks);

        setTotalAuthors(new Set(data.books.map((b) => b.author)).size);
        setTotalGenres(new Set(data.books.map((b) => b.category)).size);
        console.log(data);
        setFreeBooks(data.result.freeBooks);
        setPaidBooks(data.result.paidBooks);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const StatCard = ({ title, value, onClick }) => (
    <div
      onClick={onClick}
      className={`bg-white shadow rounded p-6 ${
        onClick ? "cursor-pointer hover:bg-gray-50" : ""
      }`}
    >
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{loading ? "..." : value}</h2>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-b md:border-r p-6 md:min-h-screen">
        <div
          className="flex items-center gap-3 mb-10 cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-70 animate-pulse" />
            <div className="relative w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <FcBusinessman className="text-2xl" />
            </div>
          </div>
          <div>
            <h3 className="font-bold">Admin</h3>
            <p className="text-sm text-gray-500">admin@bookstore.com</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3 text-sm">
          <button className="w-full text-left py-2 px-3 rounded bg-blue-600 text-white">
            Dashboard
          </button>
          <button
            onClick={() => navigate("/bookmanagement")}
            className="w-full text-left py-2 px-3 rounded hover:bg-blue-100"
          >
            Book Management
          </button>
          <button
            onClick={() => navigate("/contacts")}
            className="w-full text-left py-2 px-3 rounded hover:bg-blue-100"
          >
            Contacts
          </button>
        </nav>

        <div className="mt-10">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 hover:text-black">
              ⏻ Logout
            </button>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-8">
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, Admin! Here is an overview of your book inventory.
        </p>

        {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Books"
            value={totalBooks}
            onClick={() => navigate("/bookmanagement")}
          />
          <StatCard title="Free Books" value={freeBooks} />
          <StatCard title="Paid Books" value={paidBooks} />
          <StatCard title="Authors" value={totalAuthors} />
          <StatCard title="Genres" value={totalGenres} />
        </div>

        <div className="bg-white shadow rounded p-6 mt-10">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h3 className="font-bold text-lg">New Books Added</h3>
            <div className="flex gap-2">
              {["month", "quarter", "year"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedFilter === filter
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {filter === "month"
                    ? "Last Month"
                    : filter === "quarter"
                    ? "Last Quarter"
                    : "Last Year"}
                </button>
              ))}
            </div>
          </div>

          <div className="h-40 bg-blue-100 rounded flex items-center justify-center text-blue-800">
            Showing data for <strong className="ml-2">{selectedFilter}</strong>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
