import React from "react";
import Categorydropdown from "../Component/HomeCoomponent/CategoryDropdown/Index"
import Banner from "../Component/HomeCoomponent/Banner/Index";
import Categories from "../Component/HomeCoomponent/Categories/Index";
import CliconFeatures from "../Component/HomeCoomponent/CliconFeatures/Index";
import FeaturedProduct from "../Component/HomeCoomponent/FeaturedProduct/Index";
import Introducing from "../Component/HomeCoomponent/Introducing/Index";
import Offer from "../Component/HomeCoomponent/Offer/Index";
import Subscribe from "../Component/HomeCoomponent/Subscribe/Index";
const Home = () => {
  return (
    <>
      
      <Categorydropdown />
      <Banner />
      <CliconFeatures/>
      <Categories />
      <FeaturedProduct />
      <Introducing />
      <Offer />
      <Subscribe/>
     
    </>
  );
};

export default React.memo(Home);
