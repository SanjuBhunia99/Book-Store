// import React from "react";
// import { useCart } from "../context/CartContext";

// const Cards = ({ item }) => {
//   const { addToCart } = useCart();

//   return (
//     <div
//       className="
//         border rounded-lg shadow-md
//         p-3 sm:p-4
//         w-full
//         transition-transform duration-300
//         hover:scale-105
//       "
//     >
//       <img
//         src={item.image}
//         alt={item.name}
//         className="h-36 sm:h-40 md:h-44 w-full object-cover rounded"
//       />
//       <h2 className="mt-2 font-bold text-base sm:text-lg">{item.name}</h2>

//       <p className="text-xs sm:text-sm text-gray-600">{item.title}</p>

//       <p className="mt-1 font-semibold text-green-600 text-sm sm:text-base">
//         ₹{item.price}
//       </p>

//       <span className="inline-block mt-2 text-xs bg-blue-100 px-2 py-1 rounded">
//         {item.category}
//       </span>
//       <div className="mt-3">
//         <button
//           onClick={() => addToCart(item)}
//           className="
//             w-full
//             bg-green-500 text-white
//             py-2 text-sm sm:text-base
//             rounded
//             hover:bg-green-600
//             transition
//           "
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cards;

import React from "react";
import { useCart } from "../context/CartContext";

const Cards = ({ item }) => {
  const { addToCart } = useCart();

  // return (
  //     <div className="border rounded-lg shadow-md p-3 hover:scale-105 transition">
  //       <img
  //         src={item.image}
  //         alt={item.name}
  //         className="h-40 w-full object-cover rounded"
  //       />
  //       <h2 className="mt-2 font-bold">{item.name}</h2>
  //       <p className="text-sm text-gray-600">{item.title}</p>
  //       <p className="text-green-600 font-semibold">₹{item.price}</p>

  //       <button
  //         onClick={() => addToCart(item)}
  //         className="w-full mt-3 bg-green-500 text-white py-2 rounded"
  //       >
  //         Add to Cart
  //       </button>
  //     </div>
  //   );
  // };

  // export default Cards;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={item.image}
        alt={item.title}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h2 className="mt-3 font-semibold text-base sm:text-lg line-clamp-2">
        {item.title}
      </h2>

      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {item.description}
      </p>

      <div className="mt-auto pt-3 flex justify-between items-center">
        <span className="text-green-600 font-bold">${item.price}</span>
        <button className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Buy
        </button>
      </div>
    </div>
  );
};

export default Cards;
