import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";

// Assuming these are paths to existing files/helpers:
import { productImage } from "../Helpers/ImageProvider";
import Containere from "../Component/CoomonComponent/Container/Containere";
import BreadCrumb from "../Component/CoomonComponent/BreadCrumb/BreadCrumb";
import { Staricon } from "../Helpers/IconProvider";
import {
  useCreateCartMutation,
  useSingleProductData,
} from "../Hooks/api-mutaion/api-mutation";
import ProductDetailLoading from "../Component/ProductPage/ProductLoading";

// --- 1. INTERFACE & STATIC DATA ---

interface Discount {
  discountType: "percentage" | "flat"; // Assuming these are the types
  discountValueByPercentage: number | null;
  discountValueByFlat: number | null;
}

interface ProductDetails {
  availabilityStatus: boolean;
  barCode: string;
  brand: {
    _id: string;
    name: string;
    im: string;
  };
  category: {
    _id: string;
    name: string;
  };
  color: string[]; // Corrected type: assumed to be an array of strings
  createdAt: string;
  description: string;
  groupUnit: string;
  image: {
    url: string;
  }[];
  isActive: boolean;
  manufactureCountry: string;
  minimumOrderQuantity: number;
  name: string;
  qrCode: string;
  rating: number;
  retailPrice: number;
  returnPolicy: string;
  reviews: Array<any>;
  shippingInformation: string;
  size: string[]; // Corrected type: assumed to be an array of strings
  sku: string;
  slug: string;
  stock: number;
  stockAlert: boolean;
  subCategory: string;
  tags: string[];
  totalSale: number;
  unit: string;
  updatedAt: string;
  // NOTE: productData.variant.image was accessed on variant array, assuming only one element is used
  variant: {
    image: {
      url: string;
    }[];
  }[];
  variantType: string;
  warehouseLocation: string;
  warrantyInformation: string;
  wholesalePrice: number;
  __v: number;
  _id: string;
  discount: Discount | null; // Added discount field and allowed it to be null
}

const ShippingData = [
  { type: "Courier", details: "2 - 4 days, free shipping" },
  { type: "Local Shipping", details: "up to one week, $19.00" },
  { type: "UPS Ground Shipping", details: "4 - 6 days, $29.00" },
  { type: "Unishop Global Export", details: "3 - 4 days, $39.00" },
];

// Helper component for features list
const FeatureIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="text-orange-500 w-5 h-5 flex-shrink-0">{children}</span>
);

// --- 2. MAIN PRODUCT COMPONENT ---
const Product = () => {
  // State for Product Tabs
  const [activeTab, setActiveTab] = useState("Description");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [stock, setStock] = useState<number>(0);
  const tabs = [
    "Description",
    "Additional Information",
    "Specification",
    "Review",
  ];
  const { slug } = useParams();

  // Fetch product data
  const { data, isError, isPending, isLoading } = useSingleProductData(
    slug || ""
  );
  // const createAddtoCart = useCreateCartMutation();
  const productData = data?.data;
  console.log(productData?.variant);
 

  // 1. Feature Data relies on productData, so it must be defined *after* fetching
  const FeaturesData = [
    { text: productData?.warrantyInformation, icon: "✅" },
    { text: productData?.shippingInformation, icon: "🚚" },
    { text: productData?.returnPolicy, icon: "💰" },
    { text: "24/7 Customer support", icon: "🧑‍💻" },
    { text: "Secure payment method", icon: "🔒" },
  ];

  // 2. Discount Price Calculation (DERIVED VALUE)
  const retailPrice = productData?.retailPrice || 0;
  let finalPrice = retailPrice;
  let discountDisplayValue = 0; // Value for "% OFF" or "Tk OFF" badge

  const discount = productData?.discount;

  if (discount) {
    if (
      discount.discountType === "percentage" &&
      discount.discountValueByPercentage
    ) {
      const percentage = discount.discountValueByPercentage;
      const discountValue = (retailPrice * percentage) / 100;
      finalPrice = retailPrice - discountValue;
      discountDisplayValue = percentage;
    } else if (
      discount.discountType === "flat" &&
      discount.discountValueByFlat
    ) {
      // Assuming a flat discount type exists
      finalPrice = retailPrice - discount.discountValueByFlat;
      discountDisplayValue = discount.discountValueByFlat;
    }
    // Ensure the final price is not negative
    finalPrice = Math.max(0, finalPrice);
  }
  useEffect(() => {
    if (
      productData?.discount &&
      productData.discount.discountValueByPercentage
    ) {
      const amount =
        productData.retailPrice *
        productData.discount.discountValueByPercentage;
      const discountAmountt = productData.retailPrice - amount / 100;
      setDiscountAmount(discountAmountt);
    }
  }, [productData]);

  // stock identyfication
  useEffect(() => {
    if (productData?.variantType === "MultipleVariant") {
      setStock(productData?.variant?.stockVariant);
    } else {
      setStock(productData?.stock);
    }
  }, [productData]);

  // --- LOADING/ERROR STATE ---

  if (isLoading || isPending) {
    return <ProductDetailLoading />;
  }

  // Handle error case if needed
  if (isError) {
    return (
      <Containere>
        <div className="text-red-600 text-center py-10">
          Error loading product details.
        </div>
      </Containere>
    );
  }
  const allImageUrls: string[] = productData?.variant?.flatMap((item: any) =>
    item?.image?.map((img: any) => img.url)
  );

  console.log(allImageUrls);
  // --- TAB CONTENT RENDERER ---
  const renderContent = () => {
    if (activeTab === "Description") {
      return (
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10 py-8">
          {/* Description Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Description
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {productData.description}
            </p>
          </div>

          {/* Features Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Feature
            </h3>
            <ul className="space-y-4">
              {FeaturesData.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <span className="text-base">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping Information Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Shipping Information
            </h3>
            <ul className="space-y-3">
              {ShippingData.map((ship, index) => (
                <li key={index}>
                  <p className="font-semibold text-gray-800">{ship.type}:</p>
                  <p className="text-gray-600 text-sm">{ship.details}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    // Placeholder content for other tabs
    return (
      <div className="p-10 text-center text-gray-500">
        Content for **{activeTab}** goes here.
      </div>
    );
  };

  const handleQuantityOfproductIncriment = () => {
    if (productQuantity < stock) {
      setProductQuantity(productQuantity + 1);
    }
  };
  const handleQuantityOfproductDecriment = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };
  interface CartDetails {
    productId: string;
    quantity: number;
  }
  const handleAddtoCart = () => {
    alert("Add to cart clicked");
    // const cartData: CartDetails = {
    //   productId: productData?._id,
    //   quantity: productQuantity,

    // };
    // createAddtoCart.mutate(cartData );
  };

  return (
    <div>
      {/* 🍎 Header and Breadcrumb */}
      <div className="py-6 bg-gray-100">
        <Containere>
          <BreadCrumb />
        </Containere>
      </div>

      {/* 💻 Product Details and Image Gallery */}
      <Containere>
        <div className="flex gap-10 py-5">
          {/* Left Side: Product Image and Slider */}
          <div className=" flex flex-col justify-center items-center">
            {/* Big Image */}
            <div className="w-[600px] h-[460px] p-5 border border-gray-200 rounded">
              {/* Safely access image properties */}
              {productData?.variantType === "MultipleVariant" ? (
                <img
                  src={productData?.variant?.[0]?.image?.[0]?.url}
                  alt={
                    productData?.variant?.[0]?.image?.[0]?.url ||
                    "Product variant image"
                  }
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={productData?.image?.[0]?.url}
                  alt={productData?.image?.[0]?.url || "Product image"}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Slider */}
            <div className="mt-5 w-[600px] relative">
              <Swiper
                modules={[Navigation]}
                loop={true}
                slidesPerView={4}
                spaceBetween={58}
                grabCursor={true}
                navigation={{
                  nextEl: ".next-btn",
                  prevEl: ".prev-btn",
                }}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }, 100);
                }}
              >
                {productData?.variantType === "MultipleVariant"
                  ? allImageUrls.map(
                      // Safely access variant image array
                      (item: any, index: number) => (
                        <SwiperSlide key={index}>
                          <img
                            src={item}
                            alt={item}
                            className="w-[100px] h-[80px] rounded-md object-cover cursor-pointer border-2 border-transparent hover:border-blue-500 transition"
                          />
                        </SwiperSlide>
                      )
                    )
                  : productData?.image?.map((item: any, index: number) => (
                      <SwiperSlide key={index}>
                        <img
                          src={item.url}
                          alt={item.url}
                          className="w-[100px] h-[80px] rounded-md object-cover cursor-pointer border-2 border-transparent hover:border-blue-500 transition"
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>

              {/* Prev Button */}
              <button className="prev-btn absolute top-1/2 left-[-35px] -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition border border-gray-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button className="next-btn absolute top-1/2 right-[-35px] -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition border border-gray-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side: Product Info and Details */}
          <div className="flex flex-col gap-4 max-w-[500px]">
            {/* Reviews & Title */}
            <div className="flex items-center">
              <div className=" flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="text-yellow-500">
                    {index < 4 ? Staricon.Fullstar : Staricon.Halfstar}{" "}
                  </span>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                **4.7 Star Rating** (21,671 User feedback)
              </span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
              {productData?.name}
            </h1>

            {/* Metadata */}
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <div className="flex w-1/2 gap-2">
                  <span className="text-gray-600">Sku:</span>
                  <span className="font-medium text-gray-900">
                    {productData?.sku}
                  </span>
                </div>
                <div className="flex w-1/2 gap-2">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium text-gray-900">
                    {productData?.brand?.name}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex w-1/2 gap-2">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">
                    {productData?.category?.name}
                  </span>
                </div>
                <div className="flex w-1/2 gap-2">
                  <span className="text-gray-600">Availability:</span>
                  <span className="font-medium">
                    {stock > 5 ? (
                      <span className="text-green-600">In Stock</span>
                    ) : stock > 0 ? (
                      <span className="text-red-500">Only {stock} Left!</span>
                    ) : (
                      <span className="text-gray-500">Out of Stock</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-1" />

            {/* Price Section */}
            <div className="flex items-center gap-3">
              {/* Use the safe finalPrice calculated above */}
              <span className="text-3xl font-bold text-red-600">
                $
                {productData?.discount
                  ? discountAmount
                  : productData?.retailPrice}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {productData?.discount ? ` $ ${productData?.retailPrice}` : ""}
              </span>
              <span className="px-2 py-1 bg-yellow-400 text-sm font-bold rounded-md">
                {discountDisplayValue > 0 ? discountDisplayValue : 0}
                {discount?.discountType === "percentage" ? "%" : "Tk"} OFF
              </span>
            </div>

            <hr className="my-1" />

            {/* Variant Selectors */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              {/* Color Selector */}
              {productData?.color && productData.color.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex gap-3">
                    {productData.color.map((color: string) => (
                      <div
                        key={color}
                        // NOTE: You'll need logic to determine the active color.
                        // The hardcoded color logic has been kept from the original code.
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                          color === "Red"
                            ? "border-blue-500 ring-2 ring-blue-500"
                            : "border-gray-300"
                        }`}
                        style={{
                          backgroundColor:
                            color === "Red" ? "#AA4A44" : "#4B5563",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {productData?.size && productData.size.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    {productData.size.map((size: string) => (
                      <option
                        key={size}
                        value={size}
                        // NOTE: You'll need logic to determine the selected size.
                        selected={size === "14-inch Liquid Retina XDR display"}
                      >
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {(productData?.size?.length > 0 ||
              productData?.color?.length > 0) && <hr className="my-3" />}

            {/* Quantity & Actions */}
            <div className="flex items-center gap-4">
              {/* Quantity Input */}
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="p-2 w-10 text-xl text-gray-600 hover:bg-gray-100 rounded-l-md"
                  onClick={handleQuantityOfproductDecriment}
                >
                  -
                </button>
                <input
                  type="text"
                  value={productQuantity}
                  readOnly
                  className="w-10 text-center border-x border-gray-300 focus:outline-none"
                />
                <button
                  className="p-2 w-10 text-xl text-gray-600 hover:bg-gray-100 rounded-r-md"
                  onClick={handleQuantityOfproductIncriment}
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <button
                className="flex-1 py-3 w-[200px] bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition duration-150"
                onClick={handleAddtoCart}
              >
                ADD TO CART
              </button>
              <button className="flex-1 py-3 w-[200px] border border-orange-500 text-orange-500 font-semibold rounded-md shadow-md hover:bg-orange-50 transition duration-150">
                BUY NOW
              </button>
            </div>

            {/* Wishlist and Compare */}
            <div className="flex gap-6 mt-3 text-sm">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <rect x="3" y="3" width="7" height="9"></rect>
                  <rect x="14" y="3" width="7" height="5"></rect>
                  <rect x="14" y="12" width="7" height="9"></rect>
                  <rect x="3" y="16" width="7" height="5"></rect>
                </svg>
                Add to Compare
              </button>
            </div>

            <hr className="my-3" />

            {/* Share and Payment Info */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Share product:</span>
                <div className="flex gap-2">
                  {/* Facebook */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500 hover:text-blue-600 cursor-pointer"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  {/* Pinterest */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500 hover:text-red-600 cursor-pointer"
                  >
                    <path d="M12 2c-4.97 0-9 4.03-9 9 0 3.32 1.78 6.22 4.47 7.73.54.3.73.7.67 1.1-.09.6-.57 2.37-.62 2.65-.05.27-.13.35-.38.22-.32-.17-.92-.47-1.63-.82-1.3-.64-2.28-1.58-2.28-2.88 0-3.32 2.76-6.02 6.16-6.02 3.4 0 6.16 2.7 6.16 6.02 0 3.32-2.76 6.02-6.16 6.02-.6 0-1.18-.08-1.74-.23"></path>
                  </svg>
                  {/* Twitter */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500 hover:text-blue-400 cursor-pointer"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </div>
              </div>
              <div className="text-green-600 font-medium">
                100% Guarantee Safe Checkout
              </div>
            </div>

            {/* Payment Icons Section (Empty Placeholder) */}
            <div className="mt-2"></div>
          </div>
        </div>
      </Containere>

      <hr className="my-8" />

      {/* 📑 Product Tabs Section (Description, Specs, Review) */}
      <div className="mt-10 mb-20">
        <Containere>
          <div className="border border-gray-200 rounded-lg p-6">
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
										py-3 px-6 text-sm font-medium transition-colors duration-200 
										${
                      activeTab === tab
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-600 hover:text-gray-900"
                    }
									`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tabs Content */}
            {renderContent()}
          </div>
        </Containere>
      </div>
    </div>
  );
};

export default Product;
