import Webcam from "../assets/Offer/Camera.png";
import SmartPhone from "../assets/Offer/SmartPhone.png"
import Keyboard from "../assets/Offer/Keyboard.png";
import Gaming from "../assets/Offer/GamingCosole.png"
import CCtv from "../assets/Offer/CCtv.png"
import Mobile from "../assets/Offer/Mobile.png"
import Television from '../assets/Offer/Televison.png'
import Drone from "../assets/Offer/Drone.png";
import Speaker from "../assets/Offer/Speaker.png";
import Printer from "../assets/Offer/Printer.png"
import Android from "../assets/Offer/Android.png"
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
    image : SmartPhone
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
    name: "TOZO T6 True Wireless",
    desc: "Earbuds Bluetooth Headpho...",
    price: "$1,500",
    image: Television,
  },
  {
    id: 2,
    name: "JBL FLIP 4 - Waterproof",
    desc: " Portable Bluetooth Speaker...",
    price: "$1,500",
    image: Drone,
  },
  {
    id: 3,
    name: "Wyze Cam Pan v2 1080p",
    desc: "Pan/Tilt/Zoom Wi-Fi Indoor Smar...",
    price: "$1,500",
    image: Speaker,
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
    image: Printer,
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
