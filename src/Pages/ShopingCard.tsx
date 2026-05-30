import React, { useState } from "react";
import { X, Minus, Plus, ArrowLeft, ArrowRight } from "lucide-react";

// Types for our cart items
interface CartItem {
  id: number;
  name: string;
  image: string;
  originalPrice?: number;
  price: number;
  quantity: number;
}

const ShopingCard: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      image: "https://via.placeholder.com/80", // Replace with actual TV image
      originalPrice: 99,
      price: 70,
      quantity: 1,
    },
    {
      id: 2,
      name: "Wired Over-Ear Gaming Headphones with USB",
      image: "https://via.placeholder.com/80", // Replace with actual Headphone image
      price: 250,
      quantity: 3,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 24.0;
  const tax = 61.99;
  const total = subtotal - discount + tax;

  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans text-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Column: Product List */}
        <div className="flex-1 bg-white border border-gray-200 rounded-sm shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-semibold">Shopping Card</h1>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase text-gray-400 border-b border-gray-100">
                <th className="px-6 py-3 font-medium">Products</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium text-center">Quantity</th>
                <th className="px-6 py-3 font-medium">Sub-total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-6 flex items-center gap-4">
                    <button className="text-gray-300 hover:text-red-500">
                      <X
                        size={18}
                        className={item.id === 2 ? "text-red-400" : ""}
                      />
                    </button>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain border rounded"
                    />
                    <span className="text-sm font-medium max-w-[200px] leading-snug">
                      {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-sm">
                    {item.originalPrice && (
                      <span className="text-gray-300 line-through mr-2">
                        ${item.originalPrice}
                      </span>
                    )}
                    <span className="text-gray-600 font-medium">
                      ${item.price}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center justify-center border border-gray-200 rounded w-32 mx-auto">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="flex-1 text-center text-sm">
                        {item.quantity.toString().padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-semibold">
                    ${item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-6 flex justify-between border-t border-gray-100">
            <button className="flex items-center gap-2 px-6 py-3 border border-sky-400 text-sky-500 rounded uppercase text-sm font-bold tracking-wider hover:bg-sky-50">
              <ArrowLeft size={18} /> Return to Shop
            </button>
            <button className="px-6 py-3 border border-sky-400 text-sky-500 rounded uppercase text-sm font-bold tracking-wider hover:bg-sky-50">
              Update Cart
            </button>
          </div>
        </div>

        {/* Right Column: Totals & Coupons */}
        <div className="w-full lg:w-[380px] space-y-6">
          {/* Card Totals */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Card Totals</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Sub-total</span>
                <span className="font-semibold">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="font-semibold">${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-semibold">${tax}</span>
              </div>
              <hr className="border-gray-100 my-4" />
              <div className="flex justify-between text-base">
                <span className="font-medium">Total</span>
                <span className="font-bold">${total.toFixed(2)} USD</span>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded flex items-center justify-center gap-2 uppercase tracking-wide mt-4">
                Proceed to Checkout <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Coupon Code</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Email address"
                className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded uppercase text-sm">
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopingCard;
