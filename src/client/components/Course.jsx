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
      <Footer />
    </>
  );
};

export default Course;
