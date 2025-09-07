import Webcam from "../assets/Offer/Camera.png";
import SmartPhone from "../assets/Offer/SmartPhone.png"
import Keyboard from "../assets/Offer/Keyboard.png";
import Gaming from "../assets/Offer/GamingCosole.png"
import CCtv from "../assets/Offer/CCtv.png"
import Mobile from "../assets/Offer/Mobile.png"
import Television from '../assets/Offer/Televison.png'
import Drone from "../assets/Offer/Drone.png";
import Speaker from "../assets/Offer/Speaker.png";
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
    image : CCtv
  },
  {
    id: 3,
    name: "Sony DSCHX8 High Zoom",
    desc: "Point & Shoot Camera",
      price: "$1,500",
    image : Mobile
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
    name: "Sony DSCHX8 High Zoom",
    desc: "Point & Shoot Camera",
    price: "$1,500",
    image: Drone,
  },
  {
    id: 3,
    name: "Dell Optiplex 7000x7480",
    desc: "All-in-One Computer Monitor",
    price: "$1,500",
    image: Speaker,
  },
];
