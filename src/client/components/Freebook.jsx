import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "./Cards";
import list from "../List/list.json";

const FreeBook = () => {
  const filterData = list.filter((data) => data.category === "Free");

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 py-8">
      <div className="mb-6 text-center md:text-left">
        <h1 className="font-semibold text-2xl pb-2">Free Offered Courses</h1>
        <p className="text-gray-600 max-w-xl">
          Start learning with our free courses made for beginners. Easy lessons,
          practical knowledge, and zero cost—begin your journey today.
        </p>
      </div>

      <Slider {...settings}>
        {filterData.map((item) => (
          <div key={item.id} className="px-3 py-6">
            <Cards item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FreeBook;
