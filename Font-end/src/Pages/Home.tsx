import React from "react";
import { Header } from "../Component/CoomonComponent/PageCommonComponent/Header/Index";
import Footer from "../Component/CoomonComponent/PageCommonComponent/Footer/Index";
import TopNavbar from "../Component/CoomonComponent/PageCommonComponent/Navbar/Index";
import DownNavbar from "../Component/CoomonComponent/PageCommonComponent/DownNavbar";
import Categorydropdown from "../Component/HomeCoomponent/CategoryDropdown/Index"
import Banner from "../Component/HomeCoomponent/Banner/Index";
import Categories from "../Component/HomeCoomponent/Categories/Index";
import CliconFeatures from "../Component/HomeCoomponent/CliconFeatures/Index";
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
      <Footer />
    </>
  );
};

export default React.memo(Home);
