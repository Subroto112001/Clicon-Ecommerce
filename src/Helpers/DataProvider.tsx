import Webcam from "../assets/Offer/Camera.png";
import SmartPhone from "../assets/Offer/SmartPhone.png";
import Keyboard from "../assets/Offer/Keyboard.png";
import Gaming from "../assets/Offer/GamingCosole.png";
import CCtv from "../assets/Offer/CCtv.png";
import Mobile from "../assets/Offer/Mobile.png";
import Television from "../assets/Offer/Televison.png";
import Drone from "../assets/Offer/Drone.png";
import Speaker from "../assets/Offer/Speaker.png";

import Android from "../assets/Offer/Android.png";
import Joyestik from "../assets/Offer/Joyestik.png";
import { subscribe } from "./ImageProvider";

export type OfferFlashSaleType = {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
}[];

export const OfferFlashSale: OfferFlashSaleType = [
  {
    id: 1,
    name: "Bose Sport Earbuds - Wireless",
    desc: "Earphones - Bluetooth In Ear...",
    price: "$1,500",
    image: Webcam,
  },
  {
    id: 2,
    name: "Simple Mobile 4G LTE Prepaid",
    desc: "Smartphone",
    price: "$1,500",
    image: SmartPhone,
  },
  {
    id: 3,
    name: "4K UHD LED Smart TV with",
    desc: "Chromecast Built-in",
    price: "$1,500",
    image: Keyboard,
  },
];

export const OfferBestSale: OfferFlashSaleType = [
  {
    id: 1,
    name: "Samsung Electronics",
    desc: "Samsung Galexy S21 5G",
    price: "$1,500",
    image: Gaming,
  },
  {
    id: 2,
    name: "Simple Mobile 5G LTE Galexy",
    desc: "12 Mini 512GB Gaming Phone",
    price: "$1,500",
    image: CCtv,
  },
  {
    id: 3,
    name: "Sony DSCHX8 High Zoom",
    desc: "Point & Shoot Camera",
    price: "$1,500",
    image: Mobile,
  },
];
export const OfferTOPRated: OfferFlashSaleType = [
  {
    id: 1,
    name: "Portable Wshing Machine",
    desc: "11lbs capacity Model 18NMF...",
    price: "$1,500",
    image: Television,
  },
  {
    id: 2,
    name: "Sony DSCHX8",
    desc: "High Zoom Point & Shoot Camera",
    price: "$1,500",
    image: Drone,
  },
  {
    id: 3,
    name: "Dell Optiplex 7000x7480",
    desc: "All-in-One Computer Monitor",
    price: "$1,500",
    image: Television,
  },
];
export const OfferMewArrival: OfferFlashSaleType = [
  {
    id: 1,
    name: "TOZO T6 True Wireless",
    desc: "Earbuds Bluetooth Headpho...",
    price: "$1,500",
    image: Android,
  },
  {
    id: 2,
    name: "JBL FLIP 4 - Waterproof",
    desc: " Portable Bluetooth Speaker...",
    price: "$1,500",
    image: Speaker,
  },
  {
    id: 3,
    name: "Wyze Cam Pan v2 1080p",
    desc: "Pan/Tilt/Zoom Wi-Fi Indoor Smar...",
    price: "$1,500",
    image: Joyestik,
  },
];

export const subcribeImage = [
  {
    id: 1,
    image: subscribe.google,
  },
  {
    id: 2,
    image: subscribe.Amazon,
  },
  {
    id: 3,
    image: subscribe.philips,
  },
  {
    id: 4,
    image: subscribe.toshiba,
  },
  {
    id: 5,
    image: subscribe.Sumsung,
  },
];

type fotterinfo = {
  id: number;
  name: string;
  path: string;
}[];

export const fotterInfo: fotterinfo = [
  {
    id: 1,
    name: "Shop Product",
    path: "/",
  },
  {
    id: 2,
    name: "Shoping Cart",
    path: "/",
  },
  {
    id: 3,
    name: "Wishlist",
    path: "/",
  },
  {
    id: 4,
    name: "Compare",
    path: "/",
  },
  {
    id: 5,
    name: "Track Order",
    path: "/",
  },
  {
    id: 6,
    name: "Customer Help",
    path: "/",
  },
  {
    id: 7,
    name: "About Us",
    path: "/",
  },
];

// fottoer tag info
type footertagType = {
  id: number;
  name: string;
}[];
export const footertag: footertagType = [
  {
    id: 1,
    name: "Game",
  },
  {
    id: 2,
    name: "iPhone",
  },
  {
    id: 3,
    name: "TV",
  },
  {
    id: 4,
    name: "Asus Laptops",
  },
  {
    id: 5,
    name: "Macbook",
  },
  {
    id: 6,
    name: "SSD",
  },
  {
    id: 7,
    name: "Graphics Card",
  },
  {
    id: 8,
    name: "Power Bank",
  },
  {
    id: 9,
    name: "Smart TV",
  },
  {
    id: 10,
    name: "Speaker",
  },
  {
    id: 11,
    name: "Tablet",
  },
  {
    id: 12,
    name: "Microwave",
  },
  {
    id: 13,
    name: "Samsung",
  },
];
