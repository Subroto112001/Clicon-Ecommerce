import React from "react";
import { Header } from "../Component/CoomonComponent/PageCommonComponent/Header/Index";
import Footer from "../Component/CoomonComponent/PageCommonComponent/Footer/Index";
import TopNavbar from "../Component/CoomonComponent/PageCommonComponent/Navbar/Index";
import DownNavbar from "../Component/CoomonComponent/PageCommonComponent/DownNavbar";
import Categorydropdown from "../Component/HomeCoomponent/CategoryDropdown/Index"
import Banner from "../Component/HomeCoomponent/Banner/Index";
const Home = () => {
  return (
    <>
      <Header />
      <TopNavbar />
      <DownNavbar />
      <Categorydropdown />
      <Banner/>
      <Footer />
    </>
  );
};

export default Home;
