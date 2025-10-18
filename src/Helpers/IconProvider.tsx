import { BsTelephoneFill } from "react-icons/bs";
import {
  CiCreditCard1,
  CiHeadphones,
  CiSearch,
  CiTrophy,
} from "react-icons/ci";
import {
  FaArrowLeft,
  FaArrowRight,
 
  FaFacebook,
  FaHeart,
  FaPinterest,
  FaReddit,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { LuCircleHelp } from "react-icons/lu";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdLocationPin,
  MdSupportAgent,
} from "react-icons/md";
import { RiLoopLeftFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TfiPackage } from "react-icons/tfi";
import { TiShoppingCart } from "react-icons/ti";

export const icons = {
  facebook: <FaFacebook />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
  pinterest: <FaPinterest />,
  instagram: <FaSquareInstagram />,
  Reddit: <FaReddit />,
  cart: <TiShoppingCart />,
  heart: <FaHeart />,
  user: <FaUser />,
  search: <CiSearch />,
  compare: <RiLoopLeftFill />,
  customerSupport: <MdSupportAgent />,
  help: <LuCircleHelp />,
  phone: <BsTelephoneFill />,
  cross: <RxCross2 />,
  locationicon: <MdLocationPin />,
  rightarrow: <FaArrowRight />,
  leftArrow : <FaArrowLeft />,
  downArrow: <MdKeyboardArrowDown />,
  upArrow: <MdKeyboardArrowUp />,
  delivery: <TfiPackage />,
  trophy: <CiTrophy />,
  creditcard: <CiCreditCard1 />,
  support: <CiHeadphones />,
};
export const categoriesarrow = {
  prev: <IoMdArrowBack />,
  next: <IoMdArrowForward />,
};
export const Staricon = {
  Blankstar: <FaRegStar />,
  Fullstar: <FaStar />,
  Halfstar : <FaStarHalfAlt/>
};