import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FcBusinessman } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";
import api from "../utils/api";

const BookManagement = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    image: "",
  });

  const fetchBooks = async () => {
    try {
      const { data } = await api.get("/api/v1/book/", {
        params: {
          page,
        },
      });
      setBooks(data.books);
      setTotalPage(data.totalPages);
      setPage(data.currentPage);
      console.log(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    setBooks([]);
    fetchBooks();
    console.log(page);
  }, [page]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/v1/book/createBook", form);

      console.log(form);
      setForm({ title: "", author: "", category: "", price: "", image: "" });
      setShowAdd(false);

      fetchBooks();

      alert("Book Added Successfully!");
    } catch (err) {
      console.log(err);
      alert("Add book failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await api.delete(`/api/v1/book/${id}`);
      fetchBooks();
      alert("Book Deleted!");
    } catch {
      alert("Delete failed");
    }
  };

  const filtered = books.filter(
    (book) =>
      book.name?.toLowerCase().includes(query.toLowerCase()) ||
      book.category?.toLowerCase().includes(query.toLowerCase())
  );

  const onNextClick = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
    console.log(page);
  };
  const onPrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <aside className="w-full md:w-64 bg-white border-r p-6">
        <div
          className="flex items-center gap-3 mb-10 cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full bg-blue-400
                         blur-md opacity-70 animate-pulse"
            ></div>

            <div
              className="relative w-12 h-12 rounded-full bg-blue-600
                         flex items-center justify-center shadow-lg"
            >
              <FcBusinessman className="text-2xl" />
            </div>
          </div>

          <div>
            <h3 className="font-bold leading-tight">Admin</h3>
            <p className="text-sm text-gray-500">admin@bookstore.com</p>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </button>

          <button className="w-full text-left px-3 py-2 rounded bg-blue-100 text-blue-700">
            Book Management
          </button>
        </nav>

        <div className="mt-8">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 hover:text-black">
              <span>⏻</span> Logout
            </button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-8">
        <header className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Book Management</h1>
            <p className="text-gray-500">Manage all books</p>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center justify-center ${
              showAdd ? "w-20 h-8 text-sm" : "px-4 py-2"
            }`}
          >
            {showAdd ? "✖ Close" : "+ Add a New Book"}
          </button>
        </header>

        {showAdd && (
          <form
            onSubmit={handleAddBook}
            className="bg-white p-6 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              name="title"
              placeholder="Book Name"
              className="border p-2 rounded"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              name="author"
              placeholder="Author"
              className="border p-2 rounded"
              value={form.author}
              onChange={handleChange}
              required
            />
            <input
              name="category"
              placeholder="Category"
              className="border p-2 rounded"
              value={form.category}
              onChange={handleChange}
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="border p-2 rounded"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              name="image"
              placeholder="Image URL"
              className="border p-2 rounded md:col-span-2"
              value={form.image}
              onChange={handleChange}
              required
            />
            <button className="md:col-span-2 bg-green-600 text-white px-6 py-2 text-sm rounded hover:bg-green-700 w-fit mx-auto">
              Save Book
            </button>
          </form>
        )}
        <div>
          <div className="relative w-full bg-gray-200 p-2 rounded">
            <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xl z-10" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or category..."
              className="w-full pl-10 pr-3 py-2 rounded bg-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <div>
              <select name="cars" id="cars">
                <option value="volvo">All Status</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div>
              <select name="cars" id="cars">
                <option value="volvo">All</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-x-auto p-4">
          <table className="min-w-full">
            <thead className="bg-gray-300 text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Authors</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((book) => (
                <tr key={book._id} className="border-t">
                  <td className="p-3">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-3">{book.name}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3">{book.category}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    ₹{book.price}
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(book._id)}>🗑️</button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              disabled={page === 1}
              onClick={onPrevClick}
              className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={page === totalPage}
              onClick={onNextClick}
              className="cursor-pointer disabled:opacity-50 ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookManagement;
