import React from "react";
import { Header } from "../Component/CoomonComponent/PageCommonComponent/Header/Index";
import Footer from "../Component/CoomonComponent/PageCommonComponent/Footer/Index";
import TopNavbar from "../Component/CoomonComponent/PageCommonComponent/Navbar/Index";
import DownNavbar from "../Component/CoomonComponent/PageCommonComponent/DownNavbar";
import Categorydropdown from "../Component/HomeCoomponent/CategoryDropdown/Index"
import Banner from "../Component/HomeCoomponent/Banner/Index";
import Categories from "../Component/HomeCoomponent/Categories/Index";
import CliconFeatures from "../Component/HomeCoomponent/CliconFeatures/Index";
import FeaturedProduct from "../Component/HomeCoomponent/FeaturedProduct/Index";
import Introducing from "../Component/HomeCoomponent/Introducing/Index";
import Offer from "../Component/HomeCoomponent/Offer/Index";
const Home = () => {
  return (
    <>
      <Header />
      <TopNavbar />
      <DownNavbar />
      <Categorydropdown />
      <Banner />
      <CliconFeatures/>
      <Categories />
      <FeaturedProduct />
      <Introducing />
      <Offer/>
      <Footer />
    </>
  );
};

export default React.memo(Home);
