import Black from '../assets/HompageAssets/Black.png'
import Logo from "../assets/HompageAssets/Logo.png"
import BannerLeft from "../assets/HompageAssets/Banner/BannerLeft.png"
import BannerRight1 from "../assets/HompageAssets/Banner/BannerRight1.png";
import BannerRight2 from "../assets/HompageAssets/Banner/BannerRight2.png";

// shop by category image
import Computer from "../assets/ShopbycategoryImgae/Computer.png";
import Mobile from "../assets/ShopbycategoryImgae/Mobile.png";
import HeadPhone from "../assets/ShopbycategoryImgae/headphone.png";
import Keyboard from "../assets/ShopbycategoryImgae/keyboard.png";
import Camera from "../assets/ShopbycategoryImgae/Camera.png";
import Televison from "../assets/ShopbycategoryImgae/Television.png";
// feature image
import Featured from "../assets/Feature/FeatureImage.jpg";


// introducing
import Leftside from "../assets/Intorducing/LeftSide.png";

import Rightside from "../assets/Intorducing/RightSide.png"

// sunscribe
import google from "../assets/HompageAssets/Subscribe/Google.png"
import Amazon from "../assets/HompageAssets/Subscribe/Amazon.png";
import philips from "../assets/HompageAssets/Subscribe/philips.png"
import Sumsung from "../assets/HompageAssets/Subscribe/samsung.png"
import toshiba from "../assets/HompageAssets/Subscribe/toshiba.png";

// ---------------- Types ----------------
type AssetType = {
  Black: string;
  Logo: string;
  BannerLeft: string;
  BannerRight1: string;
  BannerRight2: string;
};

type ShopByCategoryImageType = {
  Computer: string;
  Mobile: string;
  HeadPhone: string;
  Keyboard: string;
  Camera: string;
  Televison: string;
};

type FeatureProductImageType = {
  Featured: string;
};
type introducingImageType = {
  Leftside: string;
  Rightside: string;
};


// subscribe type
type SubscribeImageType = {
  google: string;
  Amazon: string;
  philips: string;
  Sumsung: string;
  toshiba: string;
};

// subscribe type


// ---------------- Objects ----------------
export const assets: AssetType = {
  Black,
  Logo,
  BannerLeft,
  BannerRight1,
  BannerRight2,
};

export const shopbycategoryImageHolder: ShopByCategoryImageType = {
  Computer,
  Mobile,
  HeadPhone,
  Keyboard,
  Camera,
  Televison,
};

export const featureProductImage: FeatureProductImageType = {
  Featured,
};
// introducing part image
export const Introducingimage: introducingImageType = {
  Leftside,
  Rightside,
};



export const subscribe: SubscribeImageType = {
  google,
  Amazon,
  philips,
  Sumsung,
  toshiba,
};
