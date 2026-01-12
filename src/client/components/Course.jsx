// import React, { useEffect, useState } from "react";
// import Cards from "./Cards";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import Footer from "../components/Footer";
// import api from "../utils/api";

// const Course = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(1);
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await api.get("/api/v1/book/", {
//           params: {
//             page,
//           },
//         });
//         setTotalPage(res.data.totalPages);
//         setPage(res.data.currentPage);
//         setBooks(res.data.books);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching books:", error);
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [page]);
//   const onNextClick = () => {
//     if (page < totalPage) {
//       setPage(page + 1);
//     }
//     console.log(page);
//   };
//   const onPrevClick = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="max-w-screen-2xl container mx-auto md:px-20 px-40">
//         <div className="mt-20 items-center justify-center text-center">
//           <h1 className="text-2xl md:text-4xl">
//             We're delighted to have you{" "}
//             <span className="text-green-500">Here! :)</span>
//           </h1>

//           <p className="mt-12 text-gray-600">
//             Discover a wide collection of programming, web development, computer
//             science, and tech books created just for you.
//           </p>

//           <Link to="/">
//             <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 duration-300">
//               Back
//             </button>
//           </Link>
//         </div>

//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {loading ? (
//             <p className="text-center col-span-4">Loading books...</p>
//           ) : books.length > 0 ? (
//             books.map((item) => <Cards key={item._id} item={item} />)
//           ) : (
//             <p className="text-center col-span-4">No books found</p>
//           )}
//         </div>
//         <div className="flex justify-center items-center mt-6 gap-3 sm:gap-4">
//           <button
//             disabled={page === 1}
//             onClick={onPrevClick}
//             className=" flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-medium rounded-md sm:rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 min-w-22.5"
//           >
//             ← <span className="hidden sm:inline ml-1">Previous</span>
//           </button>
//           <span className="text-sm sm:text-base font-medium text-gray-600">
//             Page <span className="text-gray-900">{page}</span>... {totalPage}
//           </span>
//           <button
//             disabled={page === totalPage}
//             onClick={onNextClick}
//             className=" flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-medium rounded-md sm:rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 min-w-22.5"
//           >
//             <span className="hidden sm:inline mr-1">Next</span> →
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Course;

import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";

const Course = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/v1/book/", {
          params: { page },
        });
        setBooks(res.data.books);
        setFilteredBooks(res.data.books);
        setTotalPage(res.data.totalPages);
        setPage(res.data.currentPage);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page]);

  // 🔍 Search filter
  useEffect(() => {
    const result = books.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(result);
  }, [search, books]);

  return (
    <>
      <Navbar />

      <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 md:px-20">
        <div className="mt-20 text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-green-500">Here! :)</span>
          </h1>

          <p className="mt-6 text-gray-600">
            Discover a wide collection of tech books created just for you.
          </p>

          <Link to="/">
            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {/* 🔍 Search Input */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* 📚 Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            [...Array(8)].map((_, i) => <Cards.Skeleton key={i} />)
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((item) => <Cards key={item._id} item={item} />)
          ) : (
            <p className="col-span-4 text-center">No books found</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-40"
          >
            Previous
          </button>

          <span>
            Page {page} / {totalPage}
          </span>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Course;
