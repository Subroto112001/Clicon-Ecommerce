// src/components/CheckoutForm.tsx
import React, { useState } from "react";
import type { FormEvent, ReactNode } from "react";

// --- TypeScript Interfaces ---

/** Defines the structure of a single item in the shopping cart/order. */
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice: number;
}

/** Defines the overall structure of the order data. */
interface OrderData {
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: "Free" | number; // Assuming shipping can be 'Free' or a number
  tax: number;
  total: number;
}

/** Defines the props for the InputField component. */
interface InputFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "password";
  placeholder?: string;
  optional?: boolean;
  half?: boolean;
}

/** Defines the props for the SelectField component. */
interface SelectFieldProps {
  label: string;
  name: string;
}

/** Defines the props for the PaymentOptions component. */
interface PaymentOptionsProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

// --- Data (Converted to be strongly typed) ---

// src/data.ts (or src/data.js in your original structure)

export const initialOrder: OrderData = {
  items: [
    {
      id: 1,
      name: "Canon EOS 1500D DSLR Camera Body + 18-...",
      price: 320,
      quantity: 1,
      image: "https://via.placeholder.com/50", // Placeholder image
      originalPrice: 320,
    },
    {
      id: 2,
      name: "Wired Over-Ear Gaming Headphones with U...",
      price: 250,
      quantity: 3,
      image: "https://via.placeholder.com/50", // Placeholder image
      originalPrice: 250,
    },
  ],
  subtotal: 320 + 250 * 3, // 1070
  discount: 24,
  shipping: "Free",
  tax: 61.99,
  // total will be calculated below, initial value is not critical if re-calculated
  total: 0,
};

// Calculate the total based on the mock data
initialOrder.total =
  initialOrder.subtotal - initialOrder.discount + initialOrder.tax;

// --- Sub-components (Converted to TSX) ---

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  optional = false,
  half = false,
}) => (
  <div className={half ? "w-full md:w-1/2" : "w-full"}>
    <label htmlFor={name} className="sr-only">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={label + (optional ? " (Optional)" : "")}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm"
    />
  </div>
);

const SelectField: React.FC<SelectFieldProps> = ({ label, name }) => (
  <div className="w-full">
    <label htmlFor={name} className="sr-only">
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm appearance-none bg-white pr-8"
    >
      <option value="">Select...</option>
      <option value="US">United States</option>
      {/* Add more options */}
    </select>
  </div>
);

// Define the structure of a payment option
interface PaymentOption {
  id: string;
  label: string;
  icon: string | ReactNode;
  isCard?: boolean;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const options: PaymentOption[] = [
    { id: "cash", label: "Cash on Delivery", icon: "$" },
    {
      id: "venmo",
      label: "Venmo",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Venmo_Logo.png"
          alt="Venmo"
          className="h-4"
        />
      ),
    },
    {
      id: "paypal",
      label: "Paypal",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="h-4"
        />
      ),
    },
    {
      id: "amazon",
      label: "Amazon Pay",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Amazon_Pay_logo.svg"
          alt="Amazon Pay"
          className="h-4"
        />
      ),
    },
    {
      id: "card",
      label: "Debit/Credit Card",
      icon: <div className="text-xl">💳</div>,
      isCard: true,
    },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-3">Payment Option</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`p-3 border rounded-lg cursor-pointer text-center transition ${
              selectedOption === option.id
                ? "border-orange-500 ring-2 ring-orange-500"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex justify-center items-center h-6 mb-1 text-orange-500 font-bold">
              {option.isCard ? (
                option.icon
              ) : typeof option.icon === "string" &&
                option.icon.startsWith("$") ? (
                <span className="text-3xl">{option.icon}</span>
              ) : (
                option.icon
              )}
            </div>
            <div className="text-sm font-medium">{option.label}</div>
            <div className="mt-1">
              <input
                type="radio"
                name="payment-option"
                value={option.id}
                checked={selectedOption === option.id}
                readOnly
                className="form-radio h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component (Converted to TSX) ---

const CheckoutForm: React.FC = () => {
  // Explicitly typing state with a union of known values
  const [selectedPayment, setSelectedPayment] = useState<string>("cash");
  // Explicitly typing boolean state
  const [shippingDifferent, setShippingDifferent] = useState<boolean>(false);
  // Using the strongly typed OrderData interface for the order object
  const order: OrderData = initialOrder;

  // Explicitly typing the event as FormEvent<HTMLFormElement>
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Submitting form...");
    // Add form submission logic here
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* --- Billing and Payment Section (Col 1 & 2 on desktop) --- */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 ">
            {/* 1. Billing Information */}
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">
              Billing Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="User name"
                name="username"
                placeholder="User name"
              />
              <InputField
                label="Company Name"
                name="companyName"
                optional={true}
                placeholder="Company Name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="First name"
                name="firstName"
                placeholder="First name"
              />
              <InputField
                label="Last name"
                name="lastName"
                placeholder="Last name"
              />
            </div>

            <h3 className="font-semibold text-lg mb-2 mt-6">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <SelectField label="Country" name="country" />
              <SelectField label="Region/State" name="regionState" />
              <SelectField label="City" name="city" />
              <InputField
                label="Zip Code"
                name="zipCode"
                type="text"
                placeholder="Zip Code"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
              />
            </div>

            <div className="flex items-center mb-10">
              <input
                id="ship-to-different-address"
                name="ship-to-different-address"
                type="checkbox"
                checked={shippingDifferent}
                onChange={(e) => setShippingDifferent(e.target.checked)}
                className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label
                htmlFor="ship-to-different-address"
                className="ml-2 block text-sm text-gray-900"
              >
                Ship into different address
              </label>
            </div>

            {/* 2. Payment Option */}
            <PaymentOptions
              selectedOption={selectedPayment}
              setSelectedOption={setSelectedPayment}
            />

            {/* 3. Card Details (Conditional Rendering) */}
            {selectedPayment === "card" && (
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">Card Information</h3>
                <div className="space-y-4">
                  <InputField
                    label="Name on Card"
                    name="cardName"
                    placeholder="Name on Card"
                  />
                  <InputField
                    label="Card Number"
                    name="cardNumber"
                    type="text"
                    placeholder="Card Number"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Expire Date (MM/YY)"
                      name="expireDate"
                      type="text"
                      placeholder="DD/YY"
                    />
                    <InputField
                      label="CVC"
                      name="cvc"
                      type="text"
                      placeholder="CVC"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Additional Information */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3">
                Additional Information (Optional)
              </h3>
              <textarea
                name="orderNotes"
                placeholder="Notes about your order, e.g. special notes for delivery"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm"
              ></textarea>
            </div>
          </div>

          {/* --- Order Summary Section (Col 3 on desktop) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 shadow-lg rounded-xl sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-4 border-b pb-4 mb-4">
                {order.items.map((item: OrderItem) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x ${item.originalPrice}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub-total</span>
                  <span className="font-medium">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {typeof order.shipping === "string"
                      ? order.shipping
                      : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-red-600">
                    -${order.discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${order.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full mt-6 flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              >
                PLACE ORDER <span className="ml-2 text-xl">→</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
