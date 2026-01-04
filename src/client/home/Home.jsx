import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import FreeBook from "../components/Freebook";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    fetch("/api/v1/book")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <Navbar />
      <Banner />
      <FreeBook />
      <Footer />
    </>
  );
};

export default Home;
