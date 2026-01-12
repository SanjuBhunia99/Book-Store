import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";
import api from "../utils/api";

const Course = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/api/v1/book/", {
          params: {
            page,
          },
        });
        setTotalPage(res.data.totalPages);
        setPage(res.data.currentPage);
        setBooks(res.data.books);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]);
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
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-40">
        <div className="mt-20 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-green-500">Here! :)</span>
          </h1>

          <p className="mt-12 text-gray-600">
            Discover a wide collection of programming, web development, computer
            science, and tech books created just for you.
          </p>

          <Link to="/">
            <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center col-span-4">Loading books...</p>
          ) : books.length > 0 ? (
            books.map((item) => <Cards key={item._id} item={item} />)
          ) : (
            <p className="text-center col-span-4">No books found</p>
          )}
        </div>
        {/* <div className="flex justify-center items-center mt-6 gap-3">
          <button
            disabled={page === 1}
            onClick={onPrevClick}
            className="
      px-4 py-2 rounded-lg font-medium
      bg-gray-200 text-gray-700
      hover:bg-gray-300
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:bg-gray-200
      transition-all duration-200
    "
          >
            ← Previous
          </button>

          <button
            disabled={page === totalPage}
            onClick={onNextClick}
            className="
      px-4 py-2 rounded-lg font-medium
      bg-blue-500 text-white
      hover:bg-blue-600
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:bg-blue-500
      transition-all duration-200
    "
          >
            Next →
          </button>
        </div> */}
        <div className="flex justify-center items-center mt-6 gap-3 sm:gap-4">
          {/* Previous Button */}
          <button
            disabled={page === 1}
            onClick={onPrevClick}
            className="
      flex items-center justify-center
      px-3 py-2 sm:px-4 sm:py-2.5
      text-sm sm:text-base font-medium
      rounded-md sm:rounded-lg
      bg-gray-200 text-gray-700
      hover:bg-gray-300
      disabled:opacity-40 disabled:cursor-not-allowed
      transition-all duration-200
      min-w-[90px]
    "
          >
            ← <span className="hidden sm:inline ml-1">Previous</span>
          </button>

          {/* Page Indicator */}
          <span className="text-sm sm:text-base font-medium text-gray-600">
            Page <span className="text-gray-900">{page}</span> / {totalPage}
          </span>

          {/* Next Button */}
          <button
            disabled={page === totalPage}
            onClick={onNextClick}
            className="
      flex items-center justify-center
      px-3 py-2 sm:px-4 sm:py-2.5
      text-sm sm:text-base font-medium
      rounded-md sm:rounded-lg
      bg-blue-500 text-white
      hover:bg-blue-600
      disabled:opacity-40 disabled:cursor-not-allowed
      transition-all duration-200
      min-w-22.5
    "
          >
            <span className="hidden sm:inline mr-1">Next</span> →
          </button>
        </div>

        {/* <div className="flex justify-center mt-4">
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
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Course;
