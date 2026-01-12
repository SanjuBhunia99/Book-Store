import React from "react";
import { useCart } from "../context/CartContext";
const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-3 mb-3 rounded"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 bg-gray-300 rounded"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-semibold"
              >
                ❌
              </button>
            </div>
          ))}

          <div className="mt-4 p-4 border rounded">
            <p>📚 Total Books: {totalItems}</p>
            <p className="font-bold text-green-600">
              💰 Total Price: ₹{totalPrice}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
