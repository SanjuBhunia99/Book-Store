// import React from "react";
// import { useCart } from "../context/CartContext";
// const CartPage = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseQty,
//     decreaseQty,
//     totalItems,
//     totalPrice,
//   } = useCart();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p>Cart is empty</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border p-3 mb-3 rounded"
//             >
//               <div>
//                 <h2 className="font-semibold">{item.name}</h2>
//                 <p className="text-sm">₹{item.price}</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => decreaseQty(item.id)}
//                   className="px-2 bg-gray-300 rounded"
//                 >
//                   -
//                 </button>

//                 <span>{item.qty}</span>

//                 <button
//                   onClick={() => increaseQty(item.id)}
//                   className="px-2 bg-gray-300 rounded"
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500 font-semibold"
//               >
//                 ❌
//               </button>
//             </div>
//           ))}

//           <div className="mt-4 p-4 border rounded">
//             <p>📚 Total Books: {totalItems}</p>
//             <p className="font-bold text-green-600">
//               💰 Total Price: ₹{totalPrice}
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const { user } = useAuth();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center border p-4 mb-4 rounded gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-sm font-semibold text-green-600">
                    Qty: {item.qty} | Subtotal: ₹{item.price * item.qty}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="font-semibold">{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-semibold"
              >
                ❌ Remove
              </button>
            </div>
          ))}
          <div className="mt-6 p-5 border rounded-lg bg-gray-50">
            <p className="mb-1">
              📚 <b>Total Books Added:</b> {totalItems}
            </p>

            <p className="mb-3">
              📖 <b>Book List:</b>
            </p>

            <ul className="list-disc pl-6 text-sm mb-4">
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>

            <p className="text-lg font-bold text-green-600 mb-4">
              💰 Total Price: ₹{totalPrice}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={clearCart}
                className="border py-2 rounded text-red-600"
              >
                🗑️ Clear Cart
              </button>

              <button
                disabled={!user}
                className={`py-2 rounded text-white ${
                  user
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                💳 Checkout
              </button>
            </div>

            {!user && <p className="text-xs text-red-500 mt-2"></p>}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
